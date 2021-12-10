import React from 'react'
import {connect} from "frontity";
import {Button} from "@material-ui/core";
import translations from "../translations";

const PrenotaOra = ({actions, state, size, variant = 'contained', color = 'primary', ...props}) => {
    return (
        <Button {...props} onClick={() => window.open('https://wp.hesperia.it/wp-content/uploads/2021/03/modalita%CC%80-prenotazione.pdf','_blank')/*actions.theme.toggleTuoTempo('')*/} size={size} variant={variant} color={color}>{translations(state.theme.lang, 'prenotaOra')}</Button>
    )
}

export default connect(PrenotaOra)