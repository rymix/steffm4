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
  StyledScreen,
  StyledScreenCutout,
} from "components/Macintosh/StyledMacintosh";
import { MacintoshProps } from "components/Macintosh/types";

export const Macintosh: React.FC<MacintoshProps> = ({ children }) => {
  return (
    <StyledMacintosh aria-label="1984 Macintosh illustration">
      <StyledMonitor>
        <StyledMonitorInner>
          <StyledScreenCutout>
            <StyledScreen>{children}</StyledScreen>
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
