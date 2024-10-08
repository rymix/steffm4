import Jupiter from "components";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { GA4, GOOGLE_TRACKING_ID } from "utils/constants";

const Home = (): JSX.Element => {
  const {
    mcKey,
    setIsReady,
    controls: {
      handleLoad,
      handleLoadRandom,
      handleLoadRandomFavourite,
      handleSeek,
    },
    filters: { selectedCategory },
    history: { latestMcKey, latestProgress },
    widget: { playing },
  } = useMixcloud();
  const [hasSeeked, setHasSeeked] = useState<boolean>(false);
  const [loadLatestProgress, setLoadLatestProgress] = useState<number>(0);

  /* Seek logic */
  useEffect(() => {
    if (!latestMcKey || hasSeeked || loadLatestProgress <= 60) return;

    const attemptSeek = async (): Promise<void> => {
      if (playing) {
        try {
          await handleSeek(loadLatestProgress);
          setHasSeeked(true);
        } catch (error) {
          console.error("Error during seek:", error);
        }
      }
    };

    attemptSeek();
  }, [playing, latestMcKey, loadLatestProgress, handleSeek, hasSeeked]);

  /* Initial load */
  useEffect(() => {
    setLoadLatestProgress(latestProgress || 0);

    const handleInitialLoad = async (): Promise<void> => {
      if (mcKey) {
        handleLoad(mcKey);
      } else if (latestMcKey) {
        handleLoad(latestMcKey);
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

    if (GA4) {
      ReactGA.initialize(GOOGLE_TRACKING_ID);

      ReactGA.send({
        hitType: "pageview",
        page: "/",
        title: "Home Page",
      });
    }
  }, []);

  return <Jupiter />;
};

export default Home;
