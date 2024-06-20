import BurgerMenu from "components/BurgerMenu";
import GradientBackground from "components/GradientBackground";
import MixCard from "components/MixCard";
import Mixcloud from "components/Mixcloud";
import Modal from "components/Modal";
import Overlay from "components/Overlay";
import TrackFlow from "components/TrackFlow";
import TrackSingle from "components/TrackSingle";
import Vignette from "components/Vignette";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import { useEffect } from "react";
import { mcKeyFormatter } from "utils/functions";

const MixcloudHomePage = (): JSX.Element => {
  const {
    mcKey,
    setMcKey,
    controls: { fetchRandomMcKey, fetchRandomMcKeyByCategory },
    filters: { selectedCategory },
  } = useMixcloud();

  const { isMobile } = useSession();

  useEffect(() => {
    const fetchKey = async (): Promise<void> => {
      const key = selectedCategory
        ? await fetchRandomMcKeyByCategory(selectedCategory)
        : await fetchRandomMcKey();
      const formattedKey = mcKeyFormatter(key);
      setMcKey(formattedKey);
    };

    if (mcKey) {
      setMcKey(mcKey);
    } else {
      fetchKey();
    }
  }, [mcKey, selectedCategory, fetchRandomMcKey, fetchRandomMcKeyByCategory]);

  return (
    <>
      <Vignette />
      <GradientBackground />
      <Overlay />
      <BurgerMenu />
      <Modal />

      {mcKey && (
        <>
          {isMobile ? <TrackSingle /> : <TrackFlow />}
          <Mixcloud defaultMcKey={mcKey} />
          <MixCard socials />
        </>
      )}
    </>
  );
};

export default MixcloudHomePage;
