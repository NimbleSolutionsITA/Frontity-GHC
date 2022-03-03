import React from 'react'
import {connect} from "frontity";
import {Button} from "@material-ui/core";
import translations from "../translations";

const PrenotaOra = ({actions, state, size, variant = 'contained', color = 'primary', ...props}) => {
    return (
        <Button {...props} onClick={() => actions.router.set(state.theme.urlPrefix+'/prenota')} size={size} variant={variant} color={color}>{translations(state.theme.lang, 'prenotaOra')}</Button>
    )
}

export default connect(PrenotaOra)