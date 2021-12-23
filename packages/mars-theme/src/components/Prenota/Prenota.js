import React, {useState} from 'react'
import {connect} from "frontity"
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    TextField, Typography,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const Prenota = ({ state, actions, libraries }) => {
    const data = state.source.get(state.router.link);
    const post = state.source.page[data.id]
    const Html2React = libraries.html2react.Component;
    const errorsInit = {
        nome: false,
        cognome: false,
        email: false,
        message: false,
    }
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState(errorsInit)
    const [values, setValues] = useState({
        nome: '',
        cognome: '',
        email: '',
        message: '',
        privacy: false
    })

    const handleSend = () => {
        const formdata = new FormData();
        formdata.append("nome", values.nome);
        formdata.append("cognome", values.cognome);
        formdata.append("email", values.email);
        formdata.append("message", values.message);
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
                        message: getError(data, "-ve-message"),
                    })
                }
                else {
                    setSuccess(data.message)
                }
            });
    }

    const resetErrors = React.useCallback(() => {
        setErrors(errorsInit)
        setError(null)
    }, [])

    const inputProps = (name) => ({
        value: values[name],
        error: errors[name],
        resetErrors,
        setValue: (val) => setValues(v => ({...v, [name]: val}))
    })

    return (<>
        <Container>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1">{post.title.rendered}</Typography>
            <Html2React html={post.content.rendered}/>
        </Container>
        <Container maxWidth="md">
            <FormControl fullWidth margin="normal">
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </FormControl>
            <TextInput label="Nome*" {...inputProps("nome")} />
            <TextInput label="Cognome*" {...inputProps("cognome" )} />
            <TextInput label="Email*" {...inputProps("email")} />
            <TextInput label="Messaggio" multiline minRows={8} {...inputProps("message")} />

            <FormControl fullWidth margin="normal">
                <FormControlLabel
                    control={<Checkbox checked={values.privacy} onChange={(event) => setValues(oldV => ({
                        ...oldV,
                        privacy: event.target.checked
                    }))} color="primary" name="privacy" />}
                    label={
                        <>Acconsento al trattamento dei dati come indicato nell’<Button style={{paddingTop: '1px'}} component="a" onClick={() => actions.router.set('/privacy-policy-cookies')} target="_blank">informativa privacy</Button></>
                    }
                />
            </FormControl>
            <div style={{maxWidth: '400px', margin: '0 auto 40px'}}>
                <FormControl fullWidth margin="normal">
                    <Button disabled={!values.privacy} onClick={handleSend} variant="contained" color="primary">Invia</Button>
                </FormControl>
            </div>
        </Container>
    </>)
}

export default connect(Prenota)

const TextInput = ({error, resetErrors, label, value, setValue, name, ...props }) => (
    <FormControl error={error} fullWidth margin="normal">
        <TextField {...props} error={error} onFocus={resetErrors} helperText={error} label={label} value={value} onChange={(event) => setValue(event.target.value)} variant="outlined" />
    </FormControl>
)