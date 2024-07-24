import Screen from "components/BackgroundSelect/Macintosh/Screen";
import {
  StyledCableContainer,
  StyledCableHole,
  StyledFoot,
  StyledInset,
  StyledLogo,
  StyledLogoText,
  StyledMacintosh,
  StyledMonitor,
  StyledMonitorInner,
  StyledOpening,
  StyledOpeningInner,
  StyledScreenCutout,
} from "components/BackgroundSelect/Macintosh/StyledMacintosh";

export const Macintosh: React.FC = () => {
  return (
    <StyledMacintosh>
      <StyledMonitor>
        <StyledMonitorInner>
          <StyledScreenCutout>
            <Screen />
          </StyledScreenCutout>
          <StyledLogo>
            <StyledLogoText>🏳️‍🌈</StyledLogoText>
          </StyledLogo>
          <StyledOpening>
            <StyledOpeningInner />
          </StyledOpening>
        </StyledMonitorInner>
      </StyledMonitor>
      <StyledFoot>
        <StyledInset />
        <StyledCableContainer>
          <StyledCableHole />
        </StyledCableContainer>
      </StyledFoot>
    </StyledMacintosh>
  );
};

export default Macintosh;
