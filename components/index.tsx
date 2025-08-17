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
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

import Background from "./Background";
import BurgerMenu from "./BurgerMenu";
import DX7 from "./DX7";
import FloppyDiskStack from "./Floppy/FloppyDiskStack";
import { DiskLabel } from "./Floppy/types";
import Jupiter from "./Jupiter";
import UserManualCover from "./Manual/UserManualCover";
import Mixcloud from "./Mixcloud";
import Modal from "./Modal";
import Notebook from "./Notebook";
import Overlay from "./Overlay";
import ScrollIndicator from "./ScrollIndicator";
import Tooltip from "./Tooltip";

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
          {hasMounted ? (playerTheme === "DX7" ? <DX7 /> : <Jupiter />) : <Jupiter />}
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
