import Jupiter from "components";
import MixcloudIsolatedTest from "components/MixcloudIsolatedTest";
import { useMixcloud } from "contexts/mixcloud";
import { JSX, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { DEBUG, GA4, GOOGLE_TRACKING_ID } from "utils/constants";

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
    // eslint-disable-next-line no-empty-pattern
    widget: {},
  } = useMixcloud();
  const [hasSeeked, setHasSeeked] = useState<boolean>(false);
  const [loadLatestProgress, setLoadLatestProgress] = useState<number>(0);

  /* Seek logic */
  useEffect(() => {
    if (!latestMcKey || hasSeeked || loadLatestProgress <= 60) return;

    const attemptSeek = async (): Promise<void> => {
      // Give more time for widget to be ready for seeking
      const maxAttempts = 5;
      let attempts = 0;

      const trySeek = async (): Promise<void> => {
        attempts += 1;
        try {
          const seekSuccessful = await handleSeek(loadLatestProgress);
          if (seekSuccessful) {
            setHasSeeked(true);
            if (DEBUG) console.log(`Seek successful on attempt ${attempts}`);
          } else if (attempts < maxAttempts) {
            if (DEBUG)
              console.log(
                `Seek failed, attempt ${attempts}/${maxAttempts}, retrying...`,
              );
            setTimeout(trySeek, 1000);
          } else if (DEBUG) console.warn("Seek failed after maximum attempts");
        } catch (error) {
          console.error(`Seek error on attempt ${attempts}:`, error);
          if (attempts < maxAttempts) {
            setTimeout(trySeek, 1000);
          }
        }
      };

      // Start seeking attempts after a small delay
      setTimeout(trySeek, 500);
    };

    attemptSeek();
  }, [latestMcKey, loadLatestProgress, handleSeek, hasSeeked]); // Removed 'playing' dependency

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

  return (
    <>
      {DEBUG && <MixcloudIsolatedTest />}
      <Jupiter />
    </>
  );
};

export default Home;
