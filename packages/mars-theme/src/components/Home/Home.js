import React from 'react'
import {connect} from "frontity"
import {Button, Container} from "@material-ui/core"
import AlertBox from "./AlertBox";
import {pagesMap} from "../../config";
// import NewsGrid from "../Articles/NewsGrid";
// import NewsVerticalList from "../Articles/NewsVerticalList";
import translations from "../../translations";
import NewsGrid from "../Articles/NewsGrid";
import Strutture from "../Strutture/Strutture";

const Home = ({ state, actions, libraries }) => {
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    const {
        hpAlertIsActive,
        hpAlertTitle,
        hpAlertBody,
    } = post.acf

    const Html2React = libraries.html2react.Component;
    return  data.isReady ? (
        <>
            <Container>
                {hpAlertIsActive && (
                    <AlertBox
                        hpAlertIsActive={hpAlertIsActive}
                        hpAlertTitle={hpAlertTitle}
                        hpAlertBody={hpAlertBody}
                        Html2React={Html2React}
                    />
                )}
            </Container>
            <Container>
                <Strutture />
                <NewsGrid categorySlug="novita" slideMode />
                {/*<NewsVerticalList categorySlug="featured" />*/}
                <div style={{margin: '32px', textAlign: 'center'}}>
                    <Button
                        onClick={() => actions.router.set(state.theme.urlPrefix+'/news')}
                        color="primary"
                    >
                        {translations(state.theme.lang, 'tutteLeNotizie')}
                    </Button>
                </div>
            </Container>
        </>
    ) : null
}

export default connect(Home)