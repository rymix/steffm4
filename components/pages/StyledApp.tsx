import { MixcloudConsumer } from "contexts/mixcloud";
import { JSX } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import themes from "styles/themes";

type StyledAppProps = {
  children: React.ReactNode;
};

const StyledApp = ({ children }: StyledAppProps): JSX.Element => (
  <MixcloudConsumer>
    {({ session: { themeName } }) => (
      <ThemeProvider theme={themes[themeName] || themes.defaultTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    )}
  </MixcloudConsumer>
);

export default StyledApp;
