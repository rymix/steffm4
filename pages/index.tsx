import Jupiter from "components";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GOOGLE_TRACKING_ID } from "utils/constants";

const Home = (): JSX.Element => {
  useEffect(() => {
    if (!ReactGA.isInitialized) {
      ReactGA.initialize(GOOGLE_TRACKING_ID);
    }

    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home Page",
    });
  }, []);

  return <Jupiter />;
};

export default Home;
