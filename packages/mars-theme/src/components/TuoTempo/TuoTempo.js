import React, {useEffect, useState} from 'react'
import {connect} from "frontity";
import {Dialog, useTheme, useMediaQuery} from "@material-ui/core";
import Loading from "../loading";

const loadTuoTempoScript = (callback) => {
    const existingScript = document.getElementById('tuoTempoScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://app.tuotempo.com/js/mop_loader.js.php';
        script.id = 'tuoTempoScript';
        document.head.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }
    if (existingScript && callback) callback();
};

const TuoTempo = ({state, actions}) => {
    const [loaded, setLoaded] = useState(false);
    const theme = useTheme()
    const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        loadTuoTempoScript(() => {
            setLoaded(true);
        });
    });

    return (
        <Dialog
            maxWidth={false}
            open={state.theme.openTuoTempo}
            onBackdropClick={() => actions.theme.toggleTuoTempo('')}
            fullWidth={isSmDown}
            style={{
                margin: '0 auto',
            }}
        >
            {loaded ? (
                <iframe
                    src={`https://app.tuotempo.com/mop/index.php?dbName=tt_afea_garofalo_hh_prod${state.theme.tuoTempoParams}`}
                    id="mop_iframe"
                    frameBorder="0"
                    name="mop_iframe"
                    scrolling="no"
                    style={{
                        marginLeft: '0px',
                        width: '700px',
                        height: 'inherit',
                        border: '0px',
                    }}
                />
            ) : (
                <div
                    style={{
                        marginLeft: '0px',
                        width: '700px',
                        height: 'inherit',
                        border: '0px',
                    }}
                >
                    <Loading />
                </div>
            )}
        </Dialog>
    )
}

export default connect(TuoTempo)