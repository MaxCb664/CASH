# CASH — stato per la ripresa

Aggiornato: 13 ottobre 2026, Europe/Rome. Preparazione del lancio e canali gratuiti in corso.

## Obiettivo e fonti

Obiettivo: 500 € mensili dopo costi e commissioni, prima di imposte e contributi. È un obiettivo da validare, non un'entrata garantita. Fonte autorevole: `docs/README.md`, `docs/PROGETTO.md`, `docs/DECISIONI.md`, `docs/catalogo.json`. Task: `.ai/tasks/CASH-001-PREPARAZIONE-LANCIO.md`.

## Stato realmente ottenuto

- Repository GitHub: inizializzato e collegato a `https://github.com/MaxCb664/CASH` (branch `main`). File `.ai/unistack.json` creato con configurazione GitHub sincronizzata.
- Kit CASH-001 conservato in `outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e`; ZIP acquirente (`Vendite_e_spese_v1.zip`) e 5 file interni intatti.
- Payhip Free Forever: account creato dal titolare il 13 ottobre 2026. Prezzo base di lancio 2,99 € (testi in `operativo/Payhip_pronto.md`).
- Ko-fi Shop: account creato dal titolare il 13 ottobre 2026. Scheda pronta in `operativo/Kofi_pronto.md` a 2,99 € (accredito diretto, IVA a carico del venditore).
- Gumroad secondario: bozza `qbcclq` a 9,90 EUR salvata. Prodotto non in vendita per accrediti non configurati (soglia osservata 100 USD).
- Etsy sospeso: bozza `4587304534` conservata a 29 €, senza modifiche o costi.
- Scenario operativo: a 2,99 € l'obiettivo di 500 € netti/mese richiede circa 220–237 vendite di soli template, oppure 3 servizi da 149 € + 57 template a 2,99 €.

## Verifiche ed evidenze

- Verifiche di integrità del kit superate (`verify-kit.py` 6 test superati; `verify-free-plan.py` superato).
- Controllo GitHub (`GitHub-Project.ps1 -Action Check`): verificato con successo sul remote `https://github.com/MaxCb664/CASH`.
- Non eseguiti: prova Excel desktop locale, checkout end-to-end acquirente, verifica fiscale e dati venditore completi.

## Prossimo passo concreto

1. **Caricamento bozza Payhip**: accedere alla dashboard Payhip (`payhip.com/products/add`), caricare `Vendite_e_spese_v1.zip`, le 4 immagini da `immagini/`, titolo, descrizione e prezzo di lancio 2,99 € da `operativo/Payhip_pronto.md`, impostando visibilità "Unlisted".
2. **Caricamento bozza Ko-fi Shop**: aggiungere il prodotto digitale su Ko-fi Shop con gli stessi asset e note da `operativo/Kofi_pronto.md`.
3. **Collegamento pagamenti**: configurare Stripe e/o PayPal nei rispettivi pannelli di Payhip e Ko-fi (direttamente dal titolare, senza condividere credenziali o dati sensibili).
4. **Verifica Excel desktop**: testare apertura e formule di `Template_vendite.xlsx` ed `Esempio_vendite.xlsx` con l'applicazione Microsoft Excel desktop locale.

## Precauzioni

Non rilanciare generatori storici del primo kit alla cieca (`tools/build-kit.mjs`, `tools/write-materials.mjs`). Mantenere segretezza di credenziali e IBAN. Nessuna spesa o campagna commerciale non autorizzata.
