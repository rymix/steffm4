import Background from "components/Background";
import BurgerMenu from "components/BurgerMenu";
import Dx7 from "components/Dx7";
import FloppyDiskStack from "components/Floppy/FloppyDiskStack";
import { DiskLabel } from "components/Floppy/types";
import Jupiter from "components/Jupiter";
import UserManualCover from "components/Manual/UserManualCover";
import Mixcloud from "components/Mixcloud";
import Modal from "components/Modal";
import Notebook from "components/Notebook";
import Overlay from "components/Overlay";
import ScrollIndicator from "components/ScrollIndicator";
import {
  StyledBottomGrid,
  StyledBottomPanel,
  StyledChild,
  StyledChildFloppy,
  StyledFixedBackground,
  StyledFixedForeground,
  StyledScrollContainer,
  StyledTopPanel,
} from "components/Styled";
import Tooltip from "components/Tooltip";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const StefFmPlayer: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const {
    mcKey,
    themes: { playerTheme },
    track: { details: trackDetails, sectionNumber: trackSectionNumber },
  } = useMixcloud();

  const [diskLabel, setDiskLabel] = useState<DiskLabel>();

  useEffect(() => {
    setDiskLabel({
      trackName: trackDetails?.trackName,
      artistName: trackDetails?.artistName,
    });
  }, [trackSectionNumber, trackDetails?.trackName]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <StyledFixedBackground>
        <Background />
        {mcKey && <Mixcloud />}
      </StyledFixedBackground>

      <StyledFixedForeground>
        <BurgerMenu />
        <Overlay />
        <Modal />
        <Tooltip />
        <ScrollIndicator />
      </StyledFixedForeground>

      <StyledScrollContainer>
        <StyledTopPanel>
          {hasMounted ? (
            playerTheme === "Dx7" ? (
              <Dx7 />
            ) : (
              <Jupiter />
            )
          ) : (
            <Jupiter />
          )}
        </StyledTopPanel>
        <StyledBottomPanel>
          <StyledBottomGrid>
            <StyledChild>
              <Notebook />
            </StyledChild>
            <StyledChild>
              <UserManualCover />
            </StyledChild>
            <StyledChildFloppy>
              {trackDetails && <FloppyDiskStack label={diskLabel} />}
            </StyledChildFloppy>
          </StyledBottomGrid>
        </StyledBottomPanel>
      </StyledScrollContainer>
    </>
  );
};

export default StefFmPlayer;
