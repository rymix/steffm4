import Jupiter from "components";
import MixcloudIsolatedTest from "components/MixcloudIsolatedTest";
import { JSX } from "react";
import { DEBUG } from "utils/constants";

const Home = (): JSX.Element => {
  // Initial load and seeking logic has been moved to useMixcloudContextState hook

  return (
    <>
      {DEBUG && <MixcloudIsolatedTest />}
      <Jupiter />
    </>
  );
};

export default Home;
