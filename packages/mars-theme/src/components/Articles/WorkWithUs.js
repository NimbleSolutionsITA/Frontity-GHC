import React, {useEffect, useState} from 'react'
import {
    Container,
    Typography,
} from "@material-ui/core";
import {connect, styled} from "frontity";
import Loading from "../loading";
import JobPostIcon from "../icons/JobPost";
import translations from "../../translations";

const WorkWithUs = ({state, libraries, actions}) => {
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    const date = new Date(post.date);
    const [jobPosts, setJobPosts] = useState(null)
    const Html2React = libraries.html2react.Component;
    const categories = {it: "166", en: "168"}

    useEffect(() => {
        async function fetchJobPosts() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { categories: categories[state.theme.lang], per_page: 40 },
            });
            const res = await libraries.source.populate({ response, state })
            return res.map(({id}) => state.source.post[id])
        }
        fetchJobPosts().then(cNews => setJobPosts(cNews))
    }, [state.theme.lang]);

    return (
        <Container>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1">{post.title.rendered}</Typography>
            <Html2React html={post.content.rendered}/>
            <table style={{margin: '32px 0'}}>
                <tbody>
                    {jobPosts ? jobPosts.map(jobPost => (
                        <tr onClick={() => actions.router.set(jobPost.link)} style={{cursor: 'pointer'}}>
                            <td width="50px"><JobPostIcon style={{fontSize: '50px'}} /></td>
                            <td>
                                <Typography color="primary" variant="h4"><b>{jobPost.title.rendered}</b></Typography>
                                <div>
                                    <DateWrapper>
                                        {" "}
                                        {translations(state.theme.lang, 'pubblicatoIl')} <b>{date.toLocaleDateString()}</b>
                                    </DateWrapper>
                                </div>
                                <Typography>{jobPost.acf.excerpt}</Typography>
                            </td>
                        </tr>
                    )) : <Loading />}
                </tbody>
            </table>
        </Container>
    )
}

export default connect(WorkWithUs)

const DateWrapper = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;