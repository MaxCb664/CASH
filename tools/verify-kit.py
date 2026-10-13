import importlib.util
import csv
import json
import tempfile
import unittest
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path('F:/DEV/CASH/outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e')
SCRIPT = ROOT / 'operativo/strumenti/normalizza_csv.py'
spec = importlib.util.spec_from_file_location('cleaner', SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
CONFIG = json.loads((SCRIPT.parent / 'mappa_esempio.json').read_text())


class CleanerChecks(unittest.TestCase):
    def test_amount_formats(self):
        self.assertEqual(str(mod.number('1.234,56', ',', '.')), '1234.56')
        self.assertEqual(str(mod.number('0,00')), '0.00')
        self.assertEqual(str(mod.number('-29,00')), '-29.00')
        for value in ('', '1,234', '1.000', 'NaN', '=100', '1,2,3'):
            with self.assertRaises(ValueError): mod.number(value)
        with self.assertRaises(ValueError): mod.number('12.34,56', ',', '.')

    def test_formula_injection(self):
        self.assertEqual(mod.safe_text(' =HYPERLINK("x")'), "'=HYPERLINK(\"x\")")
        self.assertEqual(mod.safe_text('Ordine 1'), 'Ordine 1')

    def test_example(self):
        rows, report = mod.normalize(ROOT / 'prodotto/Esempio_importazione.csv', CONFIG)
        self.assertEqual(len(rows), 5)
        self.assertEqual(report['errori'], [])
        self.assertEqual(report['totali_dopo']['Lordo EUR'], '236.00')
        self.assertEqual(report['totali_dopo']['Rimborsi EUR'], '29.00')
        self.assertEqual(report['totali_dopo']['Commissioni EUR'], '13.20')

    def test_duplicates_and_invalid_rows(self):
        p = ROOT / 'verifica/test-duplicati.csv'
        with p.open('w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f, delimiter=';')
            writer.writerow(mod.FIELDS)
            record = ['2026-10-02','ID-1','Etsy','Demo','Template','29,00','0,00','4,20']
            writer.writerow(record); writer.writerow(record)
        rows, report = mod.normalize(p, CONFIG)
        self.assertEqual(len(rows), 2)
        self.assertEqual(report['righe_identiche_segnalate'], [3])
        rows, report = mod.normalize(p, CONFIG, True)
        self.assertEqual(len(rows), 1)
        self.assertEqual(report['totali_dopo']['Lordo EUR'], '29.00')
        text = p.read_text().replace('2026-10-02', '2026-02-30', 1)
        p.write_text(text)
        _, report = mod.normalize(p, CONFIG)
        self.assertEqual(len(report['errori']), 1)

    def test_capacity_limit(self):
        p=ROOT/'verifica/test-capienza.csv'
        with p.open('w',newline='',encoding='utf-8') as f:
            wr=csv.writer(f,delimiter=';');wr.writerow(mod.FIELDS)
            for i in range(2001): wr.writerow(['2026-10-02',str(i),'Etsy','Demo','Template','1','0','0'])
        with self.assertRaises(ValueError): mod.normalize(p,CONFIG)

    def test_xlsx_structure(self):
        ns = {'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        for rel, count in [('prodotto/Template_vendite.xlsx',4),('prodotto/Esempio_vendite.xlsx',4),('operativo/Registro_operativo.xlsx',7)]:
            with zipfile.ZipFile(ROOT/rel) as z:
                self.assertFalse(any('vbaProject' in name for name in z.namelist()))
                xml = ET.fromstring(z.read('xl/workbook.xml'))
                self.assertEqual(len(xml.findall('s:sheets/s:sheet',ns)),count)
                data=ET.fromstring(z.read('xl/worksheets/sheet3.xml' if count==7 else 'xl/worksheets/sheet2.xml'))
                cells={c.get('r'):c for c in data.findall('.//s:c',ns)}
                for pos in ['I7','I1007','I2006']:
                    self.assertIsNotNone(cells[pos].find('s:f',ns))
                self.assertTrue(any(name.startswith('xl/tables/') for name in z.namelist()))


if __name__ == '__main__':
    unittest.main(verbosity=2)
