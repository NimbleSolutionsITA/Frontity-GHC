import {useState} from 'react'
import {connect} from "frontity";
import {
    Button,
    DialogActions,
    Dialog as MuiDialog,
    DialogContentText,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import translations from "../../translations";

const Dialog = ({message, libraries, state, noCta, title, ...props}) => {
    const [open, setOpen] = useState(true)
    const Html2React = libraries.html2react.Component;
    const handleConfirm = () => setOpen(false)
    const handleDecline = () => window.history.back()
    return (
        <MuiDialog
           open={open}
           maxWidth="lg"
           {...props}
        >
            {title && (<DialogTitle>{title}</DialogTitle>)}
            <DialogContent>
                <DialogContentText>
                    <Html2React html={message} />
                </DialogContentText>
            </DialogContent>
            {!noCta && (
                <DialogActions>
                    <Button onClick={handleDecline} color="secondary" variant="contained">
                        {translations(state.theme.lang, 'decline')}
                    </Button>
                    <Button onClick={handleConfirm} color="primary"  variant="contained">
                        {translations(state.theme.lang, 'accept')}
                    </Button>
                </DialogActions>
            )}
        </MuiDialog>
    )
}

export default connect(Dialog)