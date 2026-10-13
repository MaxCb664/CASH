import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {Workbook, SpreadsheetFile} from '@oai/artifact-tool';
import sharp from 'sharp';

const root='F:/DEV/CASH/outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e';
const buyer=path.join(root,'prodotto');
const internal=path.join(root,'operativo');
const previews=path.join(root,'verifica');
for(const dir of [buyer,internal,previews,path.join(root,'immagini')]) await fs.mkdir(dir,{recursive:true});
const money='"€" #,##0.00;("€" #,##0.00);"€" 0.00';
const navy='#243B53', amber='#FFF3D6', blue='#2455A4';
const last=2006, checks=[];
const cell=(s,a,v)=>s.getRange(a).values=[[v]];
const formula=(s,a,v)=>s.getRange(a).formulas=[[v]];
const date=s=>new Date(s+'T12:00:00Z');
function base(w,name,end='I30'){
 const s=w.worksheets.add(name); s.showGridLines=false;
 s.getRange('A1:'+end).format.font={name:'Arial',size:11,color:navy};
 s.getRange('A1:'+end).format.rowHeight=23;
 s.getRange('A1:'+end).format.verticalAlignment='center';
 s.getRange('A1:'+end).format.columnWidth=18;
 return s;
}
function title(s,text){cell(s,'A2',text);s.getRange('A2').format.font={name:'Arial',size:16,bold:true,color:navy};}
function header(s,range,values){s.getRange(range).values=[values];s.getRange(range).format={fill:navy,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},rowHeight:35,wrapText:true,horizontalAlignment:'center'};}
function input(s,r){s.getRange(r).format.fill=amber;s.getRange(r).format.font.color=blue;}
function amount(s,r){s.getRange(r).setNumberFormat(money);}
function list(s,r,values){s.getRange(r).dataValidation={rule:{type:'list',values}};}
function checkNum(s,a,expected,label){const actual=s.getRange(a).values[0][0]; assert.ok(typeof actual==='number' && Math.abs(actual-expected)<1e-7,`${label}: ${a} ${actual} != ${expected}`);checks.push({label,actual,expected});}

function makeSales(demo=false,operator=false){
 const w=Workbook.create();
 const sum=base(w,'Riepilogo','K31');sum.tabColor=navy;
 const launch=operator?base(w,'Avvio','G35'):null;
 const sales=base(w,'Vendite',`J${last}`), costs=base(w,'Spese',`F${last}`),pay=base(w,'Accrediti',`E${last}`);
 title(sum,operator?'Vendite, margine e denaro disponibile':'Vendite e spese mensili');
 cell(sum,'A4','Anno');cell(sum,'B4',2026);input(sum,'B4');
 sum.getRange('B4').dataValidation={rule:{type:'whole',operator:'between',formula1:2020,formula2:2100}};
 cell(sum,'D4','Saldo piattaforme al 1 gennaio');cell(sum,'G4',0);input(sum,'G4');amount(sum,'G4');
 cell(sum,'A5',demo?'ESEMPIO: dati interamente fittizi':'Campi gialli: inserimento. Vendite, spese e accrediti si registrano separatamente.');
 sum.getRange('A5').format.font={name:'Arial',size:11,italic:true,color:'#526574'};
 header(sum,'A7:K7',['Mese','Vendite lorde','Rimborsi','Commissioni','Netto piattaforme','Spese maturate','Margine','Accrediti ricevuti','Spese pagate','Flusso di cassa','Saldo piattaforme']);
 const salesBound=col=>`Vendite!$${col}$7:$${col}$${last}`;
 function monthsSum(sheet,col,dateCol,r){return `SUMIFS(${sheet}!$${col}$7:$${col}$${last},${sheet}!$${dateCol}$7:$${dateCol}$${last},">="&$A${r},${sheet}!$${dateCol}$7:$${dateCol}$${last},"<"&DATE($B$4,MONTH($A${r})+1,1))`;}
 for(let month=1;month<=12;month++){
  const r=month+7;formula(sum,`A${r}`,`=DATE($B$4,${month},1)`);
  for(const [out,source] of [['B','F'],['C','G'],['D','H'],['E','I']])formula(sum,`${out}${r}`,`=${monthsSum('Vendite',source,'A',r)}`);
  formula(sum,`F${r}`,`=${monthsSum('Spese','D','A',r)}`);
  formula(sum,`G${r}`,`=E${r}-F${r}`);
  formula(sum,`H${r}`,`=${monthsSum('Accrediti','D','A',r)}`);
  formula(sum,`I${r}`,`=${monthsSum('Spese','F','E',r)}`);
  formula(sum,`J${r}`,`=H${r}-I${r}`);
  formula(sum,`K${r}`,`=${r===8?'$G$4':`K${r-1}`}+E${r}-H${r}`);
 }
 cell(sum,'A20','Totale anno');for(let c of 'BCDEFGHIJ')formula(sum,c+'20',`=SUM(${c}8:${c}19)`);formula(sum,'K20','=K19');
 sum.getRange('A20:K20').format.fill='#E4EAF0';sum.getRange('A20:K20').format.font.bold=true;
 sum.getRange('A8:A19').setNumberFormat('mmm-yyyy');amount(sum,'B8:K20');
 sum.getRange('A7:K7').format.rowHeight=44;sum.getRange('B7:K20').format.columnWidth=18;sum.getRange('A7:A20').format.columnWidth=16;
 cell(sum,'A23','Margine: vendite meno rimborsi, commissioni e spese. Prima di imposte e contributi.');
 cell(sum,'A24','Flusso di cassa: accrediti effettivi meno spese effettivamente pagate.');
 cell(sum,'A25','Saldo piattaforme: saldo iniziale + netto maturato − accrediti; non è liquidità bancaria.');
 cell(sum,'A26','Registrare rimborsi e rettifiche alla data del movimento, senza duplicare gli ordini.');
 cell(sum,'A27','Capienza: 2.000 righe per ciascun registro. Importi tutti in EUR, senza conversione automatica.');
 cell(sum,'A28','Strumento organizzativo. Non separa IVA e non sostituisce contabilità o dichiarazioni.');
 sum.getRange('K8:K19').conditionalFormats.add('cellIs',{operator:'lessThan',formula:0,format:{fill:'#FCE4E4',font:{color:'#AD2525'}}});
 for(const s of [sales,costs,pay]){s.freezePanes.freezeRows(6);s.getRange(`A7:${s===sales?'H':s===costs?'F':'E'}${last}`).format.font={name:'Arial',size:11,color:blue};}
 title(sales,'Registro vendite e rettifiche');cell(sales,'A4','Una riga per movimento. Rimborsi: lordo zero, rimborso positivo, data effettiva.');
 header(sales,'A6:J6',['Data movimento','ID movimento','Canale','Prodotto','Categoria','Lordo EUR','Rimborsi EUR','Commissioni EUR','Netto EUR','Accredito previsto']);
 input(sales,`A7:H${last}`);input(sales,`J7:J${last}`);
 sales.getRange(`I7:I${last}`).formulas=Array.from({length:2000},(_,i)=>{const r=i+7;return [`=IF(A${r}="","",F${r}-G${r}-H${r})`];});
 sales.getRange(`I7:I${last}`).format.font.color='#111111';amount(sales,`F7:I${last}`);
 for(const c of ['A','J'])sales.getRange(`${c}7:${c}${last}`).setNumberFormat('dd/mm/yyyy');
 list(sales,`C7:C${last}`,['Etsy','Gumroad','Payhip','Ko-fi','Fiverr','KDP','Diretto','Altro']);
 list(sales,`E7:E${last}`,['Template','Servizio','Grafica','Documento','Script','Altro']);
 sales.getRange(`A7:H${last}`).conditionalFormats.addCustom('AND($A7="",COUNTA($B7:$H7)>0)',{fill:'#FCE4E4',font:{color:'#AD2525'}});
 sales.getRange(`B7:B${last}`).conditionalFormats.addCustom(`AND($B7<>"",COUNTIF($B$7:$B$${last},$B7)>1)`,{fill:'#FCE4E4',font:{color:'#AD2525'}});
 sales.tables.add(`A6:J${last}`,true,'RegistroVendite');
 title(costs,'Spese e pagamenti');cell(costs,'A4','Data spesa = margine; data pagamento + importo pagato = cassa. Non ripetere commissioni già nelle vendite.');
 header(costs,'A6:F6',['Data spesa','Categoria','Descrizione','Spesa EUR','Data pagamento','Pagato EUR']);input(costs,`A7:F${last}`);
 amount(costs,`D7:D${last}`);amount(costs,`F7:F${last}`);for(const c of ['A','E'])costs.getRange(`${c}7:${c}${last}`).setNumberFormat('dd/mm/yyyy');
 list(costs,`B7:B${last}`,['Software','Inserzioni','Pubblicita','Servizi','Altro']);costs.getRange(`C6:C${last}`).format.columnWidth=36;
 costs.getRange(`E7:F${last}`).conditionalFormats.addCustom('AND($E7="",$F7<>"")',{fill:'#FCE4E4'});
 costs.tables.add(`A6:F${last}`,true,'RegistroSpese');
 title(pay,'Accrediti effettivi');cell(pay,'A4','Una riga per accredito reale, anche cumulativo. Importo netto ricevuto; addebiti/rettifiche negativi.');
 header(pay,'A6:E6',['Data effettiva','Canale','ID accredito','Importo EUR','Note']);input(pay,`A7:E${last}`);amount(pay,`D7:D${last}`);pay.getRange(`A7:A${last}`).setNumberFormat('dd/mm/yyyy');pay.getRange(`E6:E${last}`).format.columnWidth=42;pay.tables.add(`A6:E${last}`,true,'RegistroAccrediti');
 if(demo){
  sales.getRange('A7:J11').values=[
   [date('2026-10-02'),'MOV-001','Etsy','Template vendite','Template',29,0,4.2,null,date('2026-10-22')],
   [date('2026-10-05'),'MOV-002','Gumroad','Template vendite','Template',29,0,4.8,null,date('2026-10-19')],
   [date('2026-10-10'),'MOV-003','Diretto','Pulizia CSV','Servizio',149,0,0,null,date('2026-10-12')],
   [date('2026-10-31'),'MOV-004','Etsy','Template vendite','Template',29,0,4.2,null,date('2026-11-20')],
   [date('2026-11-02'),'RET-001','Gumroad','Rimborso MOV-002','Template',0,29,0,null,date('2026-11-02')]];
  for(let r=7;r<=11;r++)formula(sales,`I${r}`,`=IF(A${r}="","",F${r}-G${r}-H${r})`);
  costs.getRange('A7:F8').values=[[date('2026-10-03'),'Software','Costo fittizio',10,date('2026-11-03'),10],[date('2026-10-04'),'Inserzioni','Costo fittizio',2,date('2026-10-04'),2]];
  pay.getRange('A7:E11').values=[[date('2026-10-12'),'Diretto','ACC-001',149,'Pagamento servizio'],[date('2026-10-22'),'Etsy','ACC-002',24.8,'MOV-001'],[date('2026-10-19'),'Gumroad','ACC-003',24.2,'MOV-002'],[date('2026-11-02'),'Gumroad','RET-ACC-001',-29,'Addebito rimborso'],[date('2026-11-20'),'Etsy','ACC-004',24.8,'MOV-004']];
 }
 if(operator){
  title(launch,'Avvio e scenario economico');launch.tabColor='#526574';
  cell(launch,'A4','Budget totale EUR');cell(launch,'B4',1000);cell(launch,'D4','Limite spesa iniziale EUR');cell(launch,'F4',100);input(launch,'B4');input(launch,'F4');
  cell(launch,'A5','Obiettivo mensile EUR');cell(launch,'B5',500);input(launch,'B5');
  header(launch,'A7:E7',['Offerta','Prezzo EUR','Quantita','Costi stimati %','Margine stimato EUR']);
  launch.getRange('A8:D9').values=[['Servizio diretto',149,3,0.10],['Template',29,8,0.25]];input(launch,'B8:D9');
  for(let r=8;r<=9;r++)formula(launch,`E${r}`,`=B${r}*C${r}*(1-D${r})`);
  cell(launch,'A11','Altri costi mensili EUR');cell(launch,'B11',30);input(launch,'B11');cell(launch,'A12','Margine scenario EUR');formula(launch,'E12','=SUM(E8:E9)-B11');
  cell(launch,'A13','Vendite template necessarie');formula(launch,'E13','=IF(OR(B9<=0,D9>=1),"n.a.",ROUNDUP(($B$5+$B$11)/(B9*(1-D9)),0))');
  cell(launch,'A15','Scenario illustrativo. Nessuna vendita o entrata garantita. Prima di imposte e contributi.');
  header(launch,'A18:D18',['Scadenza','Attivita','Stato','Minuti previsti']);
  const tasks=[['Giorno 1','Verificare prodotto e istruzioni','Da fare',60],['Giorno 1','Accedere a Etsy e Gumroad','Da fare',20],['Giorno 1','Confermare inquadramento fiscale','Da fare',30],['Giorno 1','Caricare ZIP e immagini','Da fare',60],['Giorno 1','Provare acquisto e download','Da fare',30],['Giorni 1–14','20 opportunita pertinenti','Da fare',240],['Giorni 1–14','2 pubblicazioni consentite','Da fare',40],['Giorno 14','Valutare interesse e canale','Da fare',30],['Giorno 30','Verificare margine e ore','Da fare',30],['Giorno 60','Verificare accrediti reali','Da fare',30]];
  launch.getRange('A19:D28').values=tasks;list(launch,'C19:C28',['Da fare','In corso','Completato','In attesa']);launch.getRange('B18:B28').format.columnWidth=38;launch.getRange('A18:A28').format.columnWidth=22;
  amount(launch,'B4:B5');amount(launch,'F4');amount(launch,'B8:B9');amount(launch,'E8:E12');launch.getRange('D8:D9').setNumberFormat('0.0%');launch.getRange('E13').setNumberFormat('0');
  const contacts=base(w,'Opportunita','G27');title(contacts,'Richieste e conversazioni');cell(contacts,'A4','20 posti da compilare con richieste reali. Nessun contatto inventato o messaggio inviato.');
  header(contacts,'A6:G6',['N.','Data','Canale','URL richiesta','Problema','Stato','Prossimo passo']);
  contacts.getRange('A7:G26').values=Array.from({length:20},(_,i)=>[i+1,null,null,null,null,'Da trovare',null]);input(contacts,'B7:G26');list(contacts,'F7:F26',['Da trovare','Da valutare','Contattato','Risposta','Vendita','Non adatto']);contacts.getRange('D6:E26').format.columnWidth=32;contacts.getRange('G6:G26').format.columnWidth=30;contacts.getRange('B7:B26').setNumberFormat('dd/mm/yyyy');contacts.tables.add('A6:G26',true,'Opportunita');contacts.freezePanes.freezeRows(6);
  const time=base(w,'Tempo','D207');title(time,'Tempo impiegato');header(time,'A6:D6',['Data','Attivita','Minuti','Note']);input(time,'A7:D206');time.getRange('A7:A206').setNumberFormat('dd/mm/yyyy');list(time,'B7:B206',['Acquisizione','Consegna','Assistenza','Configurazione']);time.getRange('D6:D206').format.columnWidth=42;time.tables.add('A6:D206',true,'RegistroTempo');time.freezePanes.freezeRows(6);
  cell(launch,'A31','Ore registrate');formula(launch,'E31','=SUM(Tempo!C7:C206)/60');cell(launch,'A32','Ricerche completate');formula(launch,'E32','=20-COUNTIFS(Opportunita!F7:F26,"Da trovare")');
 }
 return {w,sum,sales,costs,pay,launch};
}

async function verifyAndSave(book,name,dir){
 const {w,sum,sales,costs,pay,launch}=book;
 w.recalculate();
 if(name==='Esempio_vendite'){
  checkNum(sum,'B17',236,'Vendite ottobre');checkNum(sum,'D17',13.2,'Commissioni ottobre');checkNum(sum,'G17',210.8,'Margine ottobre');checkNum(sum,'H17',198,'Accrediti ottobre');checkNum(sum,'J17',196,'Cassa ottobre');checkNum(sum,'K17',24.8,'Saldo ottobre');checkNum(sum,'G18',-29,'Rimborso novembre');checkNum(sum,'J18',-14.2,'Cassa novembre');checkNum(sum,'K18',0,'Saldo novembre');
 }else{
  checkNum(sum,'B20',0,'Registro vuoto');
  // Last capacity row, year cutoff, delayed payment, partial payment and zero-input tests.
  sales.getRange(`A${last}:H${last}`).values=[[date('2026-12-31'),'TEST','Diretto','Test','Template',100,0,10]];
  w.recalculate();checkNum(sum,'G19',90,'Ultima riga e 31 dicembre');checkNum(sum,'K19',90,'Vendita senza accredito');
  pay.getRange('A7:D7').values=[[date('2027-01-01'),'Diretto','TESTPAY',90]];w.recalculate();checkNum(sum,'H19',0,'Accredito fuori anno');
  pay.getRange('A7:D7').values=[[date('2026-12-31'),'Diretto','TESTPAY',40]];w.recalculate();checkNum(sum,'K19',50,'Accredito parziale');
  sales.getRange(`F${last}`).values=[[0]];sales.getRange(`H${last}`).values=[[0]];w.recalculate();checkNum(sum,'G19',0,'Zero esplicito');
  sales.getRange(`A${last}:H${last}`).clear({applyTo:'contents'});pay.getRange('A7:D7').clear({applyTo:'contents'});w.recalculate();checkNum(sum,'K19',0,'Ripristino registro vuoto');
 }
 if(launch){checkNum(launch,'E12',546.3,'Scenario misto');checkNum(launch,'E13',25,'Solo template');cell(launch,'C8',0);w.recalculate();checkNum(launch,'E12',144,'Scenario reagisce a input');cell(launch,'C8',3);w.recalculate();}
 const scan=await w.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:30},maxChars:1500});
 await fs.writeFile(path.join(previews,name+'-errori.jsonl'),scan.ndjson);
 assert.ok(!/"(?:value|text|displayValue)"\s*:\s*"#/.test(scan.ndjson),'Errori formule '+name);
 const inspection=await w.inspect({kind:'table',range:'Riepilogo!A16:K20',include:'values,formulas',tableMaxRows:5,tableMaxCols:11,maxChars:3500});await fs.writeFile(path.join(previews,name+'-calcoli.jsonl'),inspection.ndjson);
 const tabs=['Riepilogo','Vendite','Spese','Accrediti',...(launch?['Avvio','Opportunita','Tempo']:[])];
 for(const tab of tabs){const range=tab==='Riepilogo'?'A1:K28':tab==='Avvio'?'A1:G33':tab==='Opportunita'?'A1:G12':tab==='Tempo'?'A1:D12':tab==='Vendite'?'A1:J12':tab==='Spese'?'A1:F12':'A1:E12';const png=await w.render({sheetName:tab,range,scale:1.4,format:'png'});await fs.writeFile(path.join(previews,`${name}-${tab}.png`),new Uint8Array(await png.arrayBuffer()));}
 await (await SpreadsheetFile.exportXlsx(w)).save(path.join(dir,name+'.xlsx'));
 console.log('SALVATO '+name);
}

if(!process.argv.includes('--images-only')){
 await verifyAndSave(makeSales(false,false),'Template_vendite',buyer);
 await verifyAndSave(makeSales(true,false),'Esempio_vendite',buyer);
 await verifyAndSave(makeSales(false,true),'Registro_operativo',internal);
 await fs.writeFile(path.join(previews,'verifiche.json'),JSON.stringify({data:'2026-10-02',engine:'Artifact Tool; Excel desktop non verificato',checks},null,2));
}

const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const examplePreview=await fs.readFile(path.join(previews,'Esempio_vendite-Riepilogo.png'));
const cover=`<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1500"><rect width="2000" height="1500" fill="#F1F4F8"/><rect x="100" y="100" width="1800" height="1300" rx="32" fill="#FFFFFF"/><text x="170" y="210" font-family="Arial" font-size="28" fill="#526574">TEMPLATE EXCEL IN ITALIANO</text><text x="170" y="305" font-family="Arial" font-size="76" font-weight="bold" fill="${navy}">Vendite, spese e accrediti</text><text x="170" y="375" font-family="Arial" font-size="34" fill="#526574">Riepilogo mensile · file senza macro · esempio incluso</text><image x="155" y="445" width="1690" height="790" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${examplePreview.toString('base64')}"/><text x="170" y="1320" font-family="Arial" font-size="28" fill="#526574">Anteprima con dati fittizi. Download digitale. Microsoft Excel.</text></svg>`;
await sharp(Buffer.from(cover)).png().toFile(path.join(root,'immagini','01-copertina.png'));
for(const [name,heading,lines] of [
 ['02-contenuto','Cosa ricevi',['Template vuoto, pronto da compilare','Esempio con dati fittizi','Guida di utilizzo e CSV di esempio','2.000 righe per registro','Riepilogo su 12 mesi, anno modificabile']],
 ['03-funzionamento','Come funziona',['1. Registra vendite e commissioni','2. Classifica le spese','3. Registra gli accrediti effettivi','4. Leggi margine e flusso di cassa','Importazione CSV con mappatura manuale']],
 ['04-compatibilita','Prima dell’acquisto',['File .xlsx senza macro','Interfaccia e istruzioni in italiano','Importi in EUR','Progettato per Microsoft Excel','Nessun collegamento automatico ai marketplace']]
]){const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1500"><rect width="2000" height="1500" fill="${navy}"/><text x="150" y="240" font-family="Arial" font-size="78" font-weight="bold" fill="white">${escape(heading)}</text>${lines.map((t,i)=>`<text x="160" y="${440+i*150}" font-family="Arial" font-size="46" fill="#FFFFFF">${escape(t)}</text>`).join('')}<text x="160" y="1340" font-family="Arial" font-size="30" fill="#D2DDE7">Strumento organizzativo. Non sostituisce la contabilità.</text></svg>`;await sharp(Buffer.from(svg)).png().toFile(path.join(root,'immagini',name+'.png'));}
const thumbnail=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><rect width="1000" height="1000" fill="${navy}"/><text x="90" y="160" font-family="Arial" font-size="35" fill="#D2DDE7">TEMPLATE EXCEL IN ITALIANO</text><text x="90" y="330" font-family="Arial" font-size="92" font-weight="bold" fill="white">Vendite</text><text x="90" y="455" font-family="Arial" font-size="92" font-weight="bold" fill="white">Spese</text><text x="90" y="580" font-family="Arial" font-size="92" font-weight="bold" fill="white">Accrediti</text><text x="90" y="790" font-family="Arial" font-size="35" fill="#D2DDE7">File senza macro</text><text x="90" y="850" font-family="Arial" font-size="35" fill="#D2DDE7">Guida ed esempio inclusi</text></svg>`;
await sharp(Buffer.from(thumbnail)).png().toFile(path.join(root,'immagini','05-thumbnail.png'));
console.log('IMMAGINI E VERIFICHE COMPLETE');
