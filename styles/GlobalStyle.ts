import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-display: swap;
    font-family: "dseg14";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/DSEG14Classic-Regular.woff2") format("woff2"), url("fonts/DSEG14Classic-Regular.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "edgar";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/OPTIEdgarExtended-Regular.woff2") format("woff2"), url("fonts/OPTIEdgarExtended-Regular.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "interface";
    font-style: normal;
    font-weight: normal;
    src: url("fonts/interface-Regular.woff2") format("woff2"), url("fonts/interface-Regular.woff") format("woff");
  }

  html,
  *,
  *::before,
  *::after {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
    user-select: none;
  }

  ul, ol {
    list-style: none;
  }

  body {
    --backgroundSVG: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeBlend mode='screen'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    font-family: ${({ theme }) => theme.formats.fontFamily.default};
    font-size: ${({ theme }) => theme.sizes.fontSize};
  }

  input,
  select,
  button {
    margin: 0.5em;
    padding: 0.5em;
  }

  input {
    background: ${({ theme }) => theme.colors.input.background.off};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    color: ${({ theme }) => theme.colors.input.text.off};
  }

  select {
    background: ${({ theme }) => theme.colors.select.background.off};
    border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    color: ${({ theme }) => theme.colors.select.text.off};
  }
`;

export default GlobalStyle;
