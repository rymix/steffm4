import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { GA4, GOOGLE_TRACKING_ID } from "utils/constants";
import { essentialLogger, logger } from "utils/logger";

const DynamicRoute = (): null => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready

    const { mcKey } = router.query;

    if (mcKey && typeof mcKey === "string") {
      const cleanedMcKey = mcKey.replaceAll(/^\/+|\/+$/g, "");
      const formattedMcKey = `/rymixxx/${cleanedMcKey}/`;

      logger.share("SHARE LINK APPROACH - Setting sessionStorage");
      logger.share("Raw mcKey:", cleanedMcKey);
      logger.share("Formatted mcKey:", formattedMcKey);

      // Store the formatted mcKey for the hook to pick up on initialization
      sessionStorage.setItem("shareLinkMcKey", formattedMcKey);

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
              label: cleanedMcKey,
            });
          }
        })
        .catch((error) => {
          essentialLogger.error("Failed to redirect:", error);
        });
    }
  }, [router.isReady, router.query.mcKey]); // Only depend on isReady and the mcKey itself

  return null;
};

export default DynamicRoute;
