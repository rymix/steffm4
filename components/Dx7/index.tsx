import Dx7BackPanel from "components/Dx7/BackPanel";
import Dx7Cartridge from "components/Dx7/Cartridge";
import Dx7Controls from "components/Dx7/Controls";
import Dx7ControlsSecondary from "components/Dx7/ControlsSecondary";
import Dx7FilterSelect from "components/Dx7/FilterSelect";
import Dx7Header from "components/Dx7/Header";
import Dx7MixTrackDisplay from "components/Dx7/MixTrackDisplay";
import Dx7Screen from "components/Dx7/Screen";
import Dx7ScreenControls from "components/Dx7/ScreenControls";
import {
  StyledDx7Case,
  StyledDx7CaseBorder,
  StyledDx7CaseControlsContainer,
  StyledDx7CaseControlsRow,
  StyledDx7CaseDark,
  StyledDx7CaseFilterContainer,
  StyledDx7CaseFilterContainerContents,
  StyledDx7CaseFilterRow,
  StyledDx7CaseLight,
  StyledDx7CaseMixDisplayContainer,
  StyledDx7CaseRearPanel,
  StyledDx7CaseScreenContainer,
  StyledDx7CaseScreenRow,
  StyledDx7CaseVolumeContainer,
} from "components/Dx7/StyledDx7";
import Dx7Volume from "components/Dx7/Volume";
import Dx7Wrapper from "components/Dx7/Wrapper";
import { useDeviceOrientation } from "hooks/useDeviceOrientation";

import Dx7BottomPanel from "./BottomPanel";

const Dx7CaseLight: React.FC = () => {
  const {
    isPortrait,
    isMobile,
    isSkinnyWideMode,
    isTallWideMode,
    windowWidth,
  } = useDeviceOrientation();

  return (
    <StyledDx7CaseLight>
      {/* Row 1: Screen component - responsive layout */}
      <StyledDx7CaseScreenRow>
        <StyledDx7CaseScreenContainer>
          <Dx7Screen />
        </StyledDx7CaseScreenContainer>
      </StyledDx7CaseScreenRow>
      {/* Row 2: Volume vs Controls - adjust flex ratios */}
      <StyledDx7CaseControlsRow
        $windowWidth={windowWidth}
        $isMobile={isMobile}
        $isPortrait={isPortrait}
      >
        <StyledDx7CaseControlsContainer
          $windowWidth={windowWidth}
          $isMobile={isMobile}
          $isPortrait={isPortrait}
        >
          <Dx7Controls />
          <Dx7ControlsSecondary />
        </StyledDx7CaseControlsContainer>
        <StyledDx7CaseVolumeContainer
          $windowWidth={windowWidth}
          $isMobile={isMobile}
          $isPortrait={isPortrait}
        >
          <Dx7Volume />
          {isSkinnyWideMode || isTallWideMode ? (
            <Dx7FilterSelect />
          ) : (
            <Dx7ScreenControls />
          )}
        </StyledDx7CaseVolumeContainer>
      </StyledDx7CaseControlsRow>
    </StyledDx7CaseLight>
  );
};

const Dx7CaseDark: React.FC = () => {
  const { isPortrait, isMobile, windowWidth } = useDeviceOrientation();

  return (
    <StyledDx7CaseDark>
      {/* Row 3: FilterSelect and Cartridge stacked left, MixTrackDisplay right */}
      <StyledDx7CaseFilterRow>
        <StyledDx7CaseFilterContainer
          $windowWidth={windowWidth}
          $isMobile={isMobile}
          $isPortrait={isPortrait}
        >
          <StyledDx7CaseFilterContainerContents>
            <Dx7Cartridge />
            <Dx7FilterSelect />
          </StyledDx7CaseFilterContainerContents>
        </StyledDx7CaseFilterContainer>
        {windowWidth > 900 && (
          <StyledDx7CaseMixDisplayContainer>
            <Dx7MixTrackDisplay />
          </StyledDx7CaseMixDisplayContainer>
        )}
      </StyledDx7CaseFilterRow>
    </StyledDx7CaseDark>
  );
};

const Dx7CaseBackPanel: React.FC = () => {
  return (
    <StyledDx7CaseDark $background="rear">
      <StyledDx7CaseRearPanel>
        <StyledDx7CaseBorder $position="left" />
        <Dx7BackPanel />
        <StyledDx7CaseBorder $position="right" />
      </StyledDx7CaseRearPanel>
    </StyledDx7CaseDark>
  );
};

const Dx7CaseBottomPanel: React.FC = () => {
  return (
    <StyledDx7CaseDark $background="bottom">
      <StyledDx7CaseRearPanel $isBottom>
        <StyledDx7CaseBorder $position="left" />
        <Dx7BottomPanel />
        <StyledDx7CaseBorder $position="right" />
      </StyledDx7CaseRearPanel>
    </StyledDx7CaseDark>
  );
};

export const Dx7: React.FC = () => {
  const {
    isPortrait,
    isMobile,
    isSkinnyWideMode,
    isTallWideMode,
    windowWidth,
  } = useDeviceOrientation();

  return (
    <Dx7Wrapper>
      <StyledDx7Case
        $windowWidth={windowWidth}
        $isMobile={isMobile}
        $isPortrait={isPortrait}
      >
        {/* Header - always visible but may have reduced algorithm background on small screens */}
        <Dx7CaseBackPanel />
        <Dx7Header />
        <Dx7CaseLight />
        {!isSkinnyWideMode && !isTallWideMode && <Dx7CaseDark />}
        <Dx7CaseBottomPanel />
      </StyledDx7Case>
    </Dx7Wrapper>
  );
};

export default Dx7;
