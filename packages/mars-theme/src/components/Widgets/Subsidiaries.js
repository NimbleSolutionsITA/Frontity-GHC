import React, {useCallback} from 'react'
import {connect} from "frontity";
import {Card, CardActionArea, CardContent, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import MarkerIcon from "@material-ui/icons/Room";
import SecurityIcon from '@material-ui/icons/Security';
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    card: {
        borderLeft: '10px solid',
        borderColor: theme.palette.primary.main
    },
    row: {
        alignItems:'center',
        display: 'flex',
        marginBottom: '4px',
        '& > svg': {
            fontSize: '16px',
            marginRight: '10px'
        }
    }
}))

const CompanyCard = connect(({company}) => {
    const classes = useStyles()
    const Row = ({Icon, value}) => <div className={classes.row}><Icon color="primary" /> {value}</div>
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card elevation={0} className={classes.card}>
                <CardActionArea onClick={() => window.open(company.link,'_blank')}>
                    <CardContent>
                        <Typography variant="h4" style={{fontWeight: 'bold', marginBottom: '10px'}}>
                            {company.business}
                        </Typography>
                        <div>
                            {company.address && <Row Icon={MarkerIcon} value={company.address}/>}
                            {company.role && <Row Icon={SecurityIcon} value={company.role}/>}
                            {company.name && <Row Icon={PersonIcon} value={company.name}/>}
                            {company.email && <Row Icon={EmailIcon} value={company.email}/>}
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
})

const Subsidiaries = ({ subsidiaries }) => (
    <Container style={{marginTop: '40px'}}>
        <Grid container spacing={5}>
            {subsidiaries.map(company => <CompanyCard company={company} />)}
        </Grid>
    </Container>
)

export default connect(Subsidiaries)