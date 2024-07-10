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
  } = useMixcloud();

  /* Initial load */
  useEffect(() => {
    const handleInitialLoad = async (): Promise<void> => {
      if (mcKey) {
        handleLoad(mcKey);
      } else if (selectedCategory && selectedCategory === "fav") {
        handleLoadRandomFavourite();
      } else if (selectedCategory && selectedCategory !== "all") {
        handleLoadRandom(selectedCategory);
      } else {
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
