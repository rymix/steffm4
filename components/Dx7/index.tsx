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
  StyledDx7CaseDark,
  StyledDx7CaseItem,
  StyledDx7CaseLight,
  StyledDx7CaseRow,
} from "components/Dx7/StyledDx7";
import { useDeviceOrientation } from "components/Dx7/useDeviceOrientation";
import Dx7Volume from "components/Dx7/Volume";
import Dx7Wrapper from "components/Dx7/Wrapper";

export const Dx7: React.FC = () => {
  const { isSmallScreen, isPortrait } = useDeviceOrientation();

  return (
    <Dx7Wrapper>
      <StyledDx7Case>
        {/* Header - always visible but may have reduced algorithm background on small screens */}
        <Dx7Header />
        <StyledDx7CaseLight>
          {/* Row 1: Screen component - responsive layout */}
          <StyledDx7CaseRow alignItems="center" justifyContent="center">
            <StyledDx7CaseItem
              layout="horizontal"
              flex="1"
              alignItems="center"
              justifyContent="center"
            >
              <Dx7Screen />
              {/* Hide ScreenControls in portrait mode - they'll be moved inside */}
              {!isPortrait && <Dx7ScreenControls />}
            </StyledDx7CaseItem>
          </StyledDx7CaseRow>
          {/* Row 2: Volume vs Controls - adjust flex ratios */}
          <StyledDx7CaseRow>
            <StyledDx7CaseItem
              layout="vertical"
              flex={isPortrait ? "1" : "2 1 60%"}
              alignItems="flex-end"
            >
              <Dx7Controls />
              <Dx7ControlsSecondary />
            </StyledDx7CaseItem>
            <StyledDx7CaseItem
              layout="vertical"
              flex={isPortrait ? "0 0 auto" : "1 1 40%"}
              alignItems="flex-start"
              padding="0 0 20px 0"
            >
              <Dx7Volume />
              {/* In portrait mode, add ScreenControls vertically stacked with Volume */}
              {isPortrait && (
                <div style={{ marginTop: "10px" }}>
                  <Dx7ScreenControls />
                </div>
              )}
            </StyledDx7CaseItem>
          </StyledDx7CaseRow>
        </StyledDx7CaseLight>
        <StyledDx7CaseDark>
          {/* Row 3: FilterSelect and Cartridge stacked left, MixTrackDisplay right */}
          <StyledDx7CaseRow>
            <StyledDx7CaseItem
              layout="vertical"
              flex="1"
              alignItems="center"
              padding="20px 0"
            >
              {/* Hide Cartridge on small screens */}
              {!isSmallScreen && <Dx7Cartridge />}
              <Dx7FilterSelect />
            </StyledDx7CaseItem>
            <StyledDx7CaseItem
              layout="vertical"
              flex="1"
              alignItems="center"
              padding="30px 0 20px 0"
            >
              <Dx7MixTrackDisplay />
            </StyledDx7CaseItem>
          </StyledDx7CaseRow>
        </StyledDx7CaseDark>
      </StyledDx7Case>
    </Dx7Wrapper>
  );
};

export default Dx7;
