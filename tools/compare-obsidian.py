from pathlib import Path
import difflib
local=Path(r'F:\DEV\CASH\docs\obsidian')
vault=Path(r'F:\MAXROM\MEM\Progetti\CASH-unistack-94de8cd4094d')
for name in ['CASH.md','CASH - Idee.md','CASH - Lezioni.md','CASH - Miglioramenti kit.md']:
    a=(local/name).read_text(encoding='utf-8').splitlines()
    b=(vault/name).read_text(encoding='utf-8').splitlines()
    diff=list(difflib.unified_diff(a,b,fromfile='locale/'+name,tofile='vault/'+name,n=2))
    if diff:print('\n'.join(diff[:150]))
