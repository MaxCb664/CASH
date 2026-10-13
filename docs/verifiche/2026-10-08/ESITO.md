# Verifiche del piano gratuito — 8 ottobre 2026

Directory comandi: `F:\DEV\CASH`. Nessun agente indipendente invocato.

| Controllo | Esito | Evidenza |
|---|---|---|
| `python tools/verify-kit.py` con runtime incluso | Superato | Sei test CSV/struttura XLSX; eseguiti prima e dopo modifica registro |
| ZIP locale, cinque file e confronto manifest SHA256 | Superato | `tools/apply-free-plan.py`, `kit.json`; ZIP non rigenerato |
| Download da Gumroad Content tramite browser | Superato | File scaricato e `Get-FileHash` identico al pacchetto locale |
| Prezzo Gumroad dopo salvataggio e nuova scheda | Superato | Amount9.90 EUR; `gumroad-prezzo-visibile.jpg` |
| Ricalcolo scenario Artifact Tool | Superato | `tools/update-scenario.mjs`:505,95 € e72template; `scenario.json` |
| Anteprima scenario prima/dopo | Superato | PNG visionate, input/output leggibili |
| Struttura registro prima/dopo | Superato | `tools/verify-free-plan.py`: stessi fogli, tabelle, formule, convalide e pannelli |
| Microsoft Excel desktop | Non eseguito | Nessuna app nativa disponibile nel controllo della sessione; non equivale al motore di generazione |
| Google Sheets/LibreOffice | Non eseguito | Compatibilità non dichiarata |
| Prodotto Payhip remoto | Bloccato | Schermata di accesso; richiesto al titolare accesso/creazione personale |
| Checkout completo cliente e imposte/totale | Non eseguito | Prodotto Gumroad non in vendita e metodo accredito mancante; Payhip non autenticato |
| Verifica fiscale e dati venditore | Non eseguito | Da completare con il titolare e il servizio fiscale previsto |

Durante il controllo dello scenario, l'asserzione iniziale506 € è fallita: era il valore arrotondato del piano. Corretto il valore atteso a505,95 € senza cambiare la formula; successiva verifica superata. Nessun file XLSX finale era stato sovrascritto al momento del controllo fallito.

Prodotto, ZIP e materiali acquirente preservati. Modificati il registro operativo e la documentazione corrente. Nessuna spesa, messaggio commerciale o pubblicazione eseguiti.

Primo export Obsidian fermato dal controllo conflitti: un'annotazione personale aggiunta a CASH - Miglioramenti kit.md nel vault. Confronto eseguito, annotazione conservata anche nella fonte locale prima di riprovare; nessuna nota personale rimossa.

Export finale Obsidian superato dopo aver preservato anche la formattazione esatta della nota del vault; quattro copie confrontate con SHA256 e identiche. Nessun conflitto forzato e nessun controllo disattivato. Ultimo controllo Payhip: ancora schermata di accesso, caricamento non eseguito; domanda di accesso al titolare pendente.
