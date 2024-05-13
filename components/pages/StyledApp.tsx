import { MixcloudConsumer } from "contexts/mixcloud";
import { SessionConsumer } from "contexts/session";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import themes from "styles/themes";

type StyledAppProps = {
  children: React.ReactNode;
};

const StyledApp = ({ children }: StyledAppProps): JSX.Element => (
  <SessionConsumer>
    {({ themeName }) => (
      <MixcloudConsumer>
        {() => (
          <ThemeProvider theme={themes[themeName] || themes.defaultTheme}>
            <GlobalStyle />
            {children}
          </ThemeProvider>
        )}
      </MixcloudConsumer>
    )}
  </SessionConsumer>
);

export default StyledApp;
