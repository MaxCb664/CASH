# CASH - Miglioramenti kit

Stato delle proposte: proposta, sperimentata, accettata o scartata.

Per ogni proposta registrare problema osservato, evidenza, modifica minima al kit, test di regressione e risultato. Collegare [il progetto](CASH.md).

Le osservazioni possono essere raccolte durante il lavoro; non pubblicare o modificare il kit globale automaticamente senza un incarico specifico.

## 2026-10-08 — Inventario resiliente a directory non leggibili
**Stato: proposta, non implementata nella skill globale.** Problema: `Sync-Obsidian.ps1` usa errori bloccanti e si arresta su directory temporanee residue con accesso negato. Evidenza: tentativo su `outputs/.../verifica/tmpfjbt1bac` fallito; inventario limitato a 10 file riuscito.

Modifica minima proposta: raccogliere gli errori di enumerazione per directory, continuare soltanto sui percorsi leggibili e inserire nell'inventario avviso e numero di directory escluse; lasciare bloccanti gli errori di scrittura/export e i conflitti. Non cambiare ACL né seguire junction per aggirare esclusioni.

Verifica futura: fixture con cartella non leggibile, cartella normale e link filesystem; confermare inventario parziale esplicito, note personali intatte ed export che conserva la protezione dai conflitti. Nessuna prova di questa modifica effettuata oggi.

## 2026-10-08 — Distinguere stato locale da stato piattaforme
**Stato: proposta documentale.** Le bozze del 2 ottobre sono confermate dalla memoria e dagli screenshot storici, non da una nuova ricognizione browser. Suggerimento: conservare sempre data dell'ultima verifica esterna e data dell'aggiornamento della nota, evitando che l'export suggerisca una pubblicazione recente. La distinzione è già riportata nella sintesi CASH; nessun cambiamento a skill globali.

## Note personali
Sezione riservata all'utente.
posso inserire un collegamento [[]]