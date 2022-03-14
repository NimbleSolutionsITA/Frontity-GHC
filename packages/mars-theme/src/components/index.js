import React from "react";
import { Global, css, connect, Head } from "frontity";
import { ThemeProvider } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import Switch from "@frontity/components/switch";
import Header from "./Header/Header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import theme from './mui-theme';
import Home from "./Home/Home";
import Footer from "./Footer";
import Prestazioni from "./Prestazioni/Prestazioni";
import Doctors from "./Doctors/Doctors";
import Doctor from "./Doctors/Doctor";
import PracticalInfo from "./PracticalInfo/PracticalInfo";
import TuoTempo from "./TuoTempo/TuoTempo";
import Articles from "./Articles/Articles";
import Prestazione from "./Prestazioni/Prestazione";
import WorkWithUs from "./Articles/WorkWithUs";
import Newsletter from "./ Newsletter/Newsletter";
import CookieConsent from "./CookieConsent/CookieConsent";
import Prenota from "./Prenota/Prenota";
import Document from "./Documents/Document";
import Struttura from "./Strutture/Struttura";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const language = state.theme.lang;

  const isBrowser = typeof window !== undefined

  const cookies = new Cookies();

  return (
    <ThemeProvider theme={theme(state.theme.options.themeColor)}>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.theme.options.description} />
        <html lang={language} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap"/>
        {cookies.get('rcl_statistics_consent') && <script async src={`https://www.googletagmanager.com/gtag/js?id=${state.theme.options.analytics}`}/>}
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}

      <Header />


      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      {isBrowser && (
          <>
              <Switch>
                  <Loading when={data.isFetching} />
                  <Home when={state.theme.isHomepage} />
                  <Prestazioni when={state.theme.baseLink === '/prestazioni/'}/>
                  <Prestazione when={data.isPostType && data.type === 'services'} />
                  <Doctors when={data.isPostType && state.theme.baseLink === '/i-nostri-medici/'}/>
                  <Doctor when={data.isPostType && data.type === 'doctors'}/>
                  <Struttura when={data.isPostType && data.type === 'strutture'}/>
                  <PracticalInfo when={data.isPostType && (
                      state.theme.baseLink === '/info-pratiche/' ||
                      data.type === 'practical_info'
                  )}/>
                  <Prenota when={state.theme.baseLink === '/prenota/'} />
                  {/*<Articles when={state.theme.baseLink === '/news/'} />*/}
                  <Document when={data.isPostType && data.type === 'documents'}/>
                  <WorkWithUs when={state.theme.baseLink === '/lavora-con-noi/'} />
                  <List when={data.isArchive} />
                  <Post when={data.isPostType} />
                  <PageError when={data.isError} />
              </Switch>
              {!data.isFetching && <Footer />}
              <TuoTempo />
              {state.theme.baseLink !== '/privacy-policy-cookies/' && <CookieConsent />}
              {/*{cookies.get('rcl_consent_given') && <Newsletter />}*/}
          </>
      )}
    </ThemeProvider>
  );
}

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
  }

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  p {
    font-size: 16px;
    line-height: 24px;
  }

  h1 {
    font-size: 32px;
    line-height: 37px;
  }

  h3 {
    font-size: 24px;
    line-height: 28px;
  }

  h4 {
    font-size: 20px;
    line-height: 28px;
  }
  ul {
    padding-inline-start: 30px;
  }
  li {
    margin: 16px 0;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
  }
  
  td, th {
    padding: 16px;
  }
  
  thead tr, td.head {
    background-color: #375172;
  }
  
  thead td, td.head {
    color: white;
    border-color: white;
  }

  tr:nth-of-type(even) {
    background-color: #F5F9FC;
  }

  tr:hover {
    background-color: #dbe3e7;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #1f407d;
    color: white;
  }

  .downloadTable td {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .downloadTable tr > a {
    text-decoration: none;
    color: inherit;
  }

  @media only screen and (max-width: 960px) {
    p {
      font-size: 14px;
      line-height: 24px;
    }

    h1 {
      font-size: 28px;
      line-height: 32px;
    }

    h3 {
      font-size: 22px;
      line-height: 25px;
    }

    h4 {
      font-size: 18px;
      line-height: 24px;
    }
  }
`;
