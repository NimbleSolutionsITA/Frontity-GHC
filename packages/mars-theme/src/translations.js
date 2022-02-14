const translations = (lang, key) => {
    const dictionary = {
        eccellenze: ['Eccellenze', "Excellence"],
        novita: ['News', "News"],
        refertiOnline: ['Referti Online', "Medical Records"],
        aperto24: ['Aperto 24/24', "Open 24/24"],
        scopriDiPiu: ['Scopri di più', 'Read more'],
        inPrimoPiano: ['Primo piano', 'Featured'],
        comeArrivare: ['come arrivare', 'ho to get there'],
        prenotaOra: ['Prenota ora', 'Book now'],
        prenotareUnaVisita: ['Prenota una visita', 'Book a visit'],
        tutteLeNotizie: ['Tutte le News', 'All the News'],
        cercaUnaPrestazione: ['Cerca una prestazione', 'Find a service'],
        oppureClicca: ["Oppure clicca sull'iniziale", 'Or click on the intial letter'],
        vaiAiMedici: ['Vai i medici', "Go to Doctor's page"],
        daSapere: ['Da sapere', 'To know'],
        infoPraticheRicovero: ['Info pratiche sul ricovero', 'Practical info on hospitalization'],
        soloResponsabili: ['Responsabili', 'Head doctors'],
        cercaUnDottore: ['Cerca un dottore', 'Find a doctor'],
        visualizzaCV: ['Visualizza il CV', 'View CV'],
        prendiAppuntamento: ['Prendi appuntameno con il dottore', 'Arrange a visit with the doctor'],
        pubblicatoIl: ['Pubblicato il', 'Published on'],
        descrizione: [
            'Casa di cura riabilitativa accreditata e poliambulatorio specialistico',
            'Multi-specialized hospital accredited by the National Health Service for hospitalization and outpatient activity.'
        ],
        centralino: ['Centralino', 'Contact Center'],
        prenotazioneVisite: ['Prenotazione visite', 'Book a visit'],
        fax: ['Fax Centralino', 'Fax Contact Center'],
        allDocs: ['Tutti i medici', 'All doctors'],
        richiesta: ['Richiesta cartelle cliniche', 'Request for medical records'],
        orari: ['dal <b>lunedì</b> al <b>venerdì</b> dalle <b>8</b> alle <b>18</b>', 'from <b>monday</b> to <b>friday 08:00</b> - <b>18:00</b>'],
        prestazioniSubtitle: ['PRESTAZIONI (U.O.)', 'PRESTAZIONI (U.O.)'],
        tutti: ['tutti', 'all'],
        mese: ['Mese', 'Month'],
        anno: ['Anno', 'Year'],
        noDocs: ['Nessun documento trovato', 'No documents found'],
        search: ['Ricerca un documento', 'Search for a document'],
        quotazione: ['Quotazione odierna di GHC', "Today's GHC listing"],
        da: ['da', 'from'],
        prossimoEvento: ['Prossimo evento', 'Next event'],
        eventiSuccessivi: ['Eventi successivi', 'Following events'],
        nessunEvento: ['Nessun evento successivo in programma', 'No subsequent events scheduled'],
        accept: ['Accetto', 'Accept'],
        decline: ['Non accetto', 'Decline'],
        next: ['Successivo', 'Next'],
        prev: ['Precedente', 'Prev'],
    }
    switch (lang) {
        case 'en':
            return dictionary[key][1]
        default:
            return dictionary[key][0]
    }
}

export default translations