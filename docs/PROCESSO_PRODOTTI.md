# Produzione su richiesta di prodotti diversi

## Come richiederla
“Crea un nuovo prodotto per [pubblico] che risolva [problema], diverso dal catalogo. Prepara file, guida, immagini e inserzioni per Etsy e Gumroad.”
Oppure “Crea il prossimo prodotto”: scegliere un problema distinto dal catalogo e motivarlo con offerte pertinenti verificate. Se mancano preferenze opzionali, procedere con una scelta dichiarata; chiedere solo dati essenziali. Non serve un'attività ricorrente: eseguire solo quando richiesto.

## Procedura da eseguire a ogni richiesta
1. Leggere AGENTS.md, PROGETTO.md, DECISIONI.md e catalogo.json; verificare esistenza e stato dei prodotti. Non usare soltanto la memoria della chat.
2. Scegliere pubblico, problema, risultato concreto, formato e limite di assistenza. Un cambio di colori, nome, lingua o anno non è un prodotto diverso. Confrontare scopo, input, output e flusso d'uso: almeno il problema o il risultato principale deve essere distinto. Reimpiegare stile e infrastruttura, non spacciare lo stesso template per novità.
3. Cercare almeno 3 schede comparabili; registrare URL, data, valuta, prezzo corrente/listino, contenuto e limiti. Non scaricare/copiare asset dei concorrenti. Se il prezzo non è verificabile, escluderlo dal confronto numerico.
4. Stabilire un prezzo motivato; aggiornare scenario margine/cassa. Per il primo giorno evitare integrazioni esterne, macro e software da mantenere. Con budget massimo100 € complessivo iniziale, non avviare spese per ogni nuovo prodotto automaticamente.
5. Avviare `python tools/nuovo_prodotto.py --slug ... --nome ... --pubblico ... --problema ... --risultato ... --formato ... --prezzo ...`. Lo script crea cartelle, brief e registro; non genera il prodotto. Usare il runtime Python disponibile.
6. Creare il prodotto secondo il brief usando la skill adatta al formato. Per Excel leggere spreadsheets; per PDF/docx/slide leggere le rispettive skill. Separare `prodotto`, `immagini`, `operativo`, `verifica`. Materiali interni mai nel download.
7. Generare esempio fittizio, guida rapida, licenza, descrizione e FAQ; dichiarare cosa è automatico e cosa richiede input manuale. Nessuna promessa fiscale, reddito certo o compatibilità non provata. Verificare licenze degli asset e indicare assistenza AI dove richiesto.
8. Verificare casi realistici, input vuoti, limite dimensioni e casi di errore; ricalcolare formule e controllare anteprime. Evitare test che controllano solo la propria implementazione. Scrivere esito e limiti in `verifica/ESITO.md`.
9. Confezionare ZIP con lista esplicita dei soli file acquirente; verificare apertura e corrispondenza ai file originali. Produrre manifest con hash, dimensioni e versione. Non sovrascrivere i prodotti esistenti.
10. Preparare titolo, descrizione, tag, prezzo, immagini e istruzioni piattaforma. Se la richiesta comprende caricamento, salvare bozze tramite strumenti disponibili nell'account autorizzato. Pubblicare solo se richiesto/già autorizzato e i requisiti sono completi. Non accettare nuove condizioni vincolanti né inserire dati sensibili senza il flusso previsto. In caso di blocco, completare il kit e documentare il motivo reale.
11. Verificare visivamente stato salvato; registrare URL/ID veri e screenshot. Aggiornare catalogo, stato e storico. Distinguere predisposto, bozza salvata, pubblicato e prima vendita. Non dichiarare attività esterne mai eseguite.

## Criteri di completamento
File funzionanti, esempio coerente, guida/licenza, anteprime leggibili, ricerca prezzo datata, ZIP verificato, inserzioni pronte e catalogo aggiornato. Una scheda scaffolding non soddisfa questi criteri. Consegna con link locali e soli limiti reali.

## Idee distinte, ancora non validate
- Inventario domestico/trasloco: ubicazione scatole e checklist spostamenti; pubblico privati.
- Planner consegne per freelance: scadenze e carico di lavoro, senza reddito/spese.
- Kit report di avanzamento: modello documento o presentazione da compilare.
- Script per rinominare file con anteprima e annullamento: risultato diverso dal normalizzatore CSV esistente.
Prima di realizzarle controllare il catalogo e fare il confronto prezzi. Le idee non sono prodotti creati né domanda dimostrata.
