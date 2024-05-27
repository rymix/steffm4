import { useMixcloud } from "contexts/mixcloud";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DynamicRoute = (): null => {
  const router = useRouter();
  const { setMcKey } = useMixcloud();

  useEffect(() => {
    if (!router.isReady) return; // Wait until router is ready

    const { mcKey } = router.query;

    if (mcKey && typeof mcKey === "string") {
      // Remove leading and trailing slashes
      const cleanedMcKey = mcKey.replaceAll(/^\/+|\/+$/g, "");

      setMcKey(cleanedMcKey);
      console.log("mcKey:", cleanedMcKey);

      // Use replace to avoid adding a new history entry
      router
        .replace("/")
        .then(() => {
          console.log("Redirected to home page");
        })
        .catch((error) => {
          console.error("Failed to redirect:", error);
        });
    } else {
      console.log("hello");
    }
  }, [router.isReady, router.query, setMcKey, router]);

  return null;
};

export default DynamicRoute;
