from pathlib import Path
import hashlib
import json
import zipfile

root=Path('F:/DEV/CASH/outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e')
files=['Template_vendite.xlsx','Esempio_vendite.xlsx','Guida.html','Licenza.txt','Esempio_importazione.csv']
with zipfile.ZipFile(root/'Vendite_e_spese_v1.zip','w',zipfile.ZIP_DEFLATED) as z:
    for name in files:
        p=root/'prodotto'/name
        assert p.is_file(),name
        z.write(p,name)
with zipfile.ZipFile(root/'Vendite_e_spese_v1.zip') as z:
    assert set(z.namelist())==set(files)
    assert z.testzip() is None
    for name in files:
        assert z.read(name)==(root/'prodotto'/name).read_bytes()
manifest={name:hashlib.sha256((root/'prodotto'/name).read_bytes()).hexdigest() for name in files}
(root/'verifica/manifest-prodotto.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('ZIP prodotto verificato: cinque file, nessun materiale operativo privato.')
