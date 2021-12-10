import React from 'react'
import {Container, Typography} from "@material-ui/core";
import {connect, styled} from "frontity";
import PrestazioneContent from "./PrestazioneContent";
import {pagesMap} from "../../config";

const Prestazione = ({state}) => {
    const data = state.source.get(state.router.link)
    const ambCat = state.theme.lang === 'it' ? 33 : 39
    const service = state.source[data.type][data.id]
    const type = service.categories.includes(ambCat) ? 'ambulatoriali' : 'ricoveri'
    const subtitle = type === 'ambulatoriali' ? 'PRESTAZIONI AMBULATORIALI' : 'PRESTAZIONI CON RICOVERO'

    return (
        <Container>
            <Subtitle>{subtitle}</Subtitle>
            <Title>{service.title.rendered}</Title>
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