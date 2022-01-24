import React, {useState, useEffect} from 'react'
import {
    Grid,
    Container,
    Card,
    Typography,
    CardContent,
    CardMedia,
    CardActionArea,
    TextField,
    Chip,
    Button
} from "@material-ui/core";
import {connect} from "frontity";
import translations from "../../translations";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import Loading from "../loading";

const Doctors = ({ state, actions, libraries }) => {
    const [onlyHead, setOnlyHead] = useState(false)
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    const serviceId = state.router.state;
    const Html2React = libraries.html2react.Component;
    const [doctors, setDoctors] = useState(null)
    const [doctorsChunks, setDoctorsChunks] = useState([])
    const LETTERS_MIN_AMOUNT = 30
    const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

    const allTags = state.source.get('all-tags').items.filter(itm => state.theme.lang === 'it' ?
        !itm.link.split('/').includes('en') :
        itm.link.split('/').includes('en')
    )

    async function fetchDoctors() {
        const response = await libraries.source.api.get({
            endpoint: "doctors",
            params: {per_page: 100, _embed: true,},
        });
        const pages = libraries.source.getTotalPages(response);
        const res = await libraries.source.populate({ response, state })
        const requests = [];
        for (let page = 2; page <= pages; page++) {
            requests.push(
                libraries.source.api.get({
                    endpoint: "doctors",
                    params: {
                        per_page: 100,
                        _embed: true,
                        page
                    }
                })
            );
        }

        const responses = await Promise.all(requests);

        const others = await Promise.all(responses.map(response =>
            libraries.source.populate({ state, response })
        ));

        const all = [...res, ...others.flat()]

        return all.map(({id}) => state.source.doctors[id])
    }

    useEffect(() => {
        fetchDoctors().then(resDoctors => setDoctors(resDoctors))
    }, []);

    useEffect(() => {
        if (doctors) {
            const chunks = alphabet.map(letter => ({
                letter,
                doctors: doctors.filter(doctor => doctor.title.rendered.startsWith(letter))
            })).filter(letterChunk => letterChunk.doctors.length > 0)
            setDoctorsChunks(doctors.length > LETTERS_MIN_AMOUNT ? chunks : [{letter: '#', doctors}])
        }
    }, [state.router.link, state.router.state, doctors])

    const filterDoctors = (tags, chunk) => {
        return (
            typeof serviceId === 'number' ?
                chunk.doctors.filter(doc => doc.acf.prestazioni && doc.acf.prestazioni.filter(p => p.ID === serviceId).length > 0) :
                chunk.doctors
        )
            .filter(({acf}) =>
                (!onlyHead || acf.doctorsHead) &&
                (tags.length === 0 || currentTags.find(t => acf.specialistica && acf.specialistica.map(s => s.term_id).indexOf(t) !== -1))
            )
    }

    const [currentTags, setCurrentTags] = useState([])
    const [searchWord, setSearchWord] = useState('')

    const handleClick = (value) => currentTags.includes(value) ?
        setCurrentTags(currentTags.filter(tag => tag !== value)) :
        setCurrentTags([...currentTags, value])

    const handleChange = (event) => {
        setSearchWord(event.target.value)
        if (event.target.value.length > 0)
            setDoctorsChunks(doctors.length > LETTERS_MIN_AMOUNT ? alphabet.map(letter => {
                return {
                    letter,
                    doctors: doctors.filter(doctor => doctor.title.rendered.startsWith(letter) && doctor.title.rendered.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
                }
            }).filter(letterChunk => letterChunk.doctors.length > 0) : [{letter: '#', doctors: doctors.filter(doctor => doctor.title.rendered.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)}])
        else
            setDoctorsChunks(doctors.length > LETTERS_MIN_AMOUNT ? alphabet.map(letter => {
                return {
                    letter,
                    doctors: doctors.filter(doctor => doctor.title.rendered.replace('Dr. ', '').replace('Dr.ssa ', '').startsWith(letter))
                }
            }).filter(letterChunk => letterChunk.doctors.length > 0) : [{letter: '#', doctors}])
    }

    return (
        <Container>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1"><Html2React html={post.title.rendered} /></Typography>
            <Html2React html={post.content.rendered} />
            {doctors ? (
                <>
                    <Grid container justify="center" style={{marginTop: '16px'}}>
                        <Grid item xs={10} sm={8} md={6} lg={4}>
                            <TextField
                                placeholder={translations(state.theme.lang, 'cercaUnDottore')}
                                type="search"
                                value={searchWord}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                style={{margin: '16px 0'}}
                            />
                        </Grid>
                        {doctors.length > LETTERS_MIN_AMOUNT && (
                            <Grid item xs={12}>
                                <Typography align="center">{translations(state.theme.lang, 'oppureClicca' +
                                    '')}</Typography>
                                <div style={{margin: '16px 0', textAlign: 'center'}}>
                                    {doctorsChunks.map(chunk => filterDoctors(currentTags, chunk).length > 0 && (
                                        <Button key={chunk.letter} component="a" href={`${state.router.link}#${chunk.letter}`}>{chunk.letter}</Button>
                                    ))}
                                </div>
                            </Grid>
                        )}
                    </Grid>
                    <div style={{margin: '16px 0', textAlign: 'center'}}>
                        {typeof serviceId === 'number' ? (
                                <Typography color="primary" style={{fontWeight: 'bold', textAlign: 'center', margin: '8px 0 32px', textTransform: 'uppercase'}} variant="h4">
                                    <Html2React html={state.source.services[serviceId].title.rendered} />
                                </Typography>
                            ) :
                            (
                                <>
                                    <Chip
                                        key="all"
                                        label={translations(state.theme.lang, 'allDocs')}
                                        onClick={() => {
                                            setCurrentTags([])
                                            setOnlyHead(false)
                                        }}
                                        style={{
                                            margin: '8px',
                                            backgroundColor: (currentTags.length === 0 && !onlyHead) ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                        }}
                                    />
                                    <Chip
                                        avatar={<SupervisedUserCircleRoundedIcon />}
                                        label={translations(state.theme.lang, 'soloResponsabili')}
                                        onClick={() => setOnlyHead(!onlyHead)}
                                        style={{
                                            margin: '8px',
                                            backgroundColor: onlyHead ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                        }}
                                    />
                                    {allTags.map((tag) => (
                                        <Chip
                                            key={tag.id}
                                            label={tag.name}
                                            onClick={() => handleClick(tag.id)}
                                            style={{
                                                margin: '8px',
                                                backgroundColor: currentTags.includes(tag.id) ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                            }}
                                        />
                                    ))}
                                </>
                            )
                        }
                    </div>
                    {doctorsChunks.map((chunk) => filterDoctors(currentTags, chunk).length > 0 && (
                        <div key={chunk.letter} style={{position: 'relative'}}>
                            {doctors.length > LETTERS_MIN_AMOUNT && (<>
                                <div style={{position: 'absolute', top: '-90px', width: '1px', height: '1px'}} id={chunk.letter} />
                                <Typography color="primary" variant="h5" style={{fontWeight: 'bold', paddingLeft: '16px'}}>{chunk.letter}</Typography>
                                <br/>
                            </>)}
                            <Grid container spacing={5}>
                                {filterDoctors(currentTags, chunk)
                                    .filter(doctor => searchWord ? doctor.title.rendered.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 : true)
                                    .sort((a,b) => (a.title.rendered > b.title.rendered) ? 1 : ((b.title.rendered > a.title.rendered) ? -1 : 0))
                                    .map(doctor => doctor && (
                                        <Grid key={doctor.id} item xs={12} sm={6} md={4} lg={3}>
                                            <Card elevation={0}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        onClick={() => actions.router.set(doctor.link)}
                                                        image={doctor["featured_media"] ? state.source.attachment[doctor["featured_media"]]['media_details']['sizes']['full']['source_url'] : state.theme.options.doctorDefault}
                                                        style={{height: '300px'}}
                                                    />
                                                    <CardContent>
                                                        <div onClick={() => actions.router.set(doctor.link)}>
                                                            <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                                                {doctor.acf.doctorsHead && <SupervisedUserCircleRoundedIcon style={{marginBottom: '-4px', marginRight: '4px', fontSize: '22px', lineHeight: '22px'}} />}
                                                                {doctor.acf.abbreviazione} <Html2React html={doctor.title.rendered} />
                                                            </Typography>
                                                            <Typography style={{margin: '16px 0'}}>
                                                                {doctor.acf.specialistica ? `Specialistica: ${doctor.acf.specialistica.map(s => s.name).join(', ')}` : doctor.acf.doctorActivity}
                                                            </Typography>
                                                        </div>
                                                        <div style={{marginLeft: '-4px', width: 'calc(100% + 4px)'}}>
                                                            {doctor.acf.prestazioni && doctor.acf.prestazioni.map(prestazione => (
                                                                <Chip
                                                                    key={prestazione.ID}
                                                                    label={prestazione['post_title']}
                                                                    onClick={() => actions.router.set(state.source.services[prestazione.ID].link)}
                                                                    style={{
                                                                        margin: '2px',
                                                                        backgroundColor: 'rgba(31, 64, 125, 0.05)'
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))}
                            </Grid>
                            <br />
                        </div>
                    ))}
                </>
            ) : <Loading />}
        </Container>
    )
}

export default connect(Doctors)