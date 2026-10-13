"""Crea un brief e cartelle per un nuovo prodotto; non genera né pubblica file vendibili."""
import argparse
import json
import re
import unicodedata
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]

def normalized(value):
    return ' '.join(unicodedata.normalize('NFKC', value).casefold().split())

def main():
    p = argparse.ArgumentParser(description=__doc__)
    for name in ('slug', 'nome', 'pubblico', 'problema', 'risultato', 'formato'):
        p.add_argument('--' + name, required=True)
    p.add_argument('--prezzo', required=True, type=float)
    p.add_argument('--dry-run', action='store_true')
    a = p.parse_args()
    if not re.fullmatch(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)*', a.slug) or len(a.slug)>64:
        p.error('Slug: lettere minuscole, cifre e trattini, massimo64 caratteri.')
    if not 0 < a.prezzo < 10000:
        p.error('Prezzo positivo e inferiore a10000 EUR.')
    if any(not getattr(a, n).strip() for n in ('nome','pubblico','problema','risultato','formato')):
        p.error('I campi del brief non possono essere vuoti.')
    catalog_path = ROOT/'docs/catalogo.json'
    catalog = json.loads(catalog_path.read_text(encoding='utf-8'))
    for product in catalog['products']:
        if a.slug==product['slug'] or normalized(a.nome)==normalized(product['name']):
            p.error('Slug o nome già nel catalogo; scegliere un prodotto distinto.')
        if normalized(a.problema)==normalized(product['problem']) and normalized(a.risultato)==normalized(product['outcome']):
            p.error('Problema e risultato già presenti: una variante cosmetica non basta.')
    target=ROOT/'products'/a.slug
    if target.exists():
        p.error('La cartella esiste già; nessun file viene sovrascritto.')
    sku=f"CASH-{max((int(x['sku'].split('-')[-1]) for x in catalog['products']),default=0)+1:03d}"
    now=datetime.now(ZoneInfo('Europe/Rome')).isoformat(timespec='seconds')
    entry={'sku':sku,'slug':a.slug,'name':a.nome,'audience':a.pubblico,'problem':a.problema,'outcome':a.risultato,'format':a.formato,'status':'brief_created','version':'0.1','path':target.relative_to(ROOT).as_posix(),'proposed_price_eur':a.prezzo,'created_at':now}
    if a.dry_run:
        print(json.dumps(entry,ensure_ascii=False,indent=2)); return
    target.mkdir(parents=True)
    for folder in ('prodotto','immagini','operativo','verifica'):
        (target/folder).mkdir()
    (target/'brief.json').write_text(json.dumps(entry,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (target/'README.md').write_text(f"# {a.nome}\n\nSKU: {sku}. Stato: solo brief, nessun prodotto creato.\n\nSeguire docs/PROCESSO_PRODOTTI.md; confrontare semanticamente con il catalogo. Lo script rileva duplicati esatti ma non valuta da solo originalità e utilità.\n",encoding='utf-8')
    catalog['products'].append(entry); catalog['updated_at']=now[:10]
    temporary=catalog_path.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    temporary.replace(catalog_path)
    print(f'Brief {sku} creato: {target}. Generazione e verifica da completare.')

if __name__=='__main__':
    main()
