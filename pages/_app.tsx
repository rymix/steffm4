// eslint-disable-next-line import/no-unresolved
import "react-material-symbols/sharp";

import Metadata from "components/pages/Metadata";
import StyledApp from "components/pages/StyledApp";
import { MixcloudProvider } from "contexts/mixcloud";
import { SessionProvider } from "contexts/session";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <SessionProvider>
    <MixcloudProvider>
      <StyledApp>
        <Metadata />
        <Component {...pageProps} />
      </StyledApp>
    </MixcloudProvider>
  </SessionProvider>
);

export default App;
