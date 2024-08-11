import { useMixcloud } from "contexts/mixcloud";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GOOGLE_TRACKING_ID } from "utils/constants";

const DynamicRoute = (): null => {
  const router = useRouter();
  const {
    controls: { handleLoad },
  } = useMixcloud();

  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready

    const { mcKey } = router.query;

    if (mcKey && typeof mcKey === "string") {
      // Remove leading and trailing slashes
      const cleanedMcKey = mcKey.replaceAll(/^\/+|\/+$/g, "");
      console.log("Redirect mcKey:", cleanedMcKey);
      handleLoad(cleanedMcKey);

      // Use replace to avoid adding a new history entry
      router
        .replace("/")
        .then(() => {
          // Initialize GA4 if not already initialized
          if (!ReactGA.isInitialized) {
            ReactGA.initialize(GOOGLE_TRACKING_ID);
          }

          // Send GA4 event
          ReactGA.event({
            category: "User",
            action: "Dynamic Route Redirect",
            label: cleanedMcKey,
          });
        })
        .catch((error) => {
          console.error("Failed to redirect:", error);
        });
    }
  }, [handleLoad, router.isReady, router.query, router]);

  return null;
};

export default DynamicRoute;
