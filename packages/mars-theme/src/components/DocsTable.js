import React, {useState, useEffect} from "react";
import {connect, decode} from "frontity";
import {Typography} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import translations from "../translations";

const DocumentTable = connect(({ state, actions, libraries, id }) => {
    const [documents, setDocuments] = useState([])
    console.log(id)

    async function fetchDocs() {
        const response = await libraries.source.api.get({
            endpoint: "documents",
            params: {
                include: id,
                _embed: true,
            }
        })
        await libraries.source.populate({ response, state })
    }

    useEffect(() => {
        fetchDocs().then(() => setDocuments(state.source.documents[id].acf.documents))
    }, []);

    return (
        <table className="downloadTable">
            <tbody>
            {documents.map(doc => (
                <tr>
                    <a href={doc.file.link} target="_blank">
                        <td>
                            <CloudDownloadIcon style={{marginRight: '10px'}} />
                            {doc.label}
                            <span style={{flexGrow: 1}} />
                            <span style={{fontSize: '.9em', fontStyle: 'italic'}}>
                                        {translations(state.theme.lang, 'pubblicatoIl').toLowerCase()} {doc.date}
                                    </span>
                        </td>
                    </a>
                </tr>
            ))}
            </tbody>
        </table>
    )
})

const Documents = ({ documents }) => documents.map(doc => (
    <>
        <Typography variant="h3" style={{marginTop: '30px'}}>
            <b>{decode(doc.post_title)}</b>
        </Typography>
        <DocumentTable id={doc.ID} />
    </>
))

export default Documents