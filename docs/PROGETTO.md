# Obiettivi, asset e stato

## Obiettivo
500 € mensili dopo costi/commissioni, prima di imposte e contributi. Budget disponibile dichiarato nel piano: 1.000 €, massimo 100 € di spesa iniziale. Pagamenti differiti fino a 60 giorni accettati; nessuna certezza di vendite o incassi quotidiani. Preparazione entro una giornata per prodotto; gestione iniziale 4–6 ore/settimana, obiettivo successivo 2–3.

## Prodotto esistente
SKU `CASH-001`, Vendite e spese v1: template Excel italiano senza macro, esempio fittizio, guida HTML, CSV e licenza per uso nella propria attività. Quattro fogli: Riepilogo, Vendite, Spese, Accrediti; 2.000 righe per registro; anno modificabile. Margine maturato, fondi in attesa e liquidità ricevuta separati. Non è un servizio contabile/fiscale né un'integrazione automatica con marketplace.

Kit: `outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e`. ZIP: `Vendite_e_spese_v1.zip`. Materiali operativi privati esclusi dal download: registro gestione, offerta CSV da 149 €, modulo locale richiesta, normalizzatore Python, testi inserzioni, piano acquisizione, fonti e checklist.

## Stato dei canali — 8 ottobre 2026
- Payhip Free Forever principale: materiali predisposti; accesso del titolare necessario, prodotto non ancora caricato.
- Gumroad secondario: prezzo9,90 EUR effettivamente salvato nell'editor qbcclq, verificato oggi. Prodotto non in vendita; metodo accredito mancante, soglia osservata100 USD per l'Italia.
- Etsy sospeso per decisione del titolare: bozza4587304534 conservata a29 €, non modificata in questa sessione.
- Prezzo9,90 € approvato dal titolare; non è più soltanto una proposta. Servizio149 € mantenuto.
- Nessuna nuova pubblicazione, spesa o messaggio commerciale effettuati; nessuna vendita verificata.
- Scenario operativo aggiornato:3servizi e18template =505,95 € di margine illustrativo, oppure72template =504,60 €. Dettagli e fonti nel piano corrente.

## Verifiche e limiti
Formule controllate nel motore Artifact Tool: rimborsi, accrediti parziali, cambio anno e ultime righe. Sei test Python superati per CSV/integrità. ZIP verificato. Excel desktop ancora da provare, Google Sheets/LibreOffice non verificati. Documentazione fiscale e informazioni venditore da controllare con il servizio fiscale già acquistato; non risultano confermate in chat.

## Sorgenti
`tools/build-kit.mjs`: generatore del primo prodotto (percorsi specifici, non usare per un prodotto nuovo senza adattamento; riesecuzione completa sovrascrive il kit).
`tools/write-materials.mjs`: materiali iniziali; alcune informazioni storiche, non rieseguire senza riconciliare lo stato attuale.
`tools/finalize-status.py`: aggiorna lo stato del primo lancio; aggiunge testi, non rieseguire alla cieca.
`tools/verify-kit.py`, `tools/package-kit.py`: verifiche e confezionamento del primo prodotto.
`tools/nuovo_prodotto.py`: scaffolding riutilizzabile per prodotti successivi. Nessuno di questi script pubblica o crea vendite.
