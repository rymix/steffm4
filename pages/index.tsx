import Background from "components/Background";
import BurgerMenu from "components/BurgerMenu";
import FrostedGlass from "components/FrostedGlass";
import MixCard from "components/MixCard";
import Mixcloud from "components/Mixcloud";
import Modal from "components/Modal";
import Overlay from "components/Overlay";
import TrackFlow from "components/TrackFlow";
import TrackSingle from "components/TrackSingle";
import Vignette from "components/Vignette";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import { useEffect, useState } from "react";
import { mcKeyFormatter } from "utils/functions";

const Home = (): JSX.Element => {
  const {
    mcKey,
    controls: { fetchRandomMcKey, fetchRandomMcKeyByCategory },
    filters: { selectedCategory },
  } = useMixcloud();

  const [randomMcKey, setRandomMcKey] = useState<string | null>(null);
  const { isMobile, modalOpen, menuOpen, setModalOpen } = useSession();

  useEffect(() => {
    const fetchKey = async (): Promise<void> => {
      const key = selectedCategory
        ? await fetchRandomMcKeyByCategory(selectedCategory)
        : await fetchRandomMcKey();
      const formattedKey = mcKeyFormatter(key);
      setRandomMcKey(formattedKey);
    };

    if (mcKey) {
      setRandomMcKey(mcKey);
    } else {
      fetchKey();
    }
  }, [mcKey, selectedCategory, fetchRandomMcKey, fetchRandomMcKeyByCategory]);

  return (
    <>
      <Vignette />
      <Background />
      <FrostedGlass />

      <Overlay />
      <BurgerMenu />
      <Modal />

      {randomMcKey && (
        <>
          {isMobile ? <TrackSingle /> : <TrackFlow />}
          <Mixcloud defaultMcKey={randomMcKey} />
          <MixCard />
        </>
      )}
    </>
  );
};

export default Home;
