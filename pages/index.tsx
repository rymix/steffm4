import BurgerMenu from "components/BurgerMenu";
import MixCard from "components/MixCard";
import Mixcloud from "components/Mixcloud";
import TrackFlow from "components/TrackFlow";
import TrackSingle from "components/TrackSingle";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import { useEffect, useState } from "react";
import { mcKeyFormatter } from "utils/functions";

const Home = (): JSX.Element => {
  const {
    controls: { fetchRandomMcKey, fetchRandomMcKeyByCategory },
    filters: { selectedCategory },
  } = useMixcloud();

  const [randomMcKey, setRandomMcKey] = useState<string | null>(null);
  const { isMobile } = useSession();

  useEffect(() => {
    const fetchKey = async (): Promise<void> => {
      const key = selectedCategory
        ? await fetchRandomMcKeyByCategory(selectedCategory)
        : await fetchRandomMcKey();
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
          {isMobile ? <TrackSingle /> : <TrackFlow />}

          <Mixcloud defaultMcKey={randomMcKey} />
          <MixCard />
        </>
      )}
    </>
  );
};

export default Home;
