import {
  StyledDx7Header,
  StyledDx7HeaderLogo,
  StyledDx7HeaderMotto,
  StyledDx7HeaderSpacer,
} from "components/Dx7/Header/StyledDx7Header";
import { useDeviceOrientation } from "components/Dx7/useDeviceOrientation";

const Dx7Header: React.FC = () => {
  const { windowWidth, isMobile, isPortrait } = useDeviceOrientation();

  return (
    <StyledDx7Header>
      {/* <StyledDx7HeaderTitle>Yeeha</StyledDx7HeaderTitle> */}
      <StyledDx7HeaderLogo
        $windowWidth={windowWidth}
        $isMobile={isMobile}
        $isPortrait={isPortrait}
      />
      <StyledDx7HeaderMotto
        $windowWidth={windowWidth}
        $isMobile={isMobile}
        $isPortrait={isPortrait}
      >
        Funky House Coming In Your Ears
      </StyledDx7HeaderMotto>
      <StyledDx7HeaderSpacer
        $windowWidth={windowWidth}
        $isMobile={isMobile}
        $isPortrait={isPortrait}
      />
    </StyledDx7Header>
  );
};

export default Dx7Header;
