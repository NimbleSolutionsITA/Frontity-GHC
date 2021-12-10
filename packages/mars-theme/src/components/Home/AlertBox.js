import React, {useState} from 'react'
import {Alert, AlertTitle} from "@material-ui/lab";
import {Collapse, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const AlertBox = ({hpAlertIsActive, hpAlertTitle, hpAlertBody, Html2React}) => {
    const [openAlert, setOpenAlert] = useState(hpAlertIsActive)
    return (
        <Collapse in={openAlert}>
            <div style={{margin: '36px 0'}}>
                <Alert
                    icon={<ErrorOutlineIcon />}
                    variant="outlined"
                    severity="error"
                    onClose={() => setOpenAlert(false)}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={() => {
                                setOpenAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    }
                >
                    <AlertTitle variant="h4" style={{fontWeight: 'bold', color: '#EB5757'}}>{hpAlertTitle}</AlertTitle>
                    <Html2React html={hpAlertBody} />
                </Alert>
            </div>
        </Collapse>
    )
}

export default AlertBox