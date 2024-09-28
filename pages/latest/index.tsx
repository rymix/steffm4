import { useMixcloud } from "contexts/mixcloud";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GA4, GOOGLE_TRACKING_ID } from "utils/constants";

const DynamicRoute = (): null => {
  const router = useRouter();
  const {
    mcKey,
    controls: { handleLoadLatest },
  } = useMixcloud();

  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready

    handleLoadLatest();

    // Use replace to avoid adding a new history entry
    router
      .replace("/")
      .then(() => {
        // Initialize GA4 if not already initialized
        if (!ReactGA.isInitialized) {
          ReactGA.initialize(GOOGLE_TRACKING_ID);
        }

        // Send GA4 event
        if (GA4) {
          ReactGA.event({
            category: "User",
            action: "Dynamic Route Redirect",
            label: `Load Latest: ${mcKey}`,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to redirect:", error);
      });
  }, [handleLoadLatest, router.isReady, router.query, router]);

  return null;
};

export default DynamicRoute;
