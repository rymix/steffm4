import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Microgramma';
    src: url('/fonts/Microgramma W01 Bold Extended.woff2') format('woff2'),
         url('/fonts/Microgramma W01 Bold Extended.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Sforzando';
    src: url('/fonts/Sforzando W00.woff2') format('woff2'),
         url('Sforzando W00.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-display: swap;
    font-family: "dseg14";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/DSEG14Classic-Regular.woff2") format("woff2"), url("fonts/DSEG14Classic-Regular.woff") format("woff");
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
    perspective: 100px;
  }

  html, body {
    overscroll-behavior: none;
    overflow: hidden;

  }
`;

export default GlobalStyle;
