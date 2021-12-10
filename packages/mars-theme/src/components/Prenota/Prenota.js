import React, {useEffect, useState} from 'react'
import {connect} from "frontity"
import {Box, Container, useMediaQuery, useTheme} from "@material-ui/core"
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

const Prenota = ({ state }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadTuoTempoScript(() => {
            setLoaded(true);
        });
    });
    return  loaded ? (
        <Container>
            <iframe
                src={`https://app.tuotempo.com/mop/index.php?dbName=tt_afea_garofalo_hh_prod${state.router.state.params || ''}`}
                id="mop_iframe"
                frameBorder="0"
                name="mop_iframe"
                scrolling="no"
                style={{
                    margin: '0 auto',
                    width: '700px',
                    height: '700px',
                    border: '0px',
                    display: 'block'
                }}
            />
        </Container>
    ) : <Loading />
}

export default connect(Prenota)