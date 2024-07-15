import Jupiter from "components";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GOOGLE_TRACKING_ID } from "utils/constants";

const Home = (): JSX.Element => {
  const {
    mcKey,
    setIsReady,
    controls: { handleLoad, handleLoadRandom, handleLoadRandomFavourite },
    filters: { selectedCategory },
    history: { latestMcKey },
  } = useMixcloud();

  /* Initial load */
  useEffect(() => {
    console.log("latestMcKey", latestMcKey);
    const handleInitialLoad = async (): Promise<void> => {
      if (mcKey) {
        console.log("Already have a key, loading...");
        handleLoad(mcKey);
      } else if (latestMcKey) {
        console.log("No key, loading latest...");
        handleLoad(latestMcKey);
      } else if (selectedCategory && selectedCategory === "fav") {
        console.log("No key, loading random favourite...");
        handleLoadRandomFavourite();
      } else if (selectedCategory && selectedCategory !== "all") {
        console.log("No key, loading random by category...");
        handleLoadRandom(selectedCategory);
      } else {
        console.log("No key, loading random...");
        handleLoadRandom();
      }
    };

    handleInitialLoad();
    setIsReady(true);

    ReactGA.initialize(GOOGLE_TRACKING_ID);
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home Page",
    });
  }, []);

  return <Jupiter />;
};

export default Home;
