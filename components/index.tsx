import MixCard from "components/MixCard";
import Mixcloud from "components/Mixcloud";
import {
  BottomBlock,
  MiddleBlock,
  StyledContainer,
  TopBlock,
} from "components/Styles";
import TrackFlow from "components/TrackFlow";
import TrackSingle from "components/TrackSingle";
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
      {/* <Vignette />
      <GradientBackground />
      <Overlay />
      <BurgerMenu />
      <Modal /> */}

      {mcKey && (
        <StyledContainer>
          <TopBlock>{isMobile ? <TrackSingle /> : <TrackFlow />}</TopBlock>
          <MiddleBlock>
            <Mixcloud defaultMcKey={mcKey} />
          </MiddleBlock>
          <BottomBlock>
            <MixCard socials />
          </BottomBlock>
        </StyledContainer>
      )}
    </>
  );
};

export default MixcloudHomePage;
