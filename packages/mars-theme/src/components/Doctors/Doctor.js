import React from 'react'
import {connect} from "frontity";
import {Hidden, Container, Grid, Typography, Chip, Button} from "@material-ui/core";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import translations from "../../translations";

const Doctor = ({ state, actions, libraries }) => {
    const Html2React = libraries.html2react.Component;
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];

    const tags = post.acf.specialistica
    const tuoTempoParams = post.acf.afea_id ? `#search/query/resourceid=${post.acf.afea_id}` : ''

    const DepartmentChips = () => (
        <div style={{marginLeft: '-8px', marginBottom: '16px', width: 'calc(100% + 8px)'}}>
            {tags && tags.map((tag) => (
                <Chip
                    key={tag.term_id}
                    label={tag.name}
                    style={{
                        margin: '8px',
                        backgroundColor: 'rgba(31, 64, 125, 0.05)'
                    }}
                />
            ))}
        </div>
    )

    return (
        <Container>
            <Hidden smUp>
                <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1">
                    {post.acf.doctorsHead && <SupervisedUserCircleRoundedIcon color="primary" style={{marginBottom: '-6px', marginRight: '8px', fontSize: '30px', lineHeight: '30px'}} />}
                    <Html2React html={post.title.rendered} />
                </Typography>
            </Hidden>
            <Grid container spacing={5} style={{marginTop: '32px', marginBottom: '32px'}}>
                <Grid item xs={12} sm={5}>
                    <div style={{width: '100%',paddingBottom: '100%', backgroundSize: 'cover' ,backgroundImage: `url(${post["featured_media"] ? state.source.attachment[post["featured_media"]]['source_url'] : state.theme.options.doctorDefault})`}} />
                </Grid>
                <Hidden smDown>
                    <Grid item md={1} />
                </Hidden>
                <Grid item xs={12} sm={7} md={6}>
                    <Hidden xsDown>
                        <Typography variant="h3" component="h1" style={{fontWeight: 'bold'}}>
                            {post.acf.doctorsHead && <SupervisedUserCircleRoundedIcon color="primary" style={{marginBottom: '-6px', marginRight: '8px', fontSize: '30px', lineHeight: '30px'}} />}
                            <Html2React html={post.title.rendered} />
                        </Typography>
                    </Hidden>
                    <Typography style={{margin: '16px 0'}}>{post.acf.doctorActivity}</Typography>
                    <div style={{marginLeft: '-2px', marginBottom: '16px', width: 'calc(100% + 2px)'}}>
                        {post.acf.prestazioni && post.acf.prestazioni.map(prestazione => (
                            <Chip
                                color="primary"
                                size="small"
                                key={prestazione.ID}
                                label={prestazione['post_title']}
                                onClick={() => actions.router.set(state.source.services[prestazione.ID].link)}
                                style={{
                                    margin: '2px',
                                }}
                            />
                        ))}
                        <DepartmentChips />
                    </div>
                    <Html2React html={post.content.rendered} />
                    {post.acf.doctorsCV && (
                        <Button startIcon={<InfoRoundedIcon />} component="a" target="_blank" href={post.acf.doctorsCV}>{translations(state.theme.lang, 'visualizzaCV')}</Button>
                    )}
                    {post.acf.prestazioni && (
                        <div style={{margin: '16px 0'}}>
                            <Button onClick={() => actions.router.set('/prenota/', {state: {params: tuoTempoParams}})}
                                    color="primary"
                                    variant="contained">{translations(state.theme.lang, 'prendiAppuntamento')}</Button>
                            {/*<Button onClick={() => window.open('https://wp.hesperia.it/wp-content/uploads/2021/03/modalita%CC%80-prenotazione.pdf','_blank')} variant="contained" color="secondary" disableElevation>
                            {translations(state.theme.lang, 'prendiAppuntamento')}
                        </Button>*/}
                        </div>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default connect(Doctor)