import React, {useEffect, useState} from 'react'
import {connect} from "frontity";
import Cookies from "universal-cookie";
import {CookieBanner} from '@keepist/react-gdpr-cookie-banner';
import {
    Dialog,
    Slide,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import {pagesMap} from "../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CookieConsent = ({actions, state, consent}) => {
    const cookies = new Cookies();
    const [open, setOpen] = useState(!cookies.get('consent'))

    const handleConfirm = () => {
        cookies.set('consent', true, {path: '/'})
        setOpen(false)
    }

    const handleDeny = () => {
        cookies.set('consent', false, {path: '/'})
        setOpen(false)
    }

    return (
        <CookieBanner
            message={<div>
                <h3><b>Questo sito web utilizza cookies</b></h3>
                <p>La sua esperienza su questo sito verrà migliorata grazie all utilizzo di cookies. Utilizziamo inoltre i cookies per analizzare il nostro traffico.</p>
                <p>Consulta la
                    <Button
                        style={{paddingBottom: '4px', paddingLeft: '8px'}}
                        variant="text"
                        onClick={() => actions.router.set(pagesMap[11][state.theme.lang][1])}
                    >
                        Privacy Policy e la Cookie Policy
                    </Button>
                </p>
            </div>}
            policyLink={pagesMap[11][state.theme.lang][1]}
            privacyPolicyText="Privacy Policy e Cookie Policy"
            necessaryOptionText={state.theme.lang === 'it' && "Necessari"}
            preferencesOptionText={state.theme.lang === 'it' && "Preferenze"}
            statisticsOptionText={state.theme.lang === 'it' && "Statistiche"}
            acceptAllButtonText={state.theme.lang === 'it' && "Accetta Tutti"}
            acceptSelectionButtonText={state.theme.lang === 'it' && "Accetta Selezione"}
            showAcceptSelectionButton
            showMarketingOption={false}
            showPreferencesOption={false}
            onAcceptPreferences={() => {
                // load your preferences trackers here
            }}
            onAcceptStatistics={() => {
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                    dataLayer.push(arguments)
                }

                gtag('js', new Date());
                gtag('config', 'UA-64338762-21');
            }}
            onAcceptMarketing={() => {
                // load your marketing trackers here
            }}
            styles={{
                dialog: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    zIndex: '100000',
                    backgroundColor: '#00000075',
                    padding: '10px',
                    height: '100vh',
                },
                container: {
                    maxWidth: '960px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    overflow: 'hidden',
                    background: 'white',
                    padding: '10px 40px 40px',
                    marginTop: '100px',
                },
                optionLabel: {
                    color: 'black',
                    paddingLeft: '25px',
                    lineHeight: '30px',
                },
            }}
        />
        /*<Dialog
            open={open}
            onClose={handleConfirm}
            keepMounted
            TransitionComponent={Transition}
            styles={{
                dialog: {
                        position: 'fixed',
                        top: '0px',
                        left: '0px',
                        right: '0px',
                        zIndex: '100000',
                        background-color: '#00000075',
                        padding: '10px',
                        height: '100vh',
                },	//Style that override .react-cookie-law-dialog class
                container: {
                    maxWidth: '960px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    overflow: 'hidden',
                    background: 'white',
                    padding: '40px',
                    marginTop: '100px',
                },	//.react-cookie-law-container class
                message: {},	//Style for banner text (.react-cookie-law-message class)
                policy: {},	//Style for cookie policy link (.react-cookie-law-policy class)
                selectPane: {},	//Style for select pane (.react-cookie-law-select-pane class)
                optionWrapper: {},	//Style for option checkbox wrapper (.react-cookie-law-option-wrapper class)
                optionLabel: {

                },	//Style for the text of checkbox labels
                checkbox: {},	//Style for checkboxes (.react-cookie-law-option-checkbox class)
                buttonWrapper: {},	//Style for buttons wrapper (.react-cookie-law-dialog class)
                button: {}	//
            }}
        >
            <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    La sua esperienza su questo sito verrà migliorata grazie all utilizzo di cookies. Consulta la
                    <Button
                        style={{padding: 0}}
                        variant="text"
                        onClick={() => {
                            setOpen(false)
                            actions.router.set(pagesMap[11][state.theme.lang][1])
                        }}
                    >
                        Privacy Policy e la Cookie Policy
                    </Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeny} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Agree
                </Button>
            </DialogActions>ì
        </Dialog>*/
    )
}

export default connect(CookieConsent)