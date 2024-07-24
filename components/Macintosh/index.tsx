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
  StyledScreenBanner,
  StyledScreenCutout,
  StyledScreenShadow,
} from "components/Macintosh/StyledMacintosh";
import { MacintoshProps } from "components/Macintosh/types";

export const Macintosh: React.FC<MacintoshProps> = ({ background }) => {
  return (
    <StyledMacintosh>
      <StyledMonitor>
        <StyledMonitorInner>
          <StyledScreenCutout>
            <StyledScreen $background={background}>
              <StyledScreenBanner>
                {background?.name || ""}{" "}
                {background?.backgroundCategoryObject?.name || ""}
              </StyledScreenBanner>
              <StyledScreenShadow />
            </StyledScreen>
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
