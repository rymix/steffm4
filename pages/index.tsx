import BurgerMenu from "components/BurgerMenu";
import MixCard from "components/MixCard";
import Mixcloud from "components/Mixcloud";
import TrackFlow from "components/TrackFlow";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";
import { mcKeyFormatter } from "utils/functions";

const Home = (): JSX.Element => {
  const {
    controls: { fetchRandomMcKey },
  } = useMixcloud();

  const [randomMcKey, setRandomMcKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchKey = async (): Promise<void> => {
      const key = await fetchRandomMcKey();
      const formattedKey = mcKeyFormatter(key);
      setRandomMcKey(formattedKey);
    };

    fetchKey();
  }, []);

  return (
    <>
      {randomMcKey && (
        <>
          <BurgerMenu />
          <TrackFlow />
          <Mixcloud defaultMcKey={randomMcKey} />
          <MixCard />
        </>
      )}
    </>
  );
};

export default Home;
