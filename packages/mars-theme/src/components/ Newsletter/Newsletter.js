import React, {useEffect, useState} from 'react'
import {connect} from "frontity";
import Cookies from 'universal-cookie';
import {
    Button,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
    Dialog,
    TextField,
    useTheme,
    useMediaQuery,
    makeStyles,
    Box, IconButton
} from "@material-ui/core";
import {pagesMap} from "../../config";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
    paper: {
        minWidth: '300px',
        padding: '32px',

    },
    close: {
        position: 'absolute',
        right: '10px',
        top: '10px'
    }
}))

const Newsletter = ({state, actions}) => {
    const cookies = new Cookies();
    const theme = useTheme()
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
    const classes = useStyles()
    const errorsInit = {
        nome: false,
        cognome: false,
        email: false,
        city: false,
    }
    const [checked, setChecked] = useState(false)
    const [nome, setNome] = useState('')
    const [cognome, setCognome] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState(errorsInit)
    const [open, setOpen] = useState(!cookies.get('newsletter'))

    const handleSend = () => {
        const formdata = new FormData();
        formdata.append("nome", nome);
        formdata.append("cognome", cognome);
        formdata.append("email", email);
        formdata.append("city", city);
        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        const getError = (rsp, field) => rsp['invalid_fields'].filter(f => f['error_id'] === field).length ? rsp['invalid_fields'].filter(f => f['error_id'] === field)[0].message : false
        fetch(`${state.source.url}/wp-json/contact-form-7/v1/contact-forms/68/feedback`, requestOptions)
            .then(response => response.text())
            .then(resp => {
                const data = JSON.parse(resp)
                if (data.status === 'validation_failed') {
                    setError(data.message)
                    setErrors({
                        nome: getError(data, "-ve-nome"),
                        cognome: getError(data, "-ve-cognome"),
                        email: getError(data, "-ve-email"),
                        city: getError(data, "-ve-city"),
                    })
                }
                else {
                    setSuccess(data.message)
                    cookies.set('newsletter', true, {path: '/'})
                }
            });
    }

    const resetErrors = () => {
        setErrors(errorsInit)
        setError(null)
    }

    return (
        <Dialog
            maxWidth={false}
            open={open}
            fullWidth={isSmDown}
            classes={{paper: classes.paper}}
            onClose={() => setOpen(false)}
        >
            <IconButton
                classes={{root: classes.close}}
                aria-label="close"
                color="inherit"
                onClick={() => {
                    setOpen(false);
                }}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
            <Typography align="center" variant="h3">Iscriviti alla Newsletter</Typography>
            {success ? (
                <>
                    <br />
                    <Typography align="center" variant="h5">{success}</Typography>
                    <br />
                    <Button onClick={() => {
                        setOpen(false)
                        cookies.set('newsletter', true, {path: '/'})
                    }} variant="contained" color="primary">Chiudi</Button>
                </>
            ) : (
                <>
                    <FormControl fullWidth margin="normal">
                        <Typography align="center" variant="body2" color="error">{error}</Typography>
                    </FormControl>
                    <FormControl fullWidtw margin="normal">
                        <TextField onFocus={resetErrors} error={errors.email} helperText={errors.email} type="email*" value={email} onChange={(event) => setEmail(event.target.value)} label="Email" variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField onFocus={resetErrors} error={errors.nome} helperText={errors.nome} label="Nome*" value={nome} onChange={(event) => setNome(event.target.value)} variant="outlined" />
                    </FormControl>
                    <FormControl error={errors.cognome} fullWidth margin="normal">
                        <TextField onFocus={resetErrors} error={errors.cognome} helperText={errors.cognome} label="Cognome*" value={cognome} onChange={(event) => setCognome(event.target.value)} variant="outlined" />
                    </FormControl>
                    <FormControl error={errors.city} fullWidth margin="normal">
                        <TextField onFocus={resetErrors} error={errors.city} helperText={errors.city} label="Città*" value={city} onChange={(event) => setCity(event.target.value)} variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth margin="normal">{/*
                        <Typography>Leggi l'<Button style={{padding: 0}} variant="text" onClick={() => {
                            setOpen(false)
                            actions.router.set(pagesMap[11][state.theme.lang][1])
                        }}>informativa sulla privacy</Button></Typography>*/}
                        <FormControlLabel
                            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} color="primary" name="privacy" />}
                            label={
                                <>Acconsento a ricevere le newsletter come indicato nell’<Button style={{paddingTop: '1px'}} component="a" href="https://www.privacylab.it/informativa.php?12279434697" target="_blank">informativa privacy</Button></>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Button disabled={!checked} onClick={handleSend} variant="contained" color="primary">Iscriviti</Button>
                    </FormControl>
                </>
            )}
        </Dialog>
    )
}

export default connect(Newsletter)