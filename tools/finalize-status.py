from pathlib import Path
root = Path(r'F:\DEV\CASH\outputs\01a0fc6b-eba3-7760-b973-8aa04c2c295e')
status = '''# Stato del lancio — 2 ottobre 2026

## Completato
- Kit vendibile: template Excel, esempio, guida italiana, CSV e licenza. ZIP verificato, cinque file destinati all'acquirente.
- Quattro immagini per Etsy, copertina e thumbnail per Gumroad.
- Registro operativo, offerta del servizio da 149 €, modulo locale, normalizzatore CSV e materiali di acquisizione.
- Etsy Byte4You: bozza digitale **4587304534**, prezzo base 29 €, ZIP e quattro immagini, 13 tag, rinnovo manuale e dichiarazione di assistenza AI. Salvataggio verificato nell'elenco “Bozze 1”.
  Editor: https://www.etsy.com/your/shops/me/listing-editor/edit/4587304534
- Gumroad: prodotto **qbcclq**, prezzo base 29 EUR, descrizione, copertina, thumbnail e ZIP salvati.
  Editor: https://gumroad.com/products/qbcclq/edit/content
- Nessuna inserzione pubblicata, nessun messaggio inviato, nessuna spesa effettuata da questa attività.

## Passaggi ancora necessari
1. Aprire template ed esempio in Microsoft Excel desktop: modificare un movimento e verificare riepilogo, date e filtri. Le formule sono verificate nel motore di generazione; l'app desktop non è stata provata. Aggiornare la descrizione con l'esito reale.
2. Completare personalmente il metodo di accredito Gumroad: la piattaforma blocca esplicitamente la pubblicazione in sua assenza. https://gumroad.com/settings/payments
3. Verificare con il servizio fiscale già acquistato inquadramento, dati venditore e condizioni dei negozi; nessuna verifica fiscale personale è stata eseguita.
4. Controllare anteprima e download con la modalità di test disponibile, quindi pubblicare le bozze e verificare i link pubblici.
5. Iniziare le 20 interazioni pertinenti previste. I materiali di acquisizione sono pronti, ma non sono state inviate offerte né inventati potenziali clienti.

## Verifica
Controlli numerici: riepiloghi, rimborsi, accrediti parziali, cambio anno e limite delle 2.000 righe. Sei test Python superati per normalizzazione CSV e integrità dei file. ZIP verificato contro i file originali. Screenshot reali: ../verifica/etsy-bozza.jpg e ../verifica/gumroad-bozza.jpg.

Entrate effettive prodotte da questo lancio: 0 €. L'obiettivo di 500 € dipende da acquisti reali; le bozze e lo scenario economico non sono entrate.
'''
(root/'operativo/Stato_lancio.md').write_text(status, encoding='utf-8')
p = root/'INIZIA_QUI.html'
s = p.read_text(encoding='utf-8').replace('Account e pubblicazione richiedono accesso e verifiche personali; i file non sono ancora pubblicati.', 'Bozze salvate su Etsy Byte4You e Gumroad, a 29 €. Non ancora pubblicate: restano prova Excel desktop, verifiche venditore e metodo di accredito Gumroad. <a href="operativo/Stato_lancio.md">Stato e link alle bozze</a>.').replace('Accedi ai negozi e carica ZIP, immagini e testi.', 'Apri le bozze salvate e completa le verifiche indicate nello stato del lancio.')
p.write_text(s,encoding='utf-8')
p = root/'operativo/Checklist_pubblicazione.md'
s=p.read_text(encoding='utf-8').replace('- [ ] Accedere a Etsy e Gumroad senza condividere password in chat.', '- [x] Accesso a Etsy e Gumroad completato personalmente dal venditore.').replace('- [ ] Caricare solo Vendite_e_spese_v1.zip e immagini 01–04.', '- [x] Caricati ZIP e immagini 01–04 nella bozza Etsy 4587304534.').replace('- [ ] Caricare ZIP e anteprime; prezzo base 29 € se disponibile.', '- [x] Salvati ZIP, copertina, thumbnail e prezzo 29 EUR nel prodotto Gumroad qbcclq.').replace('Stato iniziale: materiali locali preparati; account non autenticati al controllo iniziale; nessuna inserzione pubblicata, nessuna spesa effettuata e nessun messaggio inviato.', 'Stato aggiornato: due bozze salvate e verificate. Nessuna inserzione pubblicata, nessuna spesa effettuata e nessun messaggio inviato. Gumroad blocca la pubblicazione fino al collegamento di un metodo di accredito. Vedere Stato_lancio.md.')
p.write_text(s,encoding='utf-8')
p=root/'operativo/Inserzioni.md'
s=p.read_text(encoding='utf-8').replace('bilancio mensile','report mensile')
s+='\n## Configurazione effettiva delle bozze\nEtsy: categoria Modelli per contabilità, tipo Digitale, download immediato, rinnovo manuale. Dichiarazione: creato con assistenza AI. Testo aggiunto alla descrizione: “Template e materiali realizzati con assistenza AI; formule e dati di esempio verificati.” Gumroad: cover 01 e thumbnail 05; ZIP nella scheda Content. Vedere Stato_lancio.md per editor e passaggi rimasti.\n'
p.write_text(s,encoding='utf-8')
p=root/'README.md'
p.write_text(p.read_text(encoding='utf-8')+'\nBozze reali salvate su Etsy e Gumroad. Stato e link: operativo/Stato_lancio.md. Nessuna pubblicazione; metodo di accredito Gumroad da collegare personalmente.\n',encoding='utf-8')
print('Stato del lancio aggiornato in cinque documenti.')
