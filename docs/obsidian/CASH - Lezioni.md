# CASH - Lezioni

Per ogni lezione: data, contesto, evidenza, cosa ha funzionato o fallito e quando riusarla. Collegare [il progetto](CASH.md).

Non registrare come lezione verificata un'ipotesi o un piano non eseguito.

## 2026-10-08 — Lezioni dalle evidenze del primo kit

- **Separare margine e cassa.** Contesto: vendite e accrediti differiti. Evidenza: registri distinti e controlli su accrediti parziali/rimborsi in `verifica/verifiche.json`. Utile per valutare se entrate maturate possono sostenere le spese; non costituisce validazione fiscale.
- **Test del motore e prova desktop sono diversi.** Formule controllate nel motore di generazione, Excel desktop ancora non verificato. Riutilizzare questa distinzione nelle dichiarazioni di compatibilità.
- **Catalogo e brief aiutano a riprendere il lavoro.** File `docs/catalogo.json`, `tools/nuovo_prodotto.py`, processo e storico esistono. I controlli esatti evitano collisioni note; non dimostrano originalità di un'idea.
- **Confezionamento con lista esplicita.** `tools/package-kit.py` include soltanto cinque file acquirente e confronta byte/hash. Evita di inserire registro privato o materiali operativi nel download; non rigenerare il pacchetto senza necessità.
- **Il prezzo iniziale è un'ipotesi.** Il confronto del 2 ottobre ha motivato una proposta inferiore; non ci sono acquisti reali che provino il prezzo ottimale. Nessun insegnamento sulle conversioni è ancora verificato.

## 2026-10-08 — Limite della ricognizione Obsidian
Lo script d'inventario si arresta quando incontra vecchie directory temporanee senza accesso. Con `-MaxFiles 10` ha creato le note, segnalando l'inventario parziale. Non è una soluzione generale: l'analisi del progetto deve continuare dai percorsi pertinenti leggibili e dichiarare le parti escluse.

## 2026-10-08 — Pubblicazione gratuita e verifica del download
Il costo di pubblicazione è diverso dalle commissioni di vendita: Payhip Free Forever evita canoni/inserzioni ma applica5% oltre al processing. L'utente ha scelto il piano gratuito e sospeso Etsy. L'assenza di costi di upload non prova disponibilità di clienti.

Il file scaricato dalla scheda Content di Gumroad è stato confrontato con lo ZIP locale: SHA256 identico. È una prova del contenuto remoto, non del checkout del cliente, ancora bloccato dagli accrediti mancanti. Il conto italiano mostra soglia100 USD: il calendario settimanale non garantisce un accredito ogni settimana.

## Note personali
Sezione riservata all'utente.
