import React from 'react'
import {connect} from "frontity";
import {CookieBanner} from '@keepist/react-gdpr-cookie-banner';

const CookieConsent = ({libraries, state}) => {
    const Html2React = libraries.html2react.Component;
    const onAcceptStatistics = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments)
        }
        gtag('js', new Date());
        gtag('config', state.theme.options.analytics);
    }

    const italianLabels = state.theme.lang === 'it' ? {
        necessaryOptionText: "Necessari",
        preferencesOptionText: "Preferenze",
        statisticsOptionText: "Statistiche",
        acceptAllButtonText: "Accetta Tutti",
        acceptSelectionButtonText: "Accetta Selezione",
    } : {}

    return (
        <CookieBanner
            message={<div>
                <Html2React html={state.theme.options.gdprText} />
            </div>}
            policyLink={state.theme.options.privacyPolicyLink}
            privacyPolicyText="Privacy Policy & Cookie Policy"
            {...italianLabels}
            showAcceptSelectionButton
            showMarketingOption={false}
            showPreferencesOption={false}
            onAcceptPreferences={() => {
                // load your preferences trackers here
            }}
            onAcceptStatistics={onAcceptStatistics}
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
                    background: 'white',
                    padding: '10px 40px 40px',
                    marginTop: '10%',
                    maxHeight: '80%',
                    overflowY: 'scroll'
                },
                optionLabel: {
                    color: 'black',
                    paddingLeft: '25px',
                    lineHeight: '30px',
                },
                policy: {
                    display: 'block',
                    marginBottom: '10px'
                }
            }}
        />
    )
}

export default connect(CookieConsent)