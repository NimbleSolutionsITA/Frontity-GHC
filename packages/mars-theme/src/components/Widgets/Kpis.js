import React from "react";
import { connect, Global, css, loadable } from "frontity";
import {Container, Grid, makeStyles, Typography, useTheme} from "@material-ui/core";
import {useInView} from "react-intersection-observer";
import * as Icons from "@material-ui/icons"
const ReactOdometer = loadable(() => import('react-odometerjs'))

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: '20px 0',
        padding: '40px 0',
        color: "white",
        backgroundColor: theme.palette.primary.main
    },
    kpiWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    kpi: {
        padding: '12px 0 0',
        fontWeight: 'bold',
        fontSize: '55px',
        lineHeight: '61px',
        whiteSpace: 'nowrap'
    }
}))

const Kpis = ({state}) => {
    const classes = useStyles()
    const theme = useTheme()

    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        delay: 500,
    });

    const kpis = state.theme.options.odometer.map(kpi => ({
        ...kpi,
        Icon: kpi.icon && Icons[kpi.icon]
    }))

    return (
        <div className={classes.wrapper}>
            <Container>
                <Grid ref={ref} container spacing={5} justifyContent="center">
                    {kpis.map(({value, label, unit, icon, Icon}) => (
                        <Grid classes={{root: classes.kpiWrapper}} item xs={12} sm={6} md={3} alignItems="center">
                            {icon && <Icon fontSize="large" />}
                            <Typography variant="h2" weight="bold" classes={{root: classes.kpi}}>
                                <ReactOdometer
                                    value={inView ? Number(value) : 0}
                                    format="(.ddd),dd"
                                />
                                <span>{unit}</span>
                            </Typography>
                            <Typography>{label}</Typography>
                        </Grid>
                    ))}
                    <Global
                        styles={css`
                            .odometer.odometer-auto-theme, .odometer.odometer-theme-default {
                              display: inline-block;
                              vertical-align: middle;
                              *vertical-align: auto;
                              *zoom: 1;
                              *display: inline;
                              position: relative;
                            }
                            .odometer.odometer-auto-theme .odometer-digit, .odometer.odometer-theme-default .odometer-digit {
                              display: inline-block;
                              vertical-align: middle;
                              *vertical-align: auto;
                              *zoom: 1;
                              *display: inline;
                              position: relative;
                            }
                            .odometer.odometer-auto-theme .odometer-digit .odometer-digit-spacer, .odometer.odometer-theme-default .odometer-digit .odometer-digit-spacer {
                              display: inline-block;
                              vertical-align: middle;
                              *vertical-align: auto;
                              *zoom: 1;
                              *display: inline;
                              visibility: hidden;
                            }
                            .odometer.odometer-auto-theme .odometer-digit .odometer-digit-inner, .odometer.odometer-theme-default .odometer-digit .odometer-digit-inner {
                              text-align: left;
                              display: block;
                              position: absolute;
                              top: 0;
                              left: 0;
                              right: 0;
                              bottom: 0;
                              overflow: hidden;
                            }
                            .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon, .odometer.odometer-theme-default .odometer-digit .odometer-ribbon {
                              display: block;
                            }
                            .odometer.odometer-auto-theme .odometer-digit .odometer-ribbon-inner, .odometer.odometer-theme-default .odometer-digit .odometer-ribbon-inner {
                              display: block;
                              -webkit-backface-visibility: hidden;
                            }
                            .odometer.odometer-auto-theme .odometer-digit .odometer-value, .odometer.odometer-theme-default .odometer-digit .odometer-value {
                              display: block;
                              -webkit-transform: translateZ(0);
                            }
                            .odometer.odometer-auto-theme .odometer-digit .odometer-value.odometer-last-value, .odometer.odometer-theme-default .odometer-digit .odometer-value.odometer-last-value {
                              position: absolute;
                            }
                            .odometer.odometer-auto-theme.odometer-animating-up .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up .odometer-ribbon-inner {
                              -webkit-transition: -webkit-transform 2s;
                              -moz-transition: -moz-transform 2s;
                              -ms-transition: -ms-transform 2s;
                              -o-transition: -o-transform 2s;
                              transition: transform 2s;
                            }
                            .odometer.odometer-auto-theme.odometer-animating-up.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-up.odometer-animating .odometer-ribbon-inner {
                              -webkit-transform: translateY(-100%);
                              -moz-transform: translateY(-100%);
                              -ms-transform: translateY(-100%);
                              -o-transform: translateY(-100%);
                              transform: translateY(-100%);
                            }
                            .odometer.odometer-auto-theme.odometer-animating-down .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down .odometer-ribbon-inner {
                              -webkit-transform: translateY(-100%);
                              -moz-transform: translateY(-100%);
                              -ms-transform: translateY(-100%);
                              -o-transform: translateY(-100%);
                              transform: translateY(-100%);
                            }
                            .odometer.odometer-auto-theme.odometer-animating-down.odometer-animating .odometer-ribbon-inner, .odometer.odometer-theme-default.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
                              -webkit-transition: -webkit-transform 2s;
                              -moz-transition: -moz-transform 2s;
                              -ms-transition: -ms-transform 2s;
                              -o-transition: -o-transform 2s;
                              transition: transform 2s;
                              -webkit-transform: translateY(0);
                              -moz-transform: translateY(0);
                              -ms-transform: translateY(0);
                              -o-transform: translateY(0);
                              transform: translateY(0);
                            }
                            
                            .odometer.odometer-auto-theme, .odometer.odometer-theme-default {
                              font-family: "Helvetica Neue", sans-serif;
                              line-height: 1.1em;
                            }
                            .odometer.odometer-auto-theme .odometer-value, .odometer.odometer-theme-default .odometer-value {
                              text-align: center;
                            }
                        `}
                    />
                </Grid>
            </Container>
        </div>
    )
}

export default connect(Kpis)