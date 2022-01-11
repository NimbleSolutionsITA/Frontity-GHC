import React from 'react'
import {Container, Typography} from "@material-ui/core";
import {connect, styled} from "frontity";
import PrestazioneContent from "./PrestazioneContent";
import translations from "../../translations";

const Prestazione = ({state, libraries}) => {
    const data = state.source.get(state.router.link)
    const ambCat = state.theme.lang === 'it' ? 33 : 39
    const service = state.source[data.type][data.id]
    const type = service.categories.includes(ambCat) ? 'ambulatoriali' : 'ricoveri'
    const Html2React = libraries.html2react.Component;

    return (
        <Container>
            <Subtitle>{translations(state.theme.lang, 'prestazioniSubtitle')}</Subtitle>
            <Title><Html2React html={service.title.rendered} /></Title>
            <PrestazioneContent type={type} service={service}  />
        </Container>
    )
}

const Title = styled.h1`
  text-align: center;      
  font-weight: bold;
  margin: 4px 0 32px;
`;
const Subtitle = styled.p`
  text-align: center;
  margin: 64px 0 4px;
`;

export default connect(Prestazione)