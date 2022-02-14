import React from 'react'
import {styled, connect, css, decode} from "frontity"
import {Container, Grid, Typography, Button, Box, useMediaQuery} from "@material-ui/core"
import Link from "@frontity/components/link";
// import {Facebook, LinkedIn} from "@material-ui/icons";

const HHCredits = styled(Typography)`
  text-align: center;
`;

const NimbleCredits = styled(Typography)`
    margin-top: 16px;
    text-align: center;
`;

const LogoGHC = styled.img`
  padding: 16px 0;
  height: 24px;
  margin-right: 32px;
 `;

const LogoBigGHC = styled.img`
  padding: 0;
  height: 60px;
`;

const LogoHH = styled.img`
  padding: 16px 0;
  max-height: 24px;
  max-width: 100%;
  height: auto;
`;

const HeartIcon = () => (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="red" stroke="red" style={{transform: 'scale(0.5) translate(0px, 17px)'}}>
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
    </svg>
)

const Footer = ({ state, actions, libraries }) => {
    const Html2React = libraries.html2react.Component;
    const isSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
    return (
        <Box marginTop={{md: '8px', lg: '32px'}} padding="32px 0" color="#FFF" bgcolor="primary.main">
            <Container>
                <Grid container justify="space-between">
                    <Grid item xs={12} sm={8}>
                        {state.theme.options.logoGHCWhite && (
                            <a href="https://garofalohealthcare.com" target="_blank">
                                {state.theme.options.logoFooter ? (
                                    <LogoGHC src={state.theme.options.logoGHCWhite.url} alt="Logo Garofalo Health Care"/>
                                ) : (
                                    <LogoBigGHC src={state.theme.options.logoGHCWhite.url} alt="Logo Garofalo Health Care"/>
                                )}
                            </a>
                        )}
                        {state.theme.options.logoFooter && <LogoHH src={state.theme.options.logoFooter.url} alt="Logo Istituto Raffaele Garofalo"/>}
                    </Grid>
                    {/*<Grid item xs={12} sm={4} classes={{root: classes.socials}}>
                        <IconButton href="https://www.facebook.com/hesperiahospital" target="_blank" edge="start">
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://www.linkedin.com/company/6907246" target="_blank" edge="end">
                            <LinkedIn />
                        </IconButton>
                    </Grid>*/}
                </Grid>
                <Grid container style={{margin: '16px 0'}}>
                    <Grid item container xs={12} md={9}>
                        {state.source.strutture && Object.keys(state.source.strutture).map(id => {
                            const {acf: {website, logo: {url}}, title: {rendered}, featured_media} = state.source.strutture[id]
                            return (
                                <Grid key={website} item xs={12} sm={6} md={4}>
                                    <Button
                                        style={{color: 'white'}}
                                        startIcon={<img height="30px" src={url} alt={'logo '+rendered} />}
                                        component={Link}
                                        link={website}
                                        target="_blank"
                                    >
                                        {decode(rendered)}
                                    </Button>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item xs={12} md={3} style={{[isSm ? 'borderTop' : 'borderLeft']: '1px solid #FFFFFF', marginTop: isSm && '20px'}}>
                        <Typography style={{paddingLeft: !isSm && '16px'}} variant="body2">
                            <ul>
                                {state.theme.options.contactsFooter && state.theme.options.contactsFooter.map(ct => (
                                    <li key={ct.label+ct.value}>
                                        {ct.label}{ct.value && ': '}<b>{ct.value}</b>
                                    </li>
                                ))}
                            </ul>

                        </Typography>
                    </Grid>
                </Grid>
                <HHCredits variant="body2">
                    {state.theme.options.legal && <Html2React html={state.theme.options.legal}/>}
                </HHCredits>
                <NimbleCredits variant="body2">
                    Made with <HeartIcon /> by <a href="https://www.nimble-solutions.com" target="_blank">Nimble Solutions</a>
                </NimbleCredits>
            </Container>
        </Box>
    )
}

export default connect(Footer)