import React, {useEffect} from "react";
import { Global, css, connect, Head } from "frontity";
import { ThemeProvider } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import Switch from "@frontity/components/switch";
import Header from "./Header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import theme from './mui-theme';
import Home from "./Home/Home";
import Footer from "./Footer";
import {pagesMap} from "../config";
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
    <ThemeProvider theme={theme}>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang={language} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,700;1,400;1,700&display=swap"/>
        {cookies.get('rcl_statistics_consent') && <script async src="https://www.googletagmanager.com/gtag/js?id=UA-64338762-21"/>}
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
                  <Home when={data.isPostType && state.router.link === pagesMap[0][language][1]} />
                  <Prestazioni when={state.router.link === pagesMap[1][language][1]}/>
                  <Prestazione when={data.isPostType && data.type === 'services'} />
                  <Doctors when={data.isPostType && state.router.link === pagesMap[6][language][1]}/>
                  <Doctor when={data.isPostType && data.type === 'doctors'}/>
                  <PracticalInfo when={data.isPostType && (
                      state.router.link === pagesMap[8][language][1] ||
                      data.type === 'practical_info'
                  )}/>
                  <Prenota when={state.router.link === '/prenota/'} />
                  <Articles when={state.router.link === pagesMap[5][language][1]} />
                  <WorkWithUs when={state.router.link === pagesMap[14][language][1]} />
                  <List when={data.isArchive} />
                  <Post when={data.isPostType} />
                  <PageError when={data.isError} />
              </Switch>
              {!data.isFetching && <Footer />}
              <TuoTempo />
              {/*{cookies.get('rcl_consent_given') && <Newsletter />}*/}
              <CookieConsent />
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
    border: 1px solid #1f407d;
    padding: 16px;
  }
  
  thead tr, td.head {
    background-color: #375172;
  }
  
  thead td, td.head {
    color: white;
    border-color: white;
  }

  tr:nth-child(even) {
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
    padding-left: 50px;

    &::before {
      position: absolute;
      top: 12px;
      left: 12px;
      content: "";
      background: url("data:image/svg+xml;utf8,
          <svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
              <path d='m20.5 24h-12c-1.378 0-2.5-1.121-2.5-2.5v-15c0-1.379 1.122-2.5 2.5-2.5h12c1.378 0 2.5 1.121 2.5 2.5v15c0 1.379-1.122 2.5-2.5 2.5zm-12-19c-.827 0-1.5.673-1.5 1.5v15c0 .827.673 1.5 1.5 1.5h12c.827 0 1.5-.673 1.5-1.5v-15c0-.827-.673-1.5-1.5-1.5z'/>
              <path d='m4.5 21h-1c-1.378 0-2.5-1.121-2.5-2.5v-16c0-1.379 1.122-2.5 2.5-2.5h12c1.378 0 2.5 1.121 2.5 2.5 0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.827-.673-1.5-1.5-1.5h-12c-.827 0-1.5.673-1.5 1.5v16c0 .827.673 1.5 1.5 1.5h1c.276 0 .5.224.5.5s-.224.5-.5.5z'/>
              <path d='m18.5 17h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z'/>
              <path d='m18.5 21h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z'/>
              <path d='m18.5 13h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z'/>
              <path d='m18.5 9h-8c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h8c.276 0 .5.224.5.5s-.224.5-.5.5z'/>
        </svg>
      ") no-repeat;
      height: 24px;
      width: 24px;
    }
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
