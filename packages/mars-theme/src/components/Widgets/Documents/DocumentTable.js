import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import translations from "../../../translations";
import {formatDate} from "../../../helpers";
import {makeStyles, Hidden} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    label: {
        display: 'flex',
        alignItems: 'center',
        '& span': {
            fontSize: '.8em',
            fontWeight: 'bold',
            color: theme.palette.primary.main
        }
    },
    date: {
        fontSize: '.9em',
        fontStyle: 'italic',
        textAlign: 'right',
        whiteSpace: 'nowrap',
    }
}));

const DocumentTable = ({ lang, documents }) => {
    const classes = useStyles()
    return (
        <table>
            <tbody>
            {documents.length > 0 ? documents.map(doc => (
                <tr onClick={() => window.open(doc.file.link, '_blank')} key={doc.file.link} style={{cursor: 'pointer'}}>
                    <td className={classes.label}>
                        <CloudDownloadIcon style={{marginRight: '10px'}} />
                        <div>
                            {doc.label}
                            <Hidden smUp>
                                <br />
                                <span>{formatDate(doc.date)}</span>
                            </Hidden>
                        </div>
                    </td>
                    <Hidden xsDown>
                        <td className={classes.date}>
                            {translations(lang, 'pubblicatoIl').toLowerCase()} {formatDate(doc.date)}
                        </td>
                    </Hidden>
                </tr>
            )) : <tr><td><i>{translations(lang, 'noDocs')}</i></td></tr>}
            </tbody>
        </table>
    )
}

export default DocumentTable