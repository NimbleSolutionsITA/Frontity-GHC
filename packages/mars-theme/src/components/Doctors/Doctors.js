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
import {departments} from "../../config";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import Loading from "../loading";
import PrestazioniTabs from "../Prestazioni/PrestazioniTabs";

const Doctors = ({ state, actions, libraries }) => {
    const [onlyHead, setOnlyHead] = useState(false)
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    const serviceId = state.router.state;
    const Html2React = libraries.html2react.Component;
    const allDepartments = departments(state.theme.lang).map(dep => dep[0])
    const [doctors, setDoctors] = useState(null)
    const [doctorsChunks, setDoctorsChunks] = useState([])
    const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

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
    }, [state.theme.lang]);

    useEffect(() => {
        if (doctors)
            setDoctorsChunks(alphabet.map(letter => {
                return {
                    letter,
                    doctors: doctors.filter(doctor => doctor.title.rendered.replace('Dr. ', '').replace('Dr.ssa ', '').startsWith(letter))
                }
            }).filter(letterChunk => letterChunk.doctors.length > 0))
    }, [state.router.link, doctors])


    const filterDoctors = (departments, chunk) => (
            typeof serviceId === 'number' ?
                chunk.doctors.filter(doc => doc.acf.prestazioni.filter(p => p.ID === serviceId).length > 0) :
                chunk.doctors
        )
        .filter(({categories}) => categories.filter(cat => departments.includes(cat)).length > 0)
        .filter(({acf}) => !onlyHead || acf.doctorsHead)
    const [currentDepartments, setCurrentDepartments] = useState(allDepartments)
    const [searchWord, setSearchWord] = useState('')

    const handleClick = (value) => currentDepartments.includes(value) ?
        setCurrentDepartments(currentDepartments.filter(dep => dep !== value)) :
        setCurrentDepartments([...currentDepartments, value])

    const handleChange = (event) => {
        setSearchWord(event.target.value)
        if (event.target.value.length > 0)
            setDoctorsChunks(alphabet.map(letter => {
                return {
                    letter,
                    doctors: doctors.filter(doctor => doctor.title.rendered.replace('Dr. ', '').replace('Dr.ssa ', '').startsWith(letter) && doctor.title.rendered.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
                }
            }).filter(letterChunk => letterChunk.doctors.length > 0))
        else
            setDoctorsChunks(alphabet.map(letter => {
                return {
                    letter,
                    doctors: doctors.filter(doctor => doctor.title.rendered.replace('Dr. ', '').replace('Dr.ssa ', '').startsWith(letter))
                }
            }).filter(letterChunk => letterChunk.doctors.length > 0))
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
                        <Grid item xs={12}>
                            <Typography align="center">{translations(state.theme.lang, 'oppureClicca' +
                                '')}</Typography>
                            <div style={{margin: '16px 0', textAlign: 'center'}}>
                                {doctorsChunks.map(chunk => filterDoctors(currentDepartments, chunk).length > 0 && (
                                    <Button key={chunk.letter} component="a" href={`${state.router.link}#${chunk.letter}`}>{chunk.letter}</Button>
                                ))}
                            </div>
                        </Grid>
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
                                        avatar={<SupervisedUserCircleRoundedIcon />}
                                        label={translations(state.theme.lang, 'soloResponsabili')}
                                        onClick={() => setOnlyHead(!onlyHead)}
                                        style={{
                                            margin: '8px',
                                            backgroundColor: onlyHead ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                        }}
                                    />
                                    {allDepartments.map((value) => (
                                        <Chip
                                            key={value}
                                            label={departments(state.theme.lang).filter(dep => dep[0] === value)[0][1]}
                                            onClick={() => handleClick(value)}
                                            style={{
                                                margin: '8px',
                                                backgroundColor: currentDepartments.includes(value) ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                            }}
                                        />
                                    ))}
                                </>
                            )
                        }
                    </div>
                    {doctorsChunks.map((chunk) => filterDoctors(currentDepartments, chunk).length > 0 && (
                        <div key={chunk.letter} style={{position: 'relative'}}>
                            <div style={{position: 'absolute', top: '-90px', width: '1px', height: '1px'}} id={chunk.letter} />
                            <Typography color="primary" variant="h5" style={{fontWeight: 'bold', paddingLeft: '16px'}}>{chunk.letter}</Typography>
                            <br/>
                            <Grid container spacing={5}>
                                {filterDoctors(currentDepartments, chunk)
                                    .filter(doctor => searchWord ? doctor.title.rendered.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 : true)
                                    .sort((a,b) => (a.title.rendered > b.title.rendered) ? 1 : ((b.title.rendered > a.title.rendered) ? -1 : 0))
                                    .map(doctor => (
                                        <Grid key={doctor.id} item xs={12} sm={6} md={4} lg={3}>
                                            <Card elevation={0}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        onClick={() => actions.router.set(doctor.link)}
                                                        image={doctor["featured_media"] && state.source.attachment[doctor["featured_media"]]['media_details']['sizes']['full']['source_url']}
                                                        style={{height: '300px'}}
                                                    />
                                                    <CardContent>
                                                        <div onClick={() => actions.router.set(doctor.link)}>
                                                            <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                                                {doctor.acf.doctorsHead && <SupervisedUserCircleRoundedIcon style={{marginBottom: '-4px', marginRight: '4px', fontSize: '22px', lineHeight: '22px'}} />}
                                                                <Html2React html={doctor.title.rendered} />
                                                            </Typography>
                                                            <Typography style={{margin: '16px 0'}}>{doctor.acf.doctorActivity}</Typography>
                                                        </div>
                                                        <div style={{marginLeft: '-4px', width: 'calc(100% + 4px)'}}>
                                                            {doctor.acf.prestazioni.map(prestazione => (
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