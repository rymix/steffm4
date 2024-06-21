import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Microgramma';
    src: url('/fonts/Microgramma W01 Bold Extended.woff2') format('woff2'),
         url('/fonts/Microgramma W01 Bold Extended.woff') format('woff');
    font-weight: bold;
    font-style: normal;
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
`;

export default GlobalStyle;
