import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
    font-family: 'montserrat', sans-serif;
    font-weight: 400;
  }
`;

export default GlobalStyle;
