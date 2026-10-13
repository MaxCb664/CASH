---
tags: [unistack, progetto]
tipo: memoria-progetto
created: 2026-10-08
updated: 2026-10-08
status: preparazione-lancio
---
# CASH

> [!important] Stato corrente del piano
> L'8 ottobre il titolare ha approvato Payhip gratuito principale, Gumroad secondario e prezzo base9,90 €. Prezzo Gumroad applicato; Etsy sospeso. Payhip richiede ancora accesso del titolare. I riferimenti alla precedente proposta di prezzo e alla ricognizione senza browser nelle sezioni storiche descrivono il lavoro precedente alla modifica. Vedere l'aggiornamento operativo più avanti.

## Sintesi, destinatari e obiettivo
Ricognizione del **8 ottobre 2026**. CASH è un progetto di monetizzazione con strumenti locali, non un'applicazione web distribuita. Voglio sostenere i miei progetti di medio e lungo periodo con circa 500 € mensili dopo costi e commissioni, prima di imposte e contributi, limitando il tempo di gestione.

Ho preparato con Codex il prodotto `CASH-001`, un template Excel in italiano per piccoli venditori online, e un servizio circoscritto di sistemazione CSV da 149 €. Il kit esiste; la domanda e le entrate non sono ancora validate. Budget del piano: 1.000 €, massimo 100 € iniziali; gestione iniziale prevista 4–6 ore settimanali. Accetto accrediti differiti, ma gli ordini non equivalgono a liquidità disponibile.

La memoria locale autorevole è in `docs/PROGETTO.md`, `docs/DECISIONI.md`, `docs/catalogo.json` e `docs/PROCESSO_PRODOTTI.md`. La nota precedente `docs/obsidian/CASH - Prodotti digitali e piccoli servizi.md` è conservata integralmente; questa sintesi autonoma ne riprende i fatti utili per l'esportazione nelle quattro note UNISTACK.

## Architettura, stack e flussi
**Generazione:** `tools/build-kit.mjs` usa JavaScript/Node, `@oai/artifact-tool` per Excel e `sharp` per immagini. I percorsi puntano al primo kit: non è un generatore universale pronto per qualsiasi prodotto.

**Elaborazione locale:** `operativo/strumenti/normalizza_csv.py`, dentro il kit, usa la libreria standard Python. Una mappa JSON specifica colonne, separatori e formato data. Valida fino a 2.000 righe e 12 colonne, segnala errori e duplicati, neutralizza formule nei testi; rimuove duplicati soltanto quando richiesto esplicitamente. Non accede agli account né invia dati in rete.

**Persistenza:** prodotti nei file XLSX/CSV/ZIP; catalogo in `docs/catalogo.json`; documentazione Markdown/HTML; nessun database o backend di progetto individuato. `tools/nuovo_prodotto.py` crea brief, cartelle e voce nel catalogo. Blocca duplicati esatti, ma non giudica originalità semantica e non genera il prodotto completo.

**Flusso acquirente:** download ZIP → lettura guida → apertura Excel → inserimento di vendite, spese e accrediti → riepilogo mensile. I quattro fogli separano lordo, rimborsi, commissioni, margine e cassa. Nessuna macro e nessuna sincronizzazione automatica con Etsy/Gumroad.

**Distribuzione:** upload manuale assistito tramite browser nei due marketplace. Materiali operativi privati e file di verifica restano fuori dal download. Lo ZIP contiene solo template, esempio, guida, licenza e CSV.

## Funzionalita, stato e prossimo passo
Implementato: template a quattro fogli con 2.000 righe per registro, esempio fittizio, guida, licenza, CSV, immagini, registro operativo, offerta del servizio, modulo locale, normalizzatore e scaffolding per nuovi prodotti.

Stato esterno **documentato al 2 ottobre**, non ricontrollato nel browser l'8 ottobre:

- Etsy Byte4You: bozza digitale `4587304534`, prezzo salvato 29 €, ZIP e quattro immagini, 13 tag, rinnovo manuale e assistenza AI dichiarata.
- Gumroad: prodotto `qbcclq` salvato a 29 EUR; ZIP, cover e thumbnail caricati. La piattaforma segnalava metodo di accredito mancante e impediva la pubblicazione.
- Non risultano pubblicazione, vendite o messaggi commerciali verificati. Nessuna spesa effettuata dall'assistente nell'esecuzione documentata.

Pianificato: test Excel desktop, verifica fiscale/venditore, scelta prezzo, verifica download, pubblicazione e 20 interazioni pertinenti. Payhip/Ko-fi e altri canali sono alternative successive, non configurazioni già eseguite. Nessuno scheduler attivo.

**Prossimo passo:** provare il file in Excel desktop e completare personalmente il metodo di accredito Gumroad; poi scegliere il prezzo prima del lancio. Le date dei controlli a 14/30/60 giorni partiranno dall'avvio effettivo, ancora da fissare.

## Decisioni e motivazioni
Il 2 ottobre ho scelto una sola famiglia di prodotti per contenere configurazione e assistenza. Il servizio CSV integra il prodotto e ha un perimetro ristretto: massimo 2.000 righe/12 colonne, una correzione e circa un'ora di consegna. Non include integrazioni o sviluppo su misura.

Il prezzo iniziale di 29 € è salvato nelle bozze. Dopo il mio dubbio sul prezzo è stato confrontato un campione di quattro schede: Nomika 7,99 USD, PatternsBeyond 16 USD, ArtStudioGR 18,21 USD in promozione, WembyWorks 1,49 USD in promozione. Sono prezzi osservati il 2 ottobre, non valori aggiornati oggi né qualità dei file verificata.

**9,90 € è una proposta non ancora approvata/applicata.** Italiano e separazione margine/accrediti possono essere utili, ma non provano una disponibilità a pagare 29 €. Fonti e limiti: `docs/RICERCA_PREZZI_2026-10-02.md`. Con la riserva semplificata del 25% e 30 € mensili di costi, a 9,90 € servirebbero 72 template, oppure tre servizi e 18 template, per superare 500 €. Sono soglie illustrative, non previsioni.

Ho scelto memoria esterna e catalogo per riprendere il processo senza dipendere dalla chat. Un nuovo prodotto deve risolvere un problema o produrre un risultato distinto; una variazione cosmetica non basta.

## Avvio, verifiche e distribuzione
Radice: `F:\DEV\CASH`. Per consultare il kit aprire `outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e/INIZIA_QUI.html`. Non serve un server. I sorgenti sono in `tools`; nessun repository Git o configurazione `.ai/unistack.json` rilevati.

Comandi di riferimento: `python tools/verify-kit.py` verifica il kit esistente e scrive fixture nella sua cartella verifica; `python tools/nuovo_prodotto.py --help` documenta lo scaffolding. `tools/package-kit.py` rigenera lo ZIP del primo prodotto; `build-kit.mjs` e `write-materials.mjs` possono sovrascrivere output/testi storici, quindi non rieseguirli alla cieca.

**Evidenze storiche del 2 ottobre:** `verifica/verifiche.json` registra controlli numerici nel motore Artifact Tool; `tools/verify-kit.py` contiene sei test su importi, formule nei testi, esempio, duplicati/date, capienza e struttura XLSX. La sessione precedente riporta sei test superati. `verifica/manifest-prodotto.json` registra hash dei cinque file; screenshot di salvataggio in `verifica/etsy-bozza.jpg` e `verifica/gumroad-bozza.jpg`. Test e generazione non rieseguiti per questa modifica documentale.

**Controlli dell'8 ottobre:** letti istruzioni, quattro documenti autorevoli, processo, catalogo, sorgenti chiave e report salvato. Script incluso `Sync-Obsidian.ps1 -ProjectRoot F:\DEV\CASH`: fallito per cartella temporanea con accesso negato. Ripetuto con `-MaxFiles 10`: superato per la preparazione delle note, inventario parziale esplicitamente indicato. L'analisi semantica ha consultato ulteriori file fuori da quell'inventario. Export e confronto copie sono registrati nel riepilogo finale della sessione.

Analisi e documentazione svolte dal coordinatore; nessun subagente o revisore indipendente invocato.

## Rischi e domande aperte
- Test Excel desktop non eseguito; Google Sheets/LibreOffice non verificati. Un test del motore non prova la compatibilità delle app.
- Dati venditore/inquadramento fiscale non confermati: usare il servizio fiscale già acquistato.
- Domanda e tempi di accredito da validare; nessuna certezza di vendite quotidiane o 500 € mensili.
- Confronto prezzi piccolo e datato; sconti e valute diverse non sono una media di mercato.
- Scaffolding con confronti esatti: duplicati semantici richiedono analisi del problema/risultato.
- Generatori con percorsi fissi e materiali storici: rischio di sovrascrivere una decisione recente quando rieseguiti.
- Inventario limitato a 10 percorsi a causa di directory temporanee non leggibili. Non sono stati alterati permessi o cancellati file per aggirare il limite.

## Collegamenti
- [Idee](CASH%20-%20Idee.md)
- [Lezioni apprese](CASH%20-%20Lezioni.md)
- [Miglioramenti del kit](CASH%20-%20Miglioramenti%20kit.md)

Collegamenti trasversali intenzionali: [[Mappa dei progetti]], [[Prodotti digitali]], [[Validazione della domanda]], [[Automazione dei processi]], [[Decisioni di prezzo]]. Non implicano che queste note esistano già nel vault.

Editor reali: [Etsy](https://www.etsy.com/your/shops/me/listing-editor/edit/4587304534), [Gumroad](https://gumroad.com/products/qbcclq/edit/content). Questi URL non certificano lo stato attuale senza accesso alla piattaforma.


## Aggiornamento operativo — 8 ottobre 2026, piano gratuito
Ho approvato Payhip Free Forever come principale, Gumroad come secondario e9,90 € come prezzo base. Etsy resta sospeso con bozza a29 €. Gumroad è stato aggiornato e ricaricato:9,90 EUR salvato; non in vendita per accrediti mancanti. Nel conto italiano compare soglia100 USD. Payhip non è ancora configurato: accesso del titolare richiesto, nessun URL prodotto inventato.

Sei test Python nuovamente superati. Registro operativo aggiornato e verificato nel motore Artifact Tool:3servizi e18template danno505,95 € illustrativi;72template danno504,60 €. Excel desktop non disponibile; checkout/download end-to-end non verificato per blocchi degli account. Nessuna pubblicazione, spesa o messaggio effettuati. Prossimo passo: completare accesso Payhip e pagamenti, poi prova desktop e checkout. Dettagli nel progetto: docs/PIANO_CANALI_GRATUITI_2026-10-08.md.

## Chiusura della sessione — 8 ottobre 2026

Ho salvato un passaggio di consegne riutilizzabile in `F:\DEV\CASH\.ai\state\CURRENT-WORK.md` e il task con criteri di accettazione in `.ai/tasks/CASH-001-PREPARAZIONE-LANCIO.md`. La sessione è chiusa, ma la preparazione del lancio resta in corso: Payhip attende il mio accesso personale e Gumroad il metodo di accredito. Alla ripresa si prepara la bozza Payhip usando il kit esistente, poi si verificano pagamenti, checkout e prova desktop. Pubblicazione separata; Etsy resta sospeso.

Per questa chiusura sono state riutilizzate le verifiche recenti, senza ripetere test o controlli degli account. Non c'è un repository Git e non è stato eseguito un commit. Nessun subagente invocato. Memoria locale e copia Obsidian restano distinte; l'export è una copia a una direzione, non una sincronizzazione in background.

## Note personali
Questa sezione e riservata alle annotazioni dell'utente: conservarla negli aggiornamenti.

<!-- UNISTACK:INVENTARIO:BEGIN -->
## Inventario rilevato

Progetto: `CASH`
ID: `unistack-94de8cd4094d`
Origine locale: `F:\DEV\CASH`

Inventario dei percorsi, non prova di funzionalita o test eseguiti. I contenuti dei file non vengono copiati dallo script.
Esclusi dipendenze, build, configurazioni Obsidian, backup, link filesystem e nomi di file potenzialmente sensibili.

ATTENZIONE: scansione limitata a 10 file; inventario parziale.
### Distribuzione per tipo

- `.md`: 9
- `.json`: 1

### File e documenti da consultare

- `AGENTS.md`
- `docs/catalogo.json`
- `docs/CHIUSURA_2026-10-08.md`
- `docs/DECISIONI.md`
- `docs/OBSIDIAN_SYNC_2026-10-08.md`
- `docs/PIANO_CANALI_GRATUITI_2026-10-08.md`
- `docs/PROCESSO_PRODOTTI.md`
- `docs/PROGETTO.md`
- `docs/README.md`
- `docs/RICERCA_PREZZI_2026-10-02.md`
<!-- UNISTACK:INVENTARIO:END -->
