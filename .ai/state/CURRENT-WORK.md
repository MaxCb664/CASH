# CASH — stato per la ripresa

Aggiornato: 8 ottobre 2026, Europe/Rome. Sessione chiusa; preparazione del lancio ancora in corso.

## Obiettivo e fonti

Obiettivo: 500 € mensili dopo costi e commissioni, prima di imposte e contributi. È un obiettivo da validare, non un'entrata garantita. Fonte autorevole: `docs/README.md`, `docs/PROGETTO.md`, `docs/DECISIONI.md`, `docs/catalogo.json`. Task: `.ai/tasks/CASH-001-PREPARAZIONE-LANCIO.md`.

## Stato realmente ottenuto

- Kit CASH-001 conservato in `outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e`; ZIP acquirente invariato, materiali interni e registro aggiornati.
- Payhip Free Forever scelto come principale: prodotto remoto non creato, accesso del titolare ancora necessario nell'ultima verifica.
- Gumroad secondario: prodotto `qbcclq`, prezzo base 9,90 EUR salvato e ricaricato l'8 ottobre. Metodo di accredito mancante; prodotto non in vendita. Soglia di accredito osservata nell'account: 100 USD, da non generalizzare ad altri account.
- Etsy sospeso: bozza `4587304534` conservata a 29 €, ultimo controllo effettivo 2 ottobre. Nessuna pubblicazione o spesa.
- Scenario illustrativo aggiornato: 3 servizi e 18 template producono 505,95 €; 72 template producono 504,60 €, con le riserve del piano. Non sono vendite reali.
- Procedura riutilizzabile in `docs/PROCESSO_PRODOTTI.md`: per un nuovo prodotto verificare diversità sostanziale rispetto al catalogo. Nessuna automazione periodica attivata.

## Verifiche ed evidenze

Riutilizzate le evidenze dell'8 ottobre in `docs/verifiche/2026-10-08/ESITO.md`: sei test Python superati; ZIP locale e download da Gumroad Content identici; struttura del registro preservata; ricalcolo e anteprima Artifact Tool verificati; prezzo Gumroad persistente. Il download dall'editor non equivale a un checkout cliente.

Non eseguiti: Excel desktop, Google Sheets/LibreOffice, checkout completo con imposte e consegna cliente, verifica fiscale e dati venditore. Nessun controllo esterno o test del prodotto ripetuto per la sola chiusura documentale. Nessun subagente o revisore indipendente invocato.

## Prossimo passo concreto

Il titolare accede a Payhip o crea personalmente l'account. Alla ripresa verificare la sessione, caricare lo ZIP esistente con anteprime e descrizione da `operativo/Payhip_pronto.md` nel kit, impostare 9,90 EUR e salvare senza pubblicare. Il titolare completa pagamenti e dati privati; poi verificare checkout/download e prova Excel desktop, registrando ogni limite. Pubblicazione separata e da autorizzare; Etsy resta sospeso.

## Precauzioni per la ripresa

Non rilanciare alla cieca `tools/build-kit.mjs`, `tools/write-materials.mjs`, `tools/apply-free-plan.py` o `tools/update-scenario.mjs`: percorsi fissi, testi storici e operazioni non idempotenti possono sovrascrivere stato o backup. Nessun dato privato o credenziale in memoria.

La cartella non è un repository Git: branch/HEAD non disponibili, nessun commit eseguito. Eventuale messaggio futuro, dopo inizializzazione autorizzata: `docs: salva stato CASH e piano dei canali gratuiti`.

Memoria personale: `docs/obsidian/CASH.md`, esportazione delle quattro note nel vault `F:\MAXROM\MEM\Progetti\CASH-unistack-94de8cd4094d`. Esito della chiusura in `docs/CHIUSURA_2026-10-08.md`. Inventario automatico limitato a 10 file per directory temporanee non leggibili; analisi semantica basata anche sulle fonti lette direttamente.
