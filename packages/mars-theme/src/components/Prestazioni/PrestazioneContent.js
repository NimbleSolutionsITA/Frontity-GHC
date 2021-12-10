import React from 'react'
import {connect} from "frontity";
import {Button, Grid, Hidden, Typography} from "@material-ui/core";
import translations from "../../translations";
import PhoneIcon from "../icons/Phone";
import PrenotaOra from "../PrenotaOra";
import {pagesMap} from "../../config";

const PrestazioneContent = ({type, service, state, libraries, actions}) => {
    const Html2React = libraries.html2react.Component;
    const handleClick = (st) => {
        actions.router.set(pagesMap[6][state.theme.lang][1], {state: st})
    }
    return (
        <Grid container>
            <Grid item xs={12} md={type === 'ambulatoriali' || service.acf.servicesInfo ? 8 : 12}>
                <div style={{margin: '32px 0'}}>
                    <Html2React html={service.content.rendered} />
                </div>
            </Grid>
            <Hidden mdDown>
                <Grid item lg={1}>
                    <div />
                </Grid>
            </Hidden>
            {type === 'ambulatoriali' || service.acf.servicesInfo && (
                <Grid item xs={12} md={4} lg={3}>
                    {type === 'ambulatoriali' && service.acf.servicesPhone && (
                        <div style={{borderRadius: '8px', backgroundColor: '#F6F9FC', padding: '32px', textAlign: 'center', margin: '32px auto'}}>
                            <Typography variant="h3" style={{fontWeight: 'bold'}}>
                                    <span style={{backgroundColor: 'black', color: 'white', padding: '2px 3px', borderRadius: '50%', marginRight: '16px'}}>
                                        <PhoneIcon style={{height: '18px'}} />
                                    </span>
                                {service.acf.servicesPhone}
                            </Typography>
                            <PrenotaOra style={{fontWeight: 'normal', fontSize: '14px', width: '100%', margin: '32px 0 16px'}} />
                            {service.acf.servicesTime && (
                                <div style={{margin: '0 8px'}}>
                                    <Html2React html={service.acf.servicesTime} />
                                </div>
                            )}
                        </div>
                    )}
                    {service.acf.servicesInfo && (
                        <div style={{margin: type === 'ricoveri' && '32px auto'}}>
                            <Typography style={{fontWeight: 'bold'}}>
                                {type === 'ambulatoriali' ?
                                    translations(state.theme.lang, 'daSapere') :
                                    translations(state.theme.lang, 'infoPraticheRicovero')
                                }
                            </Typography>
                            <Html2React html={service.acf.servicesInfo} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleClick(service.id)}
                                style={{fontWeight: 'normal', fontSize: '14px', width: '100%', margin: '32px 0 16px'}}
                            >
                                {translations(state.theme.lang, 'vaiAiMedici')}
                            </Button>
                        </div>
                    )}
                </Grid>
            )}
        </Grid>
    )
}

export default connect(PrestazioneContent)