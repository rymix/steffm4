import BurgerMenu from "components/BurgerMenu";
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
import styled from "styled-components";
import { mcKeyFormatter } from "utils/functions";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const TopBlock = styled.div`
  background: rgba(255, 255, 0, 0.5);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 30%;

  @media (max-height: 600px) {
    max-height: 20%;
  }
`;

const MiddleBlock = styled.div`
  background: rgba(255, 128, 0, 0.5);
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    width: 100%;
    height: 100%;
    max-width: 800px;
    max-height: 800px;
    object-fit: contain;
  }
`;

const BottomBlock = styled.div`
  background: rgba(128, 128, 255, 0.5);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 30%;

  @media (max-height: 600px) {
    max-height: 20%;
  }
`;

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
      {/* <GradientBackground /> */}
      <Overlay />
      <BurgerMenu />
      <Modal />

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
