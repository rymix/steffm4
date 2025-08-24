import Dx7Cartridge from "components/Dx7/Cartridge";
import Dx7Controls from "components/Dx7/Controls";
import Dx7ControlsSecondary from "components/Dx7/ControlsSecondary";
import Dx7FilterSelect from "components/Dx7/FilterSelect";
import Dx7Header from "components/Dx7/Header";
import Dx7MixcloudConnected from "components/Dx7/MixcloudConnected";
import Dx7MixTrackDisplay from "components/Dx7/MixTrackDisplay";
import Dx7Screen from "components/Dx7/Screen";
import {
  StyledDx7Case,
  StyledDx7CaseDark,
  StyledDx7CaseItem,
  StyledDx7CaseLight,
  StyledDx7CaseRow,
} from "components/Dx7/StyledDx7";
import Dx7Volume from "components/Dx7/Volume";
import Dx7Wrapper from "components/Dx7/Wrapper";

export const Dx7: React.FC = () => {
  return (
    <Dx7Wrapper>
      <StyledDx7Case>
        <Dx7MixcloudConnected />
        <Dx7Header />
        <StyledDx7CaseLight>
          {/* Row 1: Single Screen component - center aligned */}
          <StyledDx7CaseRow justifyContent="center" alignItems="center">
            <StyledDx7CaseItem>
              <Dx7Screen />
            </StyledDx7CaseItem>
          </StyledDx7CaseRow>
          {/* Row 2: Volume left, Controls and ControlsSecondary stacked right */}
          <StyledDx7CaseRow>
            <StyledDx7CaseItem flex="1">
              <Dx7Volume />
            </StyledDx7CaseItem>
            <StyledDx7CaseItem layout="vertical" flex="1" alignItems="center">
              <Dx7Controls />
              <Dx7ControlsSecondary />
            </StyledDx7CaseItem>
          </StyledDx7CaseRow>
        </StyledDx7CaseLight>
        <StyledDx7CaseDark>
          {/* Row 3: FilterSelect and Cartridge stacked left, MixTrackDisplay right */}
          <StyledDx7CaseRow>
            <StyledDx7CaseItem layout="vertical" flex="1" alignItems="center">
              <Dx7FilterSelect />
              <Dx7Cartridge />
            </StyledDx7CaseItem>
            <StyledDx7CaseItem flex="1">
              <Dx7MixTrackDisplay />
            </StyledDx7CaseItem>
          </StyledDx7CaseRow>
        </StyledDx7CaseDark>
      </StyledDx7Case>
    </Dx7Wrapper>
  );
};

export default Dx7;
