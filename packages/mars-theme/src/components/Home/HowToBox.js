import React from 'react'
import {Grid, Typography} from "@material-ui/core";
import PhoneIcon from "../icons/Phone";
import PrenotaOra from "../PrenotaOra";

const HowToBox = ({title, body, phone, time, Html2React}) => {
    return (
        <div style={{margin: '36px 0', overflow: 'hidden'}}>
            <Grid container justify="center" spacing={10}>
                <Grid item sm={12} md={6}>
                    <Typography variant="h3" style={{fontWeight: 'bold'}}>{title}</Typography>
                    <Html2React html={body} />
                </Grid>
                <Grid item sm={12} md={4}>
                    <div style={{borderRadius: '8px', backgroundColor: '#F6F9FC', padding: '32px', textAlign: 'center', margin: '0 auto'}}>
                        <Typography variant="h3" style={{fontWeight: 'bold'}}>
                            <span style={{backgroundColor: 'black', color: 'white', padding: '2px 3px', borderRadius: '50%', marginRight: '16px'}}>
                                <PhoneIcon style={{height: '18px'}} />
                            </span>
                            {phone}
                        </Typography>
                        <PrenotaOra fullWidth style={{fontSize: '14px', margin: '32px 0 16px'}}  />
                        <div style={{margin: '0 8px'}}>
                            <Html2React html={time} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default HowToBox