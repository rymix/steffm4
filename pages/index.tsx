import Jupiter from "components";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GOOGLE_TRACKING_ID } from "utils/constants";

const Home = (): JSX.Element => {
  useEffect(() => {
    console.log("Initializing GA with ID:", GOOGLE_TRACKING_ID); // Log the initialization
    ReactGA.initialize(GOOGLE_TRACKING_ID, { debug: true });

    console.log("Sending pageview"); // Log the pageview send action
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home Page",
    });
  }, []);

  return <Jupiter />;
};

export default Home;
