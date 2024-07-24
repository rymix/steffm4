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
import { useMixcloud } from "contexts/mixcloud";

export const Macintosh: React.FC = () => {
  const {
    session: { scale },
  } = useMixcloud();

  return (
    <StyledMacintosh $scale={scale}>
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
