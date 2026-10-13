import fs from 'node:fs/promises';
import path from 'node:path';
const root='F:/DEV/CASH/outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e';
const write=async(p,s)=>{await fs.mkdir(path.dirname(path.join(root,p)),{recursive:true});await fs.writeFile(path.join(root,p),s,'utf8');};
const page=(title,body)=>`<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font:17px/1.6 Arial,sans-serif;color:#243b53;background:#f1f4f8;margin:0}main{max-width:1000px;margin:40px auto;padding:44px;background:white;border-radius:16px}h1{font-size:36px;line-height:1.2}h2{margin-top:34px;font-size:24px}a{color:#2455a4}table{border-collapse:collapse;width:100%;font-size:15px}td,th{padding:12px;text-align:left;border-bottom:1px solid #dde4eb}th{background:#243b53;color:white}code{background:#eef2f6;padding:3px}img{width:100%;height:auto}li{margin-bottom:8px}.notice{background:#fff3d6;padding:16px}textarea,input,select{font:inherit;padding:10px;width:95%;margin:5px 0 16px}button{padding:12px 24px;background:#243b53;color:white;border:0;border-radius:5px;cursor:pointer}label{display:block;font-weight:bold}@media print{body{background:white}main{margin:0;padding:0}.noprint{display:none}h2{break-after:avoid}tr,img{break-inside:avoid}}</style><main>${body}</main></html>`;
await write('prodotto/Guida.html',page('Guida — Vendite e spese',`
<h1>Vendite, spese e accrediti</h1><p>Guida al template Excel in italiano. Versione 1.0, ottobre 2026.</p>
<h2>Inizia qui</h2><ol><li>Apri <strong>Template_vendite.xlsx</strong> e salva una copia per il tuo lavoro. <strong>Esempio_vendite.xlsx</strong> contiene esclusivamente dati fittizi.</li><li>In Riepilogo imposta l’anno in B4. Se esiste, inserisci in G4 il saldo netto ancora da ricevere dalle piattaforme al 1° gennaio. Se parti da zero, lascia 0.</li><li>Compila le celle gialle nei tre registri. Non sovrascrivere la colonna I di Vendite, che contiene formule.</li><li>Il riepilogo aggrega automaticamente i movimenti per mese. Puoi filtrare i registri dalle intestazioni.</li></ol>
<h2>I tre registri</h2><table><tr><th>Registro</th><th>Inserimento</th><th>Effetto</th></tr><tr><td>Vendite</td><td>Data movimento, ID univoco, canale, prodotto, categoria, lordo, rimborsi e commissioni. Accredito previsto facoltativo.</td><td>Netto piattaforma = lordo − rimborsi − commissioni. Alimenta il margine e il saldo da ricevere.</td></tr><tr><td>Spese</td><td>Data della spesa, categoria, descrizione, importo maturato; data e importo pagato quando avviene il pagamento.</td><td>La spesa maturata riduce il margine; quella pagata riduce la cassa nel mese del pagamento.</td></tr><tr><td>Accrediti</td><td>Data effettiva, canale, ID accredito, importo netto realmente ricevuto e note.</td><td>Alimenta la cassa. Sono ammessi accrediti parziali, cumulativi e addebiti negativi.</td></tr></table>
<h2>Importa un CSV senza perdere le formule</h2><ol><li>Apri il CSV in un file Excel separato tramite <strong>Dati → Da testo/CSV</strong>. Seleziona delimitatore e impostazioni locali corretti. Converte le date in date Excel e gli importi in numeri.</li><li>Mappa le colonne del tuo CSV alle intestazioni del registro. L’importazione non riconosce automaticamente esportazioni Etsy, Gumroad o altri marketplace.</li><li>Copia <strong>solo valori</strong> nelle colonne A:H di Vendite, partendo da riga 7. Inserisci eventualmente le date previste nella colonna J. Non incollare nella colonna I.</li><li>Controlla numero di righe, totale lordo e commissioni contro il CSV originale. Conserva l’originale.</li></ol><p>Il CSV incluso è un esempio, delimitato da punto e virgola, con decimali a virgola. Non è un’esportazione reale di un marketplace.</p>
<h2>Rimborsi e rettifiche</h2><p>Per un rimborso registrato a novembre su una vendita di ottobre, aggiungi una nuova riga con data di novembre, un nuovo ID movimento, lordo 0 e rimborso positivo. Non cambiare anche il rimborso della riga originale: sarebbe un doppio conteggio. Commissioni restituite possono essere inserite come importo negativo. Se il denaro viene addebitato sul conto, registra anche un accredito negativo alla data dell’addebito.</p>
<h2>Accrediti differiti e parziali</h2><p>Una vendita non è denaro già disponibile. Registra in Accrediti ciascun versamento effettivo, anche se arriva dopo 60 giorni. Se una piattaforma versa più ordini insieme, registra il totale una sola volta. Non registrare sia il totale del versamento sia i singoli ordini come accrediti.</p><p>Per una spesa pagata in più date, suddividila in righe: la prima contiene l’importo maturato completo; le successive hanno importo maturato 0 e solo il pagamento aggiuntivo. Usa la stessa descrizione con un riferimento alla spesa.</p>
<h2>Controlli prima di leggere i risultati</h2><ul><li>Date e importi devono essere valori Excel, non testo. Una data mancante non viene aggregata.</li><li>Gli ID movimento duplicati e alcuni campi incompleti vengono evidenziati. Il colore non sostituisce il controllo dei dati.</li><li>Un saldo piattaforme negativo richiede riconciliazione: saldo iniziale errato, versamenti duplicati, vendite mancanti o addebiti non registrati.</li><li>Ogni registro ha 2.000 righe disponibili, dalla 7 alla 2006. Oltre questo limite occorre estendere formule e riepiloghi; la versione fornita non promette estensione automatica.</li><li>L’anno selezionato controlla il riepilogo, non cancella i registri. Al cambio di anno aggiorna il saldo iniziale usando il saldo finale dell’anno precedente.</li></ul>
<h2>Compatibilità e limiti</h2><p>File .xlsx senza macro, formule standard, importi in EUR e istruzioni in italiano. Progettato per Microsoft Excel. Le formule e i file sono stati verificati con il motore di generazione; non è stata eseguita una prova nell’app Excel desktop. Google Sheets e LibreOffice non sono stati verificati. Nessuna connessione automatica ai marketplace.</p><p>Il margine è un riepilogo organizzativo prima di imposte e contributi. Il file non separa IVA, non costituisce un registro fiscale e non sostituisce la contabilità. Usa importi coerenti con i tuoi report e chiedi al tuo consulente come registrarli.</p>
<h2>Licenza</h2><p>È consentito usare e modificare il template per la propria attività. È vietato rivendere, redistribuire o pubblicare i file o le loro varianti. Leggi <a href="Licenza.txt">Licenza.txt</a>.</p>`));
await write('prodotto/Licenza.txt',`LICENZA DI UTILIZZO — VENDITE, SPESE E ACCREDITI — VERSIONE 1.0\n\nL'acquirente può utilizzare e modificare i file per la propria attività, su più dispositivi propri. Può condividere una copia compilata con collaboratori o consulenti incaricati della stessa attività.\nNon è consentito rivendere, distribuire, regalare o pubblicare i file sorgenti, il template vuoto o versioni modificate del template, né usarli come prodotto da rivendere a terzi.\nNessuna esclusiva è concessa. Il prodotto è uno strumento organizzativo, non un servizio contabile o fiscale. Restano salvi i diritti inderogabili del consumatore.\n`);
await write('prodotto/Esempio_importazione.csv','\uFEFFData movimento;ID movimento;Canale;Prodotto;Categoria;Lordo EUR;Rimborsi EUR;Commissioni EUR\n2026-10-02;MOV-001;Etsy;Template vendite;Template;29,00;0,00;4,20\n2026-10-05;MOV-002;Gumroad;Template vendite;Template;29,00;0,00;4,80\n2026-10-10;MOV-003;Diretto;Pulizia CSV;Servizio;149,00;0,00;0,00\n2026-10-31;MOV-004;Etsy;Template vendite;Template;29,00;0,00;4,20\n2026-11-02;RET-001;Gumroad;Rimborso MOV-002;Template;0,00;29,00;0,00\n');
await write('operativo/Inserzioni.md',`# Testi di inserzione pronti per copia e revisione

Prezzo base proposto: **29 €**. Lingua: italiano. Nessun bundle da 49 € pubblicato: prima validare la domanda.

## Etsy

**Titolo:** Template Excel vendite e spese in italiano | Riepilogo mensile, margine e accrediti | File digitale senza macro

**Descrizione:**

Organizza vendite, spese e accrediti in un unico file Excel. Registra i movimenti e consulta un riepilogo mensile che distingue il margine dal denaro effettivamente ricevuto.

Il download include:
- template Excel vuoto con registri di vendite, spese e accrediti;
- esempio compilato con dati fittizi;
- guida in italiano e CSV di esempio;
- licenza d'uso per la propria attività.

Disponibili 2.000 righe per ciascun registro e un riepilogo di 12 mesi con anno modificabile. File .xlsx, senza macro, importi in EUR. Per importare esportazioni CSV occorre mappare manualmente colonne, date e numeri: non è incluso un collegamento automatico ai marketplace.

Progettato per Microsoft Excel. Formule verificate nel motore di generazione; prova nell'app Excel desktop ancora da completare. Compatibilità con Google Sheets e LibreOffice non verificata. Prima della pubblicazione eseguire la prova desktop e aggiornare questa frase con il risultato reale, senza dichiarare compatibilità non provate.

È un prodotto digitale: non riceverai articoli fisici. Strumento organizzativo prima di imposte e contributi; non sostituisce contabilità o consulenza fiscale. Licenza per uso nella propria attività; vietata rivendita o redistribuzione.

**13 tag proposti (entro 20 caratteri ciascuno):**
excel vendite, template excel, gestione spese, riepilogo mensile, registro vendite, file italiano, tracker vendite, spese aziendali, planner business, excel italiano, download digitale, gestione accrediti, bilancio mensile

**Caricamento:** il file Vendite_e_spese_v1.zip e immagini 01–04. Non caricare Registro_operativo.xlsx o la cartella operativo. Selezionare file digitale e categoria coerente tra quelle offerte dalla piattaforma. Valuta EUR. Descrizione in italiano. Verificare prezzo al checkout, eventuale IVA aggiunta, commissioni e condizioni del negozio.

## Gumroad

**Nome:** Vendite e spese — Template Excel in italiano

**Sintesi:** Un template senza macro per distinguere vendite, margine mensile e accrediti effettivi.

**Descrizione:** usare la descrizione Etsy precedente, eliminando soltanto i riferimenti al marketplace. File da consegnare: Vendite_e_spese_v1.zip. Prezzo base: 29 € se supportato dal conto; se serve un'altra valuta, verificare prezzo e cambio prima di pubblicare. Copertina 01; immagini 02–04 come anteprime.

Non attivare sconti o affiliazioni all'avvio. Discover ha commissioni superiori: verificare il margine separatamente. L'IVA gestita dalla piattaforma non elimina imposte e adempimenti personali.

## Payhip / Ko-fi

Riutilizzare lo stesso ZIP, descrizione e anteprime solo quando si attiva il terzo canale. Nessun trasferimento di recensioni o affermazioni di vendita non documentate.

## FAQ da inserire

**Si collega a Etsy o Gumroad?** No. Importi i dati con copia dei valori e mappatura delle colonne.

**Posso usarlo senza macro?** Sì: il file non contiene macro.

**Posso cambiare anno?** Sì, da Riepilogo B4. Aggiorna anche il saldo iniziale al 1 gennaio.

**Posso registrare pagamenti dopo 60 giorni?** Sì. La cassa usa la data effettiva dell'accredito.

**È un software di fatturazione?** No. Non emette fatture e non separa l'IVA.

**Posso rivenderlo?** No; uso e modifiche per la propria attività sono consentiti dalla licenza.

**Assistenza:** inizialmente solo chiarimenti sul funzionamento e correzione di difetti riproducibili. La personalizzazione è un servizio separato e circoscritto. Inserire nel negozio un recapito autentico prima del lancio.
`);
await write('operativo/Servizio_149.md',`# Servizio diretto — CSV ordinato e riepilogo Excel

## Offerta

**149 € come prezzo base proposto**, con trattamento IVA e documentazione da confermare con il consulente prima dell'offerta al pubblico. Prima di accettare confermare per iscritto prezzo totale applicabile al cliente.

Consegna: un CSV normalizzato, un file Excel compilato, un riepilogo delle modifiche e una correzione entro sette giorni dalla consegna. Consegna proposta entro due giorni lavorativi dal ricevimento di dati completi e conferma d'ordine; proporre solo scadenze che puoi rispettare.

Limiti: un CSV, massimo 2.000 righe dati e 12 colonne; una valuta EUR; mappatura semplice; file senza informazioni personali sensibili o credenziali. Il lavoro deve poter essere completato e controllato in circa un'ora. Se una richiesta supera i limiti, non accettarla come questo pacchetto.

Incluso: normalizzazione delle date e dei numeri, spazi, segnalazione di righe identiche, rimozione di duplicati esatti soltanto se autorizzata per iscritto, importazione dei campi economici nel template e confronto dei totali prima/dopo.

Escluso: scraping, accesso agli account, integrazioni, recupero di dati mancanti, riconciliazione fiscale, dati sensibili, OCR, sviluppo su misura e assistenza continuativa.

## Prima di accettare

1. Chiedere intestazioni, numero righe, valuta, formato date e numeri, risultato atteso. Per la valutazione bastano tre righe anonimizzate.
2. Verificare che un ID duplicato non rappresenti linee dello stesso ordine o rate. Non deduplicare sulla sola chiave ordine.
3. Confermare mappatura, trattamento duplicati, prezzo totale, modalità di pagamento, scadenza e una correzione inclusa.
4. Usare una modalità tracciabile; documentazione e condizioni coerenti con l'inquadramento fiscale e i diritti del cliente. Nessuna clausola automatica di rinuncia ai diritti.

## Automazione locale

Lo script strumenti/normalizza_csv.py riceve CSV e mappa JSON. Non usa servizi esterni e non sovrascrive il sorgente. La mappa esempio è compatibile con il CSV dimostrativo del prodotto. Lo script non interpreta automaticamente CSV di Etsy o Gumroad: creare la mappa sull'esportazione reale.

Comando dalla cartella operativo:

    python strumenti/normalizza_csv.py ../prodotto/Esempio_importazione.csv --mappa strumenti/mappa_esempio.json --output risultato/Vendite.csv --report risultato/Report.json

Se Python non è disponibile nel PATH, usare l'eseguibile Python già disponibile sul proprio computer. In questa sessione è stato usato il runtime Python fornito dall'app.

Il CSV finale contiene le otto colonne A:H di Vendite. Aprirlo separatamente in Excel, convertire le date ISO in date Excel e incollare solo valori in A:H. La colonna I contiene formule e va preservata. Il report evidenzia duplicati, normalizzazioni e totali. Con --rimuovi-duplicati si eliminano soltanto righe normalizzate interamente identiche: usarlo esclusivamente dopo approvazione del cliente.

## Controllo e consegna

- Confrontare righe e somme con il sorgente, esaminando ogni rettifica monetaria.
- Verificare prima, metà e ultima riga; date a fine mese; rimborsi e commissioni.
- Aprire il file Excel, controllare il riepilogo e consegnare insieme al CSV e al report.
- Conservare l'originale durante la lavorazione. Concordare con il cliente conservazione e cancellazione dei suoi dati. Non inviare i file a strumenti AI esterni senza autorizzazione specifica.
- Registrare tempo, margine e pagamento nel registro operativo.
`);
await write('operativo/Richiesta_servizio.html',page('Richiesta CSV',`<h1>Richiesta di sistemazione CSV</h1><p>Modulo locale per preparare la richiesta. Non invia dati a nessun server. Non costituisce un ordine o un pagamento.</p><label>Numero di righe</label><input id="righe" type="number" min="1" max="2000"><label>Numero di colonne</label><input id="colonne" type="number" min="1" max="12"><label>Intestazioni del CSV</label><textarea id="intestazioni" rows="3"></textarea><label>Formato date e separatore decimale</label><input id="formati" placeholder="Esempio: gg/mm/aaaa, virgola"><label>Risultato desiderato</label><textarea id="risultato" rows="4"></textarea><label>Duplicati</label><select id="duplicati"><option>Segnalare senza rimuovere</option><option>Valutare insieme la rimozione di righe identiche</option></select><p>Non inserire credenziali, nominativi dei clienti o dati sensibili. Valuta prevista: EUR. Prezzo totale e condizioni saranno confermati separatamente.</p><button id="download">Scarica richiesta .txt</button><script>document.getElementById('download').onclick=()=>{const ids=['righe','colonne','intestazioni','formati','risultato','duplicati'];const text=ids.map(id=>id+': '+document.getElementById(id).value).join('\n');const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Richiesta_CSV.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};</script>`));
await write('operativo/Acquisizione.md',`# Acquisizione: 20 opportunità, due pubblicazioni

Nessun messaggio è stato inviato e nessun potenziale cliente è stato inventato. I 20 posti nel registro servono per richieste reali da selezionare. Non contattare indiscriminatamente utenti Etsy e non spostare fuori piattaforma clienti acquisiti su marketplace che lo vietano.

## Dove cercare

- Upwork Excel: https://www.upwork.com/freelance-jobs/excel/ — mercato attivo verificato il 2 ottobre 2026. Selezionare lavori di pulizia CSV e report semplici; evitare incarichi continuativi, scraping e budget incompatibili. Candidature possono avere costi e richiedono account: non aggiungerli automaticamente al budget.
- Reddit r/forhire: https://www.reddit.com/r/forhire/ — leggere regolamento e requisiti correnti prima di pubblicare. Non dare per acquisito che un nuovo account sia idoneo.
- Reddit r/ForHire_RemoteJobs: https://www.reddit.com/r/ForHire_RemoteJobs/comments/z3o7uz/ — il post dei moderatori richiede indicazione del budget e vieta link affiliati/job board. Ricontrollare le regole attuali; la seconda pubblicazione va sostituita se il gruppo non è pertinente o non consente l'offerta.
- Richieste pubbliche già incontrate in community di venditori che frequenti: rispondere solo quando il problema è esplicito e le regole permettono una proposta commerciale. Non usare messaggi in massa.

20 opportunità = richieste distinte e pertinenti, non venti messaggi a destinatari casuali. Compilare link, problema, stato e prossimo passo. Le ricerche non garantiscono disponibilità di clienti né prezzi da 149 €.

## Messaggio per una richiesta pertinente

Ciao, ho letto che devi [problema preciso]. Posso normalizzare un CSV fino a 2.000 righe e consegnare un Excel con riepilogo mensile. Prima ti chiedo intestazioni e tre righe anonimizzate per verificare che il lavoro rientri nel pacchetto. Il prezzo base è 149 €, con totale e condizioni confermati prima dell'ordine. Nessun accesso ai tuoi account. Se preferisci lavorare da solo, ho anche un template da 29 €.

## Pubblicazione dimostrativa

Titolo: CSV vendite ordinato e riepilogo mensile in Excel

Ho preparato un template Excel in italiano per organizzare vendite, spese e accrediti. L'esempio allegato usa dati fittizi e mostra la differenza tra margine e soldi ricevuti. Il template è disponibile a 29 €; posso anche sistemare un CSV fino a 2.000 righe con un pacchetto a prezzo base di 149 €. Importazione con mappatura manuale, nessun collegamento automatico ai marketplace. [Inserire link autentico solo dopo pubblicazione e se consentito dalle regole.]

## Versione inglese per gruppi internazionali

[For Hire] CSV cleanup and an Italian-language Excel sales summary — fixed scope

I can normalize one CSV with up to 2,000 rows and 12 columns and deliver a cleaned CSV, an Italian-language Excel summary, and a change report. No account access, scraping, or sensitive personal data. Proposed base price: €149; final total and delivery terms confirmed before booking. Please share column headers and a few anonymized sample rows so I can confirm scope. The Excel template and instructions are in Italian.

## Settimana tipo, massimo sei ore

Due ore per richieste e conversazioni; fino a tre per consegne; un'ora per assistenza e registro. Cronometrare anche ricerca, messaggi, revisioni e amministrazione. Nessuna recensione inventata. Chiedere testimonianza soltanto dopo consegna riuscita e consenso alla pubblicazione.

Giorno 14: venti interazioni pertinenti senza interesse concreto richiedono modifica di pubblico/offerta. Giorno 30: confrontare acquisti reali, ore e margine. Giorno 60: verificare soldi effettivamente ricevuti.
`);
await write('operativo/Piattaforme.md',`# Piattaforme e accrediti

Verifica delle fonti: 2 ottobre 2026. Le condizioni del singolo conto prevalgono su queste sintesi. Nessuna piattaforma garantisce vendite o accrediti entro un massimo assoluto di 60 giorni; verifiche, contestazioni e soglie possono allungare i tempi.

| Piattaforma | Uso | Costi / tempi da controllare |
|---|---|---|
| Etsy | Marketplace iniziale del template originale | 0,20 USD inserzione; 6,5% transazione; Italia 4% + 0,30 € pagamento; 0,8% operativa regolamentare. Altri oneri possibili: IVA sulle commissioni, Offsite Ads 15% o 12% secondo idoneità, conversione valuta, apertura negozio. Nuovi venditori: disponibilità generalmente 14–20 giorni, talvolta oltre, poi tempi di deposito. |
| Gumroad | Vendite tramite link diretto | 10% + 0,50 USD più gestione pagamento; carte indicate 2,9% + 0,30 USD. Discover: 30% incluso processing. Accrediti periodici con minimo sette giorni di maturazione; calendario, soglie e controllo conto da verificare. |
| Payhip | Alternativa con costi fissi bassi | Piano gratuito 5% oltre al gestore di pagamento. Accredito dipende dal gestore, non equivale a denaro bancario immediato. |
| Ko-fi | Shop e personalizzazioni | Shop 5% oltre alle commissioni del gestore. Pagamento al gestore collegato; disponibilità bancaria separata. |
| Creative Market | Grafica, se si valida quella famiglia | Candidatura del negozio; commissioni variabili. Verificare quota effettiva e calendario pagamenti prima del caricamento. |
| Fiverr | Servizi delimitati | Al venditore resta 80%; normale attesa di 14 giorni dopo completamento. 149 € di prezzo non corrispondono a 149 € di margine. |
| KDP | Solo pubblicazioni originali già vicine a essere pronte | Circa 60 giorni dalla fine del mese della vendita, quindi potenzialmente quasi 90 dalla singola vendita. Distribuzione estesa: circa 90 giorni dalla fine mese. Non incluso nell'obiettivo di cassa entro 60 giorni. |

Fonti ufficiali:
- https://www.etsy.com/sell
- https://www.etsy.com/it/legal/fees/
- https://help.etsy.com/hc/en-gb/articles/115015628847-What-are-Payment-Processing-Fees-for-Selling-on-Etsy
- https://help.etsy.com/hc/en-gb/articles/115015747228-How-to-Manage-Your-Payment-Account
- https://www.etsy.com/legal/creativity/
- https://gumroad.com/help/article/66-gumroads-fees
- https://gumroad.com/help/article/13-getting-paid
- https://payhip.com/pricing
- https://help.ko-fi.com/hc/en-us/articles/360009712917-Ko-fi-Shop-Sell-digital-physical-products
- https://support.creativemarket.com/hc/en-us/articles/201251700-Open-a-Shop-on-Creative-Market
- https://help.fiverr.com/hc/en-us/articles/34069565843985-How-Fiverr-works-for-freelancers
- https://kdp.amazon.com/en_US/help/topic/G202187870

## Controllo fiscale prima del lancio

Usare il servizio già acquistato. Chiedere: inquadramento di template e servizi, eventuale attività commerciale rispetto alla libera professione, IVA e vendite internazionali, documenti per ciascuna piattaforma, incassi differiti e rimborsi. Gestione IVA della piattaforma non significa esenzione fiscale personale.

La franchigia dei 5.000 € per lavoro autonomo occasionale riguarda contributi INPS, non una generale esenzione fiscale o un'autorizzazione a vendere abitualmente senza partita IVA.

Fonte: https://www.inps.it/it/it/dettaglio-approfondimento.schede-informative.49893.i-contributi-dei-lavoratori-autonomi-occasionali.html

## Fonti complementari

Prolific: studi personali, possibili lista d'attesa e disponibilità variabile; AI vietata salvo richiesta del ricercatore. UserTesting: test personali, normalmente pagamento dopo 14 giorni. Esclusi dal conto base. Vendita di oggetti propri: liquidità occasionale, non una rendita mensile.

https://www.prolific.com/participants-frequently-asked-questions
https://participant-help.prolific.com/en/articles/445029-can-i-use-ai-assistance-tools-in-my-submission
https://participant-support.usertesting.com/hc/en-us/articles/37633031351315-When-and-how-will-I-be-paid
`);
await write('operativo/Checklist_pubblicazione.md',`# Checklist di pubblicazione

## Prima
- [ ] Confermare inquadramento e documentazione con il consulente già incaricato.
- [ ] Aprire i tre Excel in Microsoft Excel desktop e verificare date, formule, filtri e un input modificato. Test desktop ancora da completare.
- [ ] Leggere le condizioni del prodotto e completare recapito autentico, informazioni venditore e politiche del negozio.
- [ ] Accedere a Etsy e Gumroad senza condividere password in chat.

## Etsy
- [ ] Verificare conto bancario, identità e commissione iniziale indicata dal proprio account.
- [ ] Scegliere italiano ed EUR, nome negozio autentico e categoria digitale coerente.
- [ ] Caricare solo Vendite_e_spese_v1.zip e immagini 01–04.
- [ ] Copiare titolo, descrizione e tag da Inserzioni.md; aggiornare risultato del test Excel.
- [ ] Prezzo base 29 €; verificare prezzo al cliente e imposte applicabili.
- [ ] Controllare costi pubblicitari, condizioni Offsite Ads e nessuna attivazione automatica di Etsy Ads.
- [ ] Verificare anteprima completa; pubblicare solo con dati venditore e condizioni corretti.

## Gumroad
- [ ] Verificare profilo, identità, paese, accrediti, valuta e requisiti account.
- [ ] Caricare ZIP e anteprime; prezzo base 29 € se disponibile.
- [ ] Copiare descrizione e compatibilità verificata.
- [ ] Controllare fee diretta e Discover separatamente; niente affiliazioni o sconti iniziali.
- [ ] Provare percorso e download con modalità di test disponibile; non creare una vendita fittizia per alterare statistiche.
- [ ] Pubblicare e registrare URL reale.

## Dopo
- [ ] Aprire il link pubblico da sessione non autenticata e verificare prezzo, descrizione e immagini.
- [ ] Verificare il contenuto scaricabile con acquisto/test consentito dalla piattaforma.
- [ ] Registrare vendita e commissioni quando reali; registrare l'accredito solo quando ricevuto.
- [ ] Iniziare ricerca di opportunità: nessun invio massivo, nessuna promessa di reddito.

Stato iniziale: materiali locali preparati; account non autenticati al controllo iniziale; nessuna inserzione pubblicata, nessuna spesa effettuata e nessun messaggio inviato.
`);
await write('INIZIA_QUI.html',page('Kit vendite digitali',`<h1>Kit per vendite digitali e piccoli servizi</h1><p>Prodotto iniziale: template Excel a prezzo base di 29 €. Servizio diretto: CSV ordinato e riepilogo, prezzo base di 149 €. Obiettivo economico: 500 € mensili prima di imposte e contributi.</p><p class="notice">Sono materiali per avviare e verificare l’offerta. Nessuna vendita è garantita. Account e pubblicazione richiedono accesso e verifiche personali; i file non sono ancora pubblicati.</p><h2>Prodotto da consegnare</h2><ul><li><a href="Vendite_e_spese_v1.zip">ZIP da caricare su Etsy e Gumroad</a></li><li><a href="prodotto/Guida.html">Guida per l’acquirente</a></li><li><a href="prodotto/Template_vendite.xlsx">Template Excel</a> e <a href="prodotto/Esempio_vendite.xlsx">esempio compilato</a></li><li><a href="immagini/01-copertina.png">Copertina</a>, <a href="immagini/02-contenuto.png">contenuto</a>, <a href="immagini/03-funzionamento.png">funzionamento</a>, <a href="immagini/04-compatibilita.png">compatibilità</a></li></ul><h2>Materiali tuoi, da non consegnare</h2><ul><li><a href="operativo/Registro_operativo.xlsx">Registro operativo con scenario, cassa, opportunità e tempo</a></li><li><a href="operativo/Inserzioni.md">Testi Etsy, Gumroad e FAQ</a></li><li><a href="operativo/Servizio_149.md">Offerta del servizio e procedura</a></li><li><a href="operativo/Richiesta_servizio.html">Modulo locale della richiesta</a></li><li><a href="operativo/Acquisizione.md">Canali e messaggi da adattare</a></li><li><a href="operativo/Piattaforme.md">Commissioni, accrediti e fonti</a></li><li><a href="operativo/Checklist_pubblicazione.md">Checklist di pubblicazione</a></li></ul><h2>Prima giornata</h2><ol><li>Apri il template e l’esempio in Excel e prova una modifica.</li><li>Conferma inquadramento fiscale, informazioni venditore e recapito.</li><li>Accedi ai negozi e carica ZIP, immagini e testi.</li><li>Verifica prezzo, anteprima e download prima del lancio.</li></ol><h2>Primo mese</h2><p>Budget iniziale massimo 100 €, senza pubblicità prima di due vendite a persone sconosciute. Da quattro a sei ore settimanali per acquisizione, consegne e assistenza. Valuta interesse al giorno 14, margine e ore al giorno 30, accrediti al giorno 60.</p><p>Scenario illustrativo: tre servizi e otto template = 679 € lordi. Con accantonamenti operativi del 10% sui servizi, 25% sui template e 30 € di costi ulteriori: circa 546 € prima di imposte e contributi. Le trattenute sono ipotesi da sostituire con costi reali.</p><img src="immagini/01-copertina.png" alt="Anteprima del template con dati fittizi">`));
await write('README.md',`# Kit operativo

Aprire INIZIA_QUI.html. Lo ZIP Vendite_e_spese_v1.zip contiene solo il prodotto destinato agli acquirenti. La cartella operativo e le verifiche sono private e non vanno caricate come download del prodotto.

Prezzi di prova: template 29 €, servizio diretto 149 €. Nessun negozio o cliente simulato. Nessun pagamento o pubblicazione eseguito.

Le formule sono verificate nel motore Artifact Tool; il test in Excel desktop deve essere completato prima del lancio. Una giornata di preparazione non garantisce tempi di onboarding delle piattaforme.

Creato il 2 ottobre 2026. Sorgenti riproducibili in F:/DEV/CASH/tools; output finali in questa cartella.
`);
console.log('MATERIALI SCRITTI');
