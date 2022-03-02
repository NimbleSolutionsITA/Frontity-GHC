import React, {useState, useEffect} from 'react'
import {Button, Container, Typography, TextField, Grid, useMediaQuery} from "@material-ui/core";
import {connect} from "frontity";
import PrestazioniTabs from "./PrestazioniTabs";
import translations from "../../translations";
import {pagesMap} from "../../config";
import Loading from "../loading";
import PostHeader from "../PostHeader";

const Prestazioni = ({state, actions, libraries}) => {
    const data = state.source.get(state.router.link);
    const ambCat = state.theme.lang === 'it' ? 33 : 39
    const ricCat = state.theme.lang === 'it' ? 35 : 37
    const categoryId = [ambCat, ricCat] // state.router.link === pagesMap[1][state.theme.lang][1] ? ambCat : ricCat
    const post = state.source.page[data.id]
    const type = state.router.link === pagesMap[1][state.theme.lang][1] ? 'ambulatoriali' : 'ricoveri'
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const [services, setServices] = useState(null)
    const [searchWord, setSearchWord] = useState('')
    const [servicesChunks, setServiceChunks] = useState([])
    const [expanded, setExpanded] = React.useState(false);

    const LETTERS_MIN_AMOUNT = 30
    const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    const Html2React = libraries.html2react.Component;

    useEffect(() => {
        async function fetchServices() {
            const response = await libraries.source.api.get({
                endpoint: "services",
                params: { categories: categoryId.toString(), per_page: 100 },
            });
            const res = await libraries.source.populate({ response, state })

            return res.map(({id}) => state.source.services[id])
        }
        fetchServices().then(resServices => setServices(resServices))
    }, [state.theme.lang]);

    useEffect(() => {
        if (services)
            setServiceChunks(alphabet.map(letter => {
                return {
                    letter,
                    services: services.filter(service => service.title.rendered.startsWith(letter))
                }
            }).filter(letterChunk => letterChunk.services.length > 0))
    }, [state.router.link, services])

    const handleChange = (event) => {
        setSearchWord(event.target.value)
        if (event.target.value.length > 0)
            setServiceChunks(alphabet.map(letter => {
                return {
                    letter,
                    services: services.filter(service => service.title.rendered.startsWith(letter) && service.title.rendered.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
                }
            }).filter(letterChunk => letterChunk.services.length > 0))
        else
            setServiceChunks(alphabet.map(letter => {
                return {
                    letter,
                    services: services.filter(service => service.title.rendered.startsWith(letter))
                }
            }).filter(letterChunk => letterChunk.services.length > 0))
    }

    return (
        <Container>
            <PostHeader
                featuredImage={state.source.attachment[post.featured_media]}
                isMobile={isMobile}
                postTitle={post.title.rendered}
                date={new Date(post.date)}
                accentColor={state.theme.options.slider.accentColor}
                lang={state.theme.lang}
            />
            <Html2React html={post.content.rendered}/>
            {services ? (
                <>
                    <Grid container justify="center" style={{marginTop: '16px'}}>
                        <Grid item xs={10} sm={8} md={6} lg={4}>
                            <TextField
                                placeholder={translations(state.theme.lang, 'cercaUnaPrestazione')}
                                type="search"
                                value={searchWord}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                style={{margin: '16px 0'}}
                            />
                        </Grid>
                        {services.length > LETTERS_MIN_AMOUNT && (
                            <Grid item xs={12}>
                                <Typography align="center">{translations(state.theme.lang, 'oppureClicca' +
                                    '')}</Typography>
                                <div style={{margin: '16px 0', textAlign: 'center'}}>
                                    {servicesChunks.map(chunk => (
                                        <Button key={chunk.letter} component="a" href={`${state.router.link}#${chunk.letter}`}>{chunk.letter}</Button>
                                    ))}
                                </div>
                            </Grid>
                        )}
                    </Grid>
                    <div style={{margin: '32px'}}>
                        {servicesChunks.map((chunk) => (
                            <div key={chunk.letter} style={{position: 'relative'}}>
                                <div style={{position: 'absolute', top: '-90px', width: '1px', height: '1px'}} id={chunk.letter} />
                                {services.length > LETTERS_MIN_AMOUNT && <Typography color="primary" variant="h5" style={{fontWeight: 'bold', paddingLeft: '16px'}}>{chunk.letter}</Typography>}
                                <PrestazioniTabs ambCat={ambCat} actions={actions} lang={state.theme.lang} type={type} services={chunk.services} expanded={expanded} setExpanded={setExpanded} Html2React={Html2React}/>
                                {services.length > LETTERS_MIN_AMOUNT && <br/>}
                            </div>
                        ))}
                    </div>
                </>
            ) : <Loading />}
        </Container>
    )
}

export default connect(Prestazioni)