import React from 'react'
import {connect} from "frontity";
import {Container} from "@material-ui/core";

const Document = ({ state, actions, libraries }) => {
    const Html2React = libraries.html2react.Component;
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    return (
        <Container>
            {post.title.rendered}
            <table>
                <thead>
                <tr>
                    <th>Documento</th>
                    <th>Data pubblicazione</th>
                </tr>
                </thead>
                <tbody>
                    {post.acf.documents.map(doc => (
                        <tr key={doc.file.url}>
                            <td><a href={doc.file.url} target="_blank">{doc.label}</a></td>
                            <td>{doc.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default connect(Document)