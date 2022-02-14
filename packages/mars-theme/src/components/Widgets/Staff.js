import {useState} from 'react'
import {Box, Button, Card, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";
import MarkerIcon from "@material-ui/icons/Room";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from "@material-ui/icons/Email";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Dialog from "./Dialog";
import {decode} from "frontity";

const useStyles = makeStyles(theme => ({
    card: {
        border: '1px solid',
        borderColor: 'lightgray',
        borderLeft: '10px solid',
        borderLeftColor: theme.palette.primary.main,
        height: '100%',
        display: 'flex',
    },
    row: {
        alignItems:'center',
        display: 'flex',
        marginBottom: '4px',
        '& > svg': {
            fontSize: '16px',
            marginRight: '10px'
        }
    },
    cover: {
        width: 100,
    },
}))

const StaffCard = ({person}) => {
    const classes = useStyles()
    const [open, setOpen ] = useState(false)
    const Row = ({Icon, value, style, url}) => (
        <div
            className={classes.row}
            style={style}
            onClick={() => businessUrl && window.open(url, '_blank')}
        >
            {Icon && <Icon color="primary"/>} {value}
        </div>
    )
    return (
        <Grid item xs={12} sm={person.photo ? 7 : 6} md={person.photo ? 5 : 4}>
            <Card elevation={0} style={{minHeight: person.photo && 140}} className={classes.card}>
                {person.photo && <CardMedia className={classes.cover} image={person.photo}/>}
                <CardContent>
                    <Typography variant="h4" style={{fontWeight: 'bold', marginBottom: '10px'}}>
                        {person.name}
                    </Typography>
                    <div>
                        {person.company && <Row style={person.businessUrl ? {cursor: 'pointer', textDecoration: 'underline'} : undefined} url={person.businessUrl} Icon={AccountBalanceIcon} value={person.company}/>}
                        {person.address && <Row Icon={MarkerIcon} value={person.address}/>}
                        {person.phone && <Row Icon={PhoneIcon} value={person.phone}/>}
                        {person.email && <Row Icon={EmailIcon} value={person.email} style={{overflowWrap: 'anywhere'}} />}
                        {person.role && <Row value={person.role}/>}
                        {person.cv && <Button style={{marginTop: 10}} onClick={() => setOpen(true)} variant="contained" color="primary" size="small">Visualizza CV</Button>}
                    </div>
                </CardContent>
            </Card>
            <Dialog noCta open={open} onClose={() => setOpen(false)} title={person.name} message={person.cv}/>
        </Grid>
    )
}

const Staff = ({ staff, bottomText }) => (
    <Box marginY="40px" marginX={{md: staff[0].role ? '10%' : 0}}>
        <Grid container spacing={5} justifyContent="center">
            {staff.map(person => <StaffCard person={person} />)}
        </Grid>
        {bottomText}
    </Box>
)

export default Staff