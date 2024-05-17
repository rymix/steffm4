import Catalogue from "components/Catalogue";
import Mixcloud from "components/Mixcloud";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";
import { mcKeyFormatter, mcKeyUrlFormatter } from "utils/functions";

const Home = (): JSX.Element => {
  const { fetchRandomMcKey } = useMixcloud();
  const [randomMcKey, setRandomMcKey] = useState<string | null>(null);
  const [randomMcKeyUrl, setRandomMcKeyUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchKey = async () => {
      const key = await fetchRandomMcKey();
      const formattedKey = mcKeyFormatter(key);
      const formattedUrl = mcKeyUrlFormatter(formattedKey);
      setRandomMcKey(formattedKey);
      setRandomMcKeyUrl(formattedUrl);
    };

    fetchKey();
  }, []);

  return (
    <>
      {randomMcKey && (
        <>
          <Mixcloud defaultMcKey={randomMcKey} defaultUrl={randomMcKeyUrl} />
          <Catalogue />
        </>
      )}
    </>
  );
};

export default Home;
