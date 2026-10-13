"""Normalize explicitly mapped CSVs locally; no network, source overwrites or inference."""
import argparse
import csv
import json
import re
from collections import Counter
from datetime import datetime
from decimal import Decimal, InvalidOperation
from pathlib import Path

FIELDS = ['Data movimento', 'ID movimento', 'Canale', 'Prodotto', 'Categoria', 'Lordo EUR', 'Rimborsi EUR', 'Commissioni EUR']
NUMERIC = FIELDS[5:]


def number(value, decimal=',', thousands=''):
    text = str(value).strip()
    if not text:
        raise ValueError('Importo mancante: non viene sostituito con zero')
    if thousands and thousands == decimal:
        raise ValueError('Separatore migliaia e decimale devono essere diversi')
    # Explicit grouping only: malformed groups must not become plausible amounts.
    integer = r'\d+'
    if thousands:
        sep = re.escape(thousands)
        integer = rf'(?:\d+|\d{{1,3}}(?:{sep}\d{{3}})+)'
    pattern = rf'[+-]?{integer}(?:{re.escape(decimal)}\d{{1,2}})?'
    if not re.fullmatch(pattern, text):
        raise ValueError(f'Importo ambiguo/non valido: {text!r}')
    if thousands:
        text = text.replace(thousands, '')
    try:
        result = Decimal(text.replace(decimal, '.'))
    except InvalidOperation as exc:
        raise ValueError('Importo non valido') from exc
    if not result.is_finite():
        raise ValueError('Importo non finito')
    return result


def safe_text(value):
    text = str(value).strip()
    return "'" + text if text.startswith(('=', '+', '-', '@')) else text


def normalize(source, config, remove_duplicates=False):
    mapping = config['colonne']
    defaults = config.get('valori_fissi', {})
    if any(k not in mapping and k not in defaults for k in FIELDS):
        raise ValueError('Mappa incompleta: ogni campo deve avere colonna o valore fisso esplicito')
    with Path(source).open(encoding='utf-8-sig', newline='') as f:
        reader = csv.DictReader(f, delimiter=config.get('delimitatore', ';'))
        headers = reader.fieldnames or []
        if len(headers) > 12 or len(headers) != len(set(headers)):
            raise ValueError('Massimo 12 colonne; intestazioni univoche obbligatorie')
        missing = set(mapping.values()) - set(headers)
        if missing:
            raise ValueError('Colonne mancanti: ' + ', '.join(sorted(missing)))
        raw_rows = list(reader)
    if len(raw_rows) > 2000:
        raise ValueError('Limite 2.000 righe superato')
    if not raw_rows:
        raise ValueError('CSV privo di dati')
    output, seen, duplicates, ids, errors = [], set(), [], Counter(), []
    before = {k: Decimal('0') for k in NUMERIC}
    after = {k: Decimal('0') for k in NUMERIC}
    for line, row in enumerate(raw_rows, 2):
        try:
            if None in row or any(value is None for value in row.values()):
                raise ValueError('Numero di campi diverso dalle intestazioni')
            mapped = {k: row[mapping[k]] if k in mapping else str(defaults[k]) for k in FIELDS}
            dt = datetime.strptime(mapped[FIELDS[0]].strip(), config.get('formato_data', '%Y-%m-%d'))
            if not mapped[FIELDS[1]].strip():
                raise ValueError('ID movimento mancante')
            numbers = {k: number(mapped[k], config.get('decimale', ','), config.get('migliaia', '')) for k in NUMERIC}
            values = [dt.strftime('%Y-%m-%d')] + [safe_text(mapped[k]) for k in FIELDS[1:5]] + [format(numbers[k], '.2f').replace('.', ',') for k in NUMERIC]
            for k in NUMERIC:
                before[k] += numbers[k]
            ids[mapped[FIELDS[1]].strip()] += 1
            key = tuple(values)
            if key in seen:
                duplicates.append(line)
                if remove_duplicates:
                    continue
            seen.add(key)
            output.append(values)
            for k in NUMERIC:
                after[k] += numbers[k]
        except (ValueError, TypeError, KeyError) as exc:
            errors.append({'riga_csv': line, 'errore': str(exc)})
    report = {
        'sorgente': Path(source).name, 'righe_originali': len(raw_rows),
        'righe_output': len(output), 'righe_identiche_segnalate': duplicates,
        'rimozione_duplicati_richiesta': remove_duplicates,
        'id_ripetuti': {k: v for k, v in ids.items() if v > 1},
        'totali_prima': {k: str(v) for k, v in before.items()},
        'totali_dopo': {k: str(v) for k, v in after.items()},
        'errori': errors,
        'note': 'Date ISO da convertire in date Excel; importare solo A:H. ID ripetuti non eliminati automaticamente. Totali parziali se sono presenti errori.'
    }
    return output, report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('sorgente', type=Path)
    parser.add_argument('--mappa', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--rimuovi-duplicati', action='store_true')
    args = parser.parse_args()
    targets = [args.output.resolve(), args.report.resolve()]
    protected = {args.sorgente.resolve(), args.mappa.resolve()}
    if len(set(targets)) != 2 or any(t in protected or t.exists() for t in targets):
        parser.error('Output e report devono essere nuovi file distinti dal sorgente e dalla mappa')
    try:
        config = json.loads(args.mappa.read_text(encoding='utf-8-sig'))
        values, report = normalize(args.sorgente, config, args.rimuovi_duplicati)
    except (ValueError, KeyError, OSError, csv.Error) as exc:
        parser.exit(2, 'Errore: ' + str(exc) + '\n')
    args.report.parent.mkdir(parents=True, exist_ok=True)
    with args.report.open('x', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    if report['errori']:
        parser.exit(2, 'Dati non validi: leggere il report. Nessun CSV finale generato.\n')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open('x', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerow(FIELDS)
        writer.writerows(values)
    print(f'CSV generato: {len(values)} righe. Controllare report e totali prima della consegna.')


if __name__ == '__main__':
    main()
