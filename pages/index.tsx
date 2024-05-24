import BurgerMenu from "components/BurgerMenu";
import CoverFlow from "components/CoverFlow";
import CurrentTrack from "components/CurrentTrack";
import MixCard from "components/MixCard";
import Mixcloud from "components/Mixcloud";
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

  const albumCovers = [
    { id: 1, component: <div>Album 1</div> },
    { id: 2, component: <div>Album 2</div> },
    { id: 3, component: <div>Album 3</div> },
    { id: 4, component: <div>Album 4</div> },
    { id: 5, component: <div>Album 5</div> },
    { id: 6, component: <div>Album 6</div> },
    { id: 7, component: <div>Album 7</div> },
    { id: 8, component: <div>Album 8</div> },
    { id: 9, component: <div>Album 9</div> },
    { id: 10, component: <div>Album 10</div> },
  ];

  return (
    <>
      {randomMcKey && (
        <>
          <BurgerMenu />
          <CoverFlow
            albumCovers={albumCovers}
            initialTrackIndex={0}
            precedingTracks={1}
            followingTracks={1}
          />

          <CurrentTrack />
          <Mixcloud defaultMcKey={randomMcKey} />
          <MixCard />
        </>
      )}
    </>
  );
};

export default Home;
