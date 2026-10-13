from pathlib import Path
import json
import re
import hashlib
import zipfile

ROOT=Path(__file__).resolve().parents[1]
KIT=ROOT/'outputs/01a0fc6b-eba3-7760-b973-8aa04c2c295e'
def edit(path,fn):
    p=ROOT/path; p.write_text(fn(p.read_text(encoding='utf-8')),encoding='utf-8')
def write(path,text):
    p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text,encoding='utf-8')

plan='''# CASH — Canali senza costo di pubblicazione

Decisione approvata l'8 ottobre 2026: Payhip Free Forever principale, Gumroad secondario, template a prezzo base9,90 EUR. Etsy sospeso, bozza conservata a29 €, nessun costo sostenuto. Riutilizzare CASH-001; nessun nuovo prodotto o pubblicazione richiesti in questa fase.

## Stato di attuazione
- Gumroad qbcclq: prezzo9,90 EUR salvato e verificato in una nuova scheda editor. Prodotto non in vendita; alert del metodo di accredito mancante.
- Payhip: materiali pronti, accesso del titolare richiesto nella scheda ufficiale. Il negozio non è ancora configurato, nessun prodotto Payhip salvato né URL di vendita inventato.
- Registro operativo: prezzo9,90 €, scenario tre servizi e18template; margine illustrativo505,95 €, soglia solo template72. Formule verificate con Artifact Tool.
- Sei test Python del kit superati l'8 ottobre. ZIP controllato senza rigenerazione. Desktop Excel non disponibile nel controllo delle app; prova e compatibilità desktop non dichiarate superate.
- Nessuna pubblicazione, acquisto, pubblicità o messaggio commerciale effettuati.

## Piattaforme verificate e fonti
| Piattaforma | Costi | Uso |
|---|---|---|
| [Payhip](https://payhip.com/pricing) | Free Forever0 USD/mese,5% sulle vendite, oltre al gestore | Principale; prodotti illimitati e consegna file. IVA UE/UK gestita secondo documentazione |
| [Gumroad](https://gumroad.com/help/article/66-gumroads-fees) | Dirette10% +0,50 USD, carte2,9% +0,30 USD aggiuntivi; Discover30% complessivo | Secondario già predisposto; merchant of record secondo [pricing](https://gumroad.com/pricing) |
| [Ko-fi Shop](https://help.ko-fi.com/hc/en-us/articles/360009712917-Ko-fi-Shop-Sell-digital-physical-products) | Shop5% oltre processing | Alternativa successiva; [gestione imposte a carico del creatore](https://help.ko-fi.com/hc/en-us/articles/10792069957661-How-tax-works-on-Ko-fi) |
| [Lemon Squeezy](https://www.lemonsqueezy.com/pricing) | Base5% +0,50 USD; [maggiorazioni](https://docs.lemonsqueezy.com/help/getting-started/fees) e possibili costi accredito | Alternativa merchant of record; nessun account configurato |
| [itch.io](https://itch.io/docs/creators/faq.amp) | Nessun costo pagina/upload; revenue share configurabile, processing e possibili altri oneri | Futuri software/asset; [dettagli pagamenti](https://itch.io/docs/creators/payments) |

Le condizioni sono state consultate durante la pianificazione e, per Payhip/Gumroad, ricontrollate l'8 ottobre. Non significa assenza di costi sulle vendite. Non sono configurati gli altri canali.

Payhip Marketplace: almeno10 USD di vendite reali, revisione negozio e approvazione prodotti. Gli autoacquisti non contano e non vanno usati per simulare domanda. [Requisiti](https://help.payhip.com/article/307-marketplace).

## Accrediti, imposte e prezzo al cliente
Payhip versa le vendite al gestore collegato: disponibilità bancaria dipendente dal gestore. Gumroad: almeno sette giorni di maturazione nei calendari periodici; **nel conto italiano osservato l'8 ottobre soglia minima100 USD**, calendario settimanale e accrediti in EUR. Nessun metodo collegato. [Documentazione Gumroad](https://gumroad.com/help/article/13-getting-paid).

9,90 € è il prezzo base scelto, non un totale checkout garantito: imposte aggiunte, conversioni e impostazioni locali possono cambiarlo. Il conto Gumroad ha opzioni di visualizzazione valuta locale attive; non sono state modificate. Registrare base, imposte e totale realmente mostrati quando il checkout è testabile. Non stimare conversioni USD/EUR come equivalenti.

Le piattaforme non eliminano imposte personali/contributi. Confermare inquadramento e dati venditore con il servizio fiscale già acquistato prima del lancio.

## Scenario e acquisizione
Riserva illustrativa25% template,10% servizi, costi ulteriori30 €/mese; non un tariffario effettivo:
- Solo template:72 ×9,90 ×75% −30 =504,60 €.
- Misto:3 ×149 ×90% +18 ×9,90 ×75% −30 =505,95 € (il piano arrotondava a506 €).

Fonte delle assunzioni: piano approvato dal titolare. Sostituire con fee effettive, imposte sulle vendite, rimborsi e conversioni. A prezzo basso le quote fisse pesano di più.

Payhip nei nuovi link dopo disponibilità reale, Gumroad alternativa. Preparare20interazioni pertinenti e due dimostrazioni in community che consentano offerte; nessun invio effettuato. Vietato assegnare un URL fittizio al negozio. Nessuna pubblicità prima di due vendite a persone sconosciute. Controlli interesse/margine/accrediti a14/30/60 giorni dall'avvio effettivo, non da questa preparazione.

## Passaggi rimasti
1. Accesso/creazione Payhip a cura del titolare, poi piano gratuito, EUR, file e immagini con visibilità nascosta prima del salvataggio.
2. Completare personalmente dati e metodi di pagamento; non trasmettere IBAN/password in chat.
3. Prova Excel desktop e verifica dati venditore/fiscali.
4. Test checkout/download consentiti dalle piattaforme, senza autoacquisto a pagamento. Se impossibile, indicare il motivo.
5. Pubblicazione separata dopo preparazione; Etsy resta sospeso.
'''
write('docs/PIANO_CANALI_GRATUITI_2026-10-08.md',plan)
cat=json.loads((ROOT/'docs/catalogo.json').read_text(encoding='utf-8'))
p=cat['products'][0]
p['approved_price_eur']=9.9;p['saved_price_eur']=9.9;p.pop('proposed_price_eur',None)
p['channels']={'payhip':{'role':'primary','status':'awaiting_owner_login','saved_price_eur':None,'listing_id':None},'gumroad':{'role':'secondary','status':'draft_saved_payout_blocked','saved_price_eur':9.9,'listing_id':'qbcclq','last_verified':'2026-10-08','observed_minimum_payout_usd':100},'etsy':{'role':'paused','status':'draft_preserved','saved_price_eur':29,'listing_id':'4587304534','last_verified':'2026-10-02'}}
p['blockers']=['Accesso Payhip del titolare e caricamento da completare','Excel desktop non verificato','Verifiche venditore e fiscali','Metodo accredito Gumroad mancante','Checkout/download end-to-end non verificato'];cat['updated_at']='2026-10-08'
write('docs/catalogo.json',json.dumps(cat,ensure_ascii=False,indent=2)+'\n')
edit('AGENTS.md',lambda s:s.replace('Prezzo del primo prodotto:29 € salvato nelle bozze,9,90 € proposto e non approvato/applicato. Vedere docs/RICERCA_PREZZI_2026-10-02.md.', 'Decisione corrente: Payhip gratuito principale, Gumroad secondario; prezzo base9,90 € approvato e salvato su Gumroad. Payhip in attesa di accesso del titolare; aggiornare dal catalogo quando configurato. Etsy sospeso, bozza conservata a29 €, senza pubblicarla o sostenere costi. Vedere docs/PIANO_CANALI_GRATUITI_2026-10-08.md; la ricerca del2ottobre è storico.'))
edit('docs/README.md',lambda s:s.replace('Aggiornato: 2 ottobre 2026','Aggiornato: 8 ottobre 2026').replace('- [Stato e obiettivi](PROGETTO.md)','- [Piano corrente: Payhip + Gumroad a9,90 €, Etsy sospeso](PIANO_CANALI_GRATUITI_2026-10-08.md)\n- [Stato e obiettivi](PROGETTO.md)'))
edit('docs/PROGETTO.md',lambda s:re.sub(r'## Stato esterno verificato.*?## Verifiche e limiti', '''## Stato dei canali — 8 ottobre 2026
- Payhip Free Forever principale: materiali predisposti; accesso del titolare necessario, prodotto non ancora caricato.
- Gumroad secondario: prezzo9,90 EUR effettivamente salvato nell'editor qbcclq, verificato oggi. Prodotto non in vendita; metodo accredito mancante, soglia osservata100 USD per l'Italia.
- Etsy sospeso per decisione del titolare: bozza4587304534 conservata a29 €, non modificata in questa sessione.
- Prezzo9,90 € approvato dal titolare; non è più soltanto una proposta. Servizio149 € mantenuto.
- Nessuna nuova pubblicazione, spesa o messaggio commerciale effettuati; nessuna vendita verificata.
- Scenario operativo aggiornato:3servizi e18template =505,95 € di margine illustrativo, oppure72template =504,60 €. Dettagli e fonti nel piano corrente.

## Verifiche e limiti''',s,flags=re.S))
edit('docs/DECISIONI.md',lambda s:s+'\n## 8 ottobre 2026 — Piano gratuito approvato e applicato\nPayhip principale, Gumroad secondario,9,90 € approvato; Etsy sospeso con bozza conservata. Prezzo Gumroad salvato e verificato; accesso Payhip richiesto al titolare. Sei test del kit nuovamente superati; scenario aggiornato e verificato nel motore. Margine esatto505,95 € rispetto ai506 € arrotondati nel piano. Nessuna pubblicazione o spesa. Stato corrente: PIANO_CANALI_GRATUITI_2026-10-08.md.\n')
edit('docs/RICERCA_PREZZI_2026-10-02.md',lambda s:s+'\n## Aggiornamento — 8 ottobre 2026\nIl titolare ha approvato9,90 € e il piano Payhip +Gumroad; Etsy sospeso. Prezzo Gumroad applicato e verificato. Le conclusioni precedenti restano storico del2ottobre. Vedere il piano corrente.\n')
oper=KIT/'operativo'
for name in ('Inserzioni.md','Acquisizione.md'):
    fp=oper/name;s=fp.read_text(encoding='utf-8').replace('29 €','9,90 €')
    if name=='Inserzioni.md':
        s=s.replace('## Etsy','## Etsy — sospeso; testi conservati, bozza remota resta29 €')
        s=s.replace('## Payhip / Ko-fi\n\nRiutilizzare lo stesso ZIP, descrizione e anteprime solo quando si attiva il terzo canale.', '## Payhip — principale / Ko-fi — alternativa futura\n\nPayhip Free Forever: prezzo base9,90 EUR; stesso ZIP, descrizione e anteprime. Configurare visibilità nascosta prima del salvataggio. Ko-fi non viene configurato ora.')
    else:s+='\n## Canale attuale\nUsare il link Payhip reale quando il prodotto sarà disponibile; Gumroad alternativa. Etsy sospeso. Nessun URL Payhip è ancora stato assegnato; non usare placeholder nei messaggi inviati.\n'
    fp.write_text(s,encoding='utf-8')
write(str((oper/'Stato_lancio.md').relative_to(ROOT)),plan)
write(str((oper/'Checklist_pubblicazione.md').relative_to(ROOT)),'''# Checklist — Payhip e Gumroad, 8 ottobre 2026

- [x] Prezzo9,90 € e canali approvati dal titolare.
- [x] Gumroad salvato a9,90 EUR, blocco accrediti rilevato.
- [x] Scenario operativo aggiornato:505,95 € e72template.
- [x] Sei test del kit superati e ZIP verificato.
- [ ] Prova in Excel desktop; disponibilità app non rilevata nella sessione.
- [ ] Accesso Payhip del titolare, conferma Free Forever e valutaEUR.
- [ ] Caricare ZIP e immagini in prodotto Payhip nascosto; verificare salvataggio e URL reale.
- [ ] Collegare personalmente pagamenti e dati del venditore.
- [ ] Verificare inquadramento fiscale e condizioni.
- [ ] Controllare checkout: prezzo base, imposte, totale e download con modalità consentita.
- [ ] Pubblicare soltanto nella fase separata di lancio.
- [ ] Iniziare20interazioni e due dimostrazioni consentite, nessuna pubblicità prima di due vendite a sconosciuti.

Etsy sospeso: bozza conservata; nessuna modifica o pubblicazione prevista. Vedere Stato_lancio.md.
''')
edit(str((KIT/'README.md').relative_to(ROOT)),lambda s:s+'\nAggiornamento8ottobre: prezzo9,90 €, Payhip principale e Gumroad secondario, Etsy sospeso. Vedere operativo/Stato_lancio.md per lo stato effettivo e i blocchi.\n')
edit(str((KIT/'INIZIA_QUI.html').relative_to(ROOT)),lambda s:s.replace('prezzo base di 29 €','prezzo base di 9,90 €').replace('Bozze salvate su Etsy Byte4You e Gumroad, a 29 €. Non ancora pubblicate: restano prova Excel desktop, verifiche venditore e metodo di accredito Gumroad.', 'Payhip principale in preparazione, Gumroad salvato a9,90 €, Etsy sospeso con bozza conservata. Restano accesso Payhip, prova Excel desktop, verifiche venditore e metodo accredito Gumroad.').replace('ZIP da caricare su Etsy e Gumroad','ZIP per Payhip e Gumroad').replace('tre servizi e otto template = 679 € lordi','tre servizi e diciotto template = 625,20 € lordi').replace('circa 546 € prima di imposte e contributi','505,95 € prima di imposte e contributi'))
note='''\n## Aggiornamento operativo — 8 ottobre 2026, piano gratuito
Ho approvato Payhip Free Forever come principale, Gumroad come secondario e9,90 € come prezzo base. Etsy resta sospeso con bozza a29 €. Gumroad è stato aggiornato e ricaricato:9,90 EUR salvato; non in vendita per accrediti mancanti. Nel conto italiano compare soglia100 USD. Payhip non è ancora configurato: accesso del titolare richiesto, nessun URL prodotto inventato.

Sei test Python nuovamente superati. Registro operativo aggiornato e verificato nel motore Artifact Tool:3servizi e18template danno505,95 € illustrativi;72template danno504,60 €. Excel desktop non disponibile; checkout/download end-to-end non verificato per blocchi degli account. Nessuna pubblicazione, spesa o messaggio effettuati. Prossimo passo: completare accesso Payhip e pagamenti, poi prova desktop e checkout. Dettagli nel progetto: docs/PIANO_CANALI_GRATUITI_2026-10-08.md.
'''
for name in ('CASH.md','CASH - Prodotti digitali e piccoli servizi.md'):
    edit('docs/obsidian/'+name,lambda s:s.replace('updated: 2026-10-02','updated: 2026-10-08').replace('## Note personali',note+'\n## Note personali',1) if '## Note personali' in s else s+note)

description='''Organizza vendite, spese e accrediti in un unico file Excel. Il riepilogo mensile distingue il margine dal denaro effettivamente ricevuto.

Il download comprende il template vuoto, un esempio con dati fittizi, una guida in italiano, un CSV di esempio e la licenza per uso nella propria attività.

2.000 righe per ciascun registro e riepilogo di12mesi con anno modificabile. File .xlsx senza macro, importi inEUR. Importazione CSV con mappatura manuale di colonne, date e numeri. Nessun collegamento automatico ai marketplace.

Progettato per Microsoft Excel. Formule verificate nel motore di generazione; prova nell'app Excel desktop ancora da completare. Compatibilità con Google Sheets e LibreOffice non verificata.

Prodotto digitale, nessun articolo fisico. Strumento organizzativo prima di imposte e contributi; non sostituisce contabilità o consulenza fiscale. Uso e modifica per la propria attività consentiti; rivendita e redistribuzione vietate.'''
write(str((oper/'Payhip_pronto.md').relative_to(ROOT)), '# Scheda Payhip pronta\n\nPiano: Free Forever. Valuta:EUR. Prezzo base:9,90 €. Visibilità iniziale:nascosto.\nNome: Vendite e spese — Template Excel in italiano\n\nFile: Vendite_e_spese_v1.zip; immagini01–04. Non caricare la cartella operativo o verifica.\n\n## Descrizione\n'+description+'\n\n## Stato\nAccesso titolare richiesto. Nessun prodotto remoto salvato finché non è possibile verificare il negozio. Nessuna promessa di prezzo totale al checkout prima della prova.\n')

files=['Template_vendite.xlsx','Esempio_vendite.xlsx','Guida.html','Licenza.txt','Esempio_importazione.csv']
with zipfile.ZipFile(KIT/'Vendite_e_spese_v1.zip') as z:
    assert set(z.namelist())==set(files);assert z.testzip() is None
    for f in files:assert z.read(f)==(KIT/'prodotto'/f).read_bytes()
manifest=json.loads((KIT/'verifica/manifest-prodotto.json').read_text())
for f in files: assert hashlib.sha256((KIT/'prodotto'/f).read_bytes()).hexdigest()==manifest[f]
write('docs/verifiche/2026-10-08/kit.json',json.dumps({'date':'2026-10-08','zip':'verified','buyer_files':5,'hashes':'match_saved_manifest','desktop_excel':'not_available','end_to_end_checkout':'blocked'},indent=2))
print('Piano applicato alla memoria; ZIP e hash verificati senza rigenerare il prodotto.')
