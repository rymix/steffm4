import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Microgramma';
    src: url('/fonts/Microgramma W01 Bold Extended.woff2') format('woff2'),
         url('/fonts/Microgramma W01 Bold Extended.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Sforzando';
    src: url('/fonts/Sforzando W00.woff2') format('woff2'),
         url('/fonts/Sforzando W00.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: "dseg7";
    src: url("fonts/DSEG7Classic-Regular.woff2") format("woff2"), url("fonts/DSEG7Classic-Regular.woff") format("woff");
    font-style: normal;
    font-weight: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "dseg14";
    src: url("fonts/DSEG14Classic-Regular.woff2") format("woff2"), url("fonts/DSEG14Classic-Regular.woff") format("woff");
    font-style: normal;
    font-weight: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Caveat';
    src: url('/fonts/Caveat-Regular.woff2') format('woff2'),
         url('/fonts/Caveat-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'IndieFlower';
    src: url('/fonts/IndieFlower-Regular.woff2') format('woff2'),
         url('/fonts/IndieFlower-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'ShadowsIntoLight';
    src: url('/fonts/ShadowsIntoLightTwo-Regular.woff2') format('woff2'),
         url('/fonts/ShadowsIntoLightTwo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'GloriaHallelujah';
    src: url('/fonts/GloriaHallelujah-Regular.woff2') format('woff2'),
         url('/fonts/GloriaHallelujah-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Determination';
    src: url('/fonts/Determination-Sans-Web-Regular.woff2') format('woff2'),
         url('/fonts/Determination-Sans-Web-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  html,
  *,
  *::before,
  *::after {
    border: 0;
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    outline: 0;
    padding: 0;
    user-select: none;
  }

  body {
    background: white;
    font-family: 'Microgamma', sans-serif;
    font-weight: 400;
    overscroll-behavior: none;
  }

  html, body {
    overscroll-behavior: none;
    overflow: hidden;

  }
`;

export default GlobalStyle;
