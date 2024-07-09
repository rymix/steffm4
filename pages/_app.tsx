// _app.tsx
import "react-material-symbols/sharp";

import Metadata from "components/pages/Metadata";
import StyledApp from "components/pages/StyledApp";
import { MixcloudProvider } from "contexts/mixcloud";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const router = useRouter();
  const [initialMcKey, setInitialMcKey] = useState<string | undefined>();

  useEffect(() => {
    console.log("Assessing router.query:", router.query);
    const { mcKey: queryMcKey } = router.query;
    console.log("queryMcKey", queryMcKey);
    if (queryMcKey && typeof queryMcKey === "string") {
      console.log(
        "setting initial mcKey",
        queryMcKey.replaceAll(/^\/+|\/+$/g, ""),
      );
      setInitialMcKey(queryMcKey.replaceAll(/^\/+|\/+$/g, ""));
    }
  }, [router.query]);

  return (
    <MixcloudProvider initialMcKey={initialMcKey}>
      <StyledApp>
        <Metadata />
        <Component {...pageProps} />
      </StyledApp>
    </MixcloudProvider>
  );
};

export default App;
