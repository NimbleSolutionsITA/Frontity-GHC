
import {useState} from "react";
import DateFnsUtils from '@date-io/date-fns';
import enLocale from "date-fns/locale/en-US";
import itLocale from "date-fns/locale/it";
import {Grid, Container, makeStyles} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";
import {checkIsNextDate, checkIsSameDate, formatDate} from "../../helpers";
import translations from "../../translations";

const localeMap = {
    en: enLocale,
    it: itLocale,
};

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: '100%',
        minHeight: '100%',
        flexGrow: 1,
        color: 'white',
        padding: '20px 30px',
        [theme.breakpoints.down('xs')]: {
            padding: '10px 20px',
        },
        '& h4': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '1em'
            },
            [theme.breakpoints.down('xs')]: {
                lineHeight: '1.5em',
                fontSize: '.75em'
            }
        },
        '& button': {
            textDecoration: 'none',
            textAlign: 'left',
            '& h2': {
                [theme.breakpoints.down('sm')]: {
                    fontSize: '2em'
                }
            },
            '& h3': {
                [theme.breakpoints.down('sm')]: {
                    fontSize: '1em'
                }
            }
        }
    },
    nextEvents: {
        fontSize: '.75em'
    },
    nextEvent: {
        textAlign: 'center',
        padding: '20px 0',
        '& b': {
            color: theme.palette.primary.main
        },
        '& span': {
            fontSize: '1.25em',
            fontWeight: 'bold'
        }
    }
}));

const Event = ({events, lang}) => {
    const classes = useStyles();
    const eventsList = events.map(({title, date}) => ({title, date: new Date(date)})).sort((a,b) => a.date - b.date)
    const now = new Date()
    const latestEvent = eventsList[eventsList.length - 1]
    const nextEvent = eventsList.filter(e => checkIsNextDate(e.date, now))[0] || latestEvent
    const [date, changeDate] = useState(nextEvent.date);
    const [currentEvent, ...followingEvents] = eventsList.filter(e => checkIsNextDate(e.date, date))

    const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => (
        {
            ...dayComponent,
            props: {
                ...dayComponent.props,
                current: eventsList.find(event => checkIsSameDate(event.date, day)) && day !== selectedDate
            }
        }
    )

    return (
        <>
            {nextEvent && nextEvent !== latestEvent && (
                <Container maxWidth="sm">
                    <p className={classes.nextEvent}>
                        {translations(lang, 'prossimoEvento')}:<br />
                        <b>{nextEvent.date.toLocaleString(lang, { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</b><br />
                        <span>{nextEvent.title}</span>
                    </p>
                </Container>
            )}
            <Grid container>
                <Grid item xs={12} lg={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[lang]}>
                        <DatePicker
                            autoOk
                            orientation="landscape"
                            variant="static"
                            openTo="date"
                            value={date}
                            onChange={changeDate}
                            renderDay={renderDay}
                            shouldDisableDate={(day) => !eventsList.find(event => checkIsSameDate(event.date, day))}
                            ToolbarComponent={(props) => {

                                const { date,
                                    isLandscape,
                                    openView,
                                    setOpenView,
                                    title} = props;

                                const handleChangeViewClick = (view) => (e) => {

                                    setOpenView(view);

                                }

                                return (
                                    <PickerToolbar className={classes.toolbar} title={title} isLandscape={isLandscape}>
                                        <ToolbarButton
                                            onClick={handleChangeViewClick("year")}
                                            variant="h2"
                                            label={date.getFullYear()}
                                            selected={openView === "year"}
                                        />
                                        <ToolbarButton
                                            onClick={handleChangeViewClick("date")}
                                            variant="h3"
                                            selected={openView === "date"}
                                            label={date.toLocaleString(lang, { weekday: 'long', month: 'long', day: 'numeric' })}
                                        />
                                        <h4>{currentEvent.title}</h4>
                                    </PickerToolbar>
                                );

                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <p>{translations(lang, 'eventiSuccessivi')}:</p>
                    <table className={classes.nextEvents}>
                        <tbody>
                        {followingEvents.length > 0 ? followingEvents.slice(0, 4).map(event => (
                            <tr key={event.date} onClick={() => changeDate(event.date)}>
                                <td style={{whiteSpace: 'nowrap'}}>{formatDate(event.date)}</td>
                                <td>{event.title}</td>
                            </tr>
                        )) : <i>{translations(lang, 'nessunEvento')}</i>}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </>
    )
}

export default Event