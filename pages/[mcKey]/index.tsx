import { useMixcloud } from "contexts/mixcloud";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DynamicRoute = (): null => {
  const router = useRouter();
  const { setMcKey } = useMixcloud();

  useEffect(() => {
    let { mcKey } = router.query;

    if (mcKey && typeof mcKey === "string") {
      // Remove leading and trailing slashes
      mcKey = mcKey.replaceAll(/^\/+|\/+$/g, "");

      setMcKey(mcKey);
      router.push("/");
    }
  }, [router, setMcKey]);

  return null;
};

export default DynamicRoute;
