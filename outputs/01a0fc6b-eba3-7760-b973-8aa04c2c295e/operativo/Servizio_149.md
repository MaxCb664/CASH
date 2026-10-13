# Servizio diretto — CSV ordinato e riepilogo Excel

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
