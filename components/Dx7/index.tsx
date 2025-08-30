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
  StyledDx7CaseControlsContainer,
  StyledDx7CaseControlsRow,
  StyledDx7CaseDark,
  StyledDx7CaseFilterContainer,
  StyledDx7CaseFilterContainerContents,
  StyledDx7CaseFilterRow,
  StyledDx7CaseLight,
  StyledDx7CaseMixDisplayContainer,
  StyledDx7CaseScreenContainer,
  StyledDx7CaseScreenRow,
  StyledDx7CaseVolumeContainer,
} from "components/Dx7/StyledDx7";
import { useDeviceOrientation } from "components/Dx7/useDeviceOrientation";
import Dx7Volume from "components/Dx7/Volume";
import Dx7Wrapper from "components/Dx7/Wrapper";

export const Dx7: React.FC = () => {
  const { isPortrait, isMobile, windowWidth } = useDeviceOrientation();

  return (
    <Dx7Wrapper>
      <StyledDx7Case>
        {/* Header - always visible but may have reduced algorithm background on small screens */}
        <Dx7Header />
        <StyledDx7CaseLight>
          {/* Row 1: Screen component - responsive layout */}
          <StyledDx7CaseScreenRow>
            <StyledDx7CaseScreenContainer>
              <Dx7Screen />
            </StyledDx7CaseScreenContainer>
          </StyledDx7CaseScreenRow>
          {/* Row 2: Volume vs Controls - adjust flex ratios */}
          <StyledDx7CaseControlsRow>
            <StyledDx7CaseControlsContainer>
              <Dx7Controls />
              <Dx7ControlsSecondary />
            </StyledDx7CaseControlsContainer>
            <StyledDx7CaseVolumeContainer>
              <Dx7Volume />
              <Dx7ScreenControls />
            </StyledDx7CaseVolumeContainer>
          </StyledDx7CaseControlsRow>
        </StyledDx7CaseLight>
        <StyledDx7CaseDark>
          {/* Row 3: FilterSelect and Cartridge stacked left, MixTrackDisplay right */}
          <StyledDx7CaseFilterRow>
            <StyledDx7CaseFilterContainer>
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
      </StyledDx7Case>
    </Dx7Wrapper>
  );
};

export default Dx7;
