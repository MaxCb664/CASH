from pathlib import Path
import zipfile
import json
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'docs/verifiche/2026-10-08'
kit=ROOT/'outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e'
ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
def features(p):
    with zipfile.ZipFile(p) as z:
        wb=ET.fromstring(z.read('xl/workbook.xml'))
        sheets=[s.attrib['name'] for s in wb.findall('s:sheets/s:sheet',ns)]
        tabs={name:ET.fromstring(z.read(f'xl/worksheets/sheet{i}.xml')) for i,name in enumerate(sheets,1)}
        return {'sheets':sheets,'tables':len([n for n in z.namelist() if n.startswith('xl/tables/') and n.endswith('.xml')]),'formulas':{n:len(s.findall('.//s:f',ns)) for n,s in tabs.items()},'validations':{n:len(s.findall('.//s:dataValidation',ns)) for n,s in tabs.items()},'panes':{n:len(s.findall('.//s:pane',ns)) for n,s in tabs.items()}}
before=features(out/'Registro_operativo-prima.xlsx')
after=features(kit/'operativo/Registro_operativo.xlsx')
assert before==after,(before,after)
assert json.loads((ROOT/'docs/catalogo.json').read_text(encoding='utf-8'))['products'][0]['approved_price_eur']==9.9
(out/'struttura-registro.json').write_text(json.dumps({'before':before,'after':after,'result':'preserved'},indent=2),encoding='utf-8')
print('Struttura registro preservata: fogli, tabelle, formule, convalide e pannelli. Catalogo9,90 EUR.')
