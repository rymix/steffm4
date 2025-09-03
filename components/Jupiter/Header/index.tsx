import {
  StyledJupiterHeaderWrapper,
  StyledJupiterSlats,
  StyledJupiterTitle,
} from "components/Jupiter/Header/StyledJupiterHeader";
import MixcloudConnected from "components/MixcloudConnected";

const JupiterHeader: React.FC = () => {
  return (
    <StyledJupiterHeaderWrapper>
      <MixcloudConnected
        style={{ top: "-20px", left: "10px", position: "relative" }}
      />
      <StyledJupiterSlats />
      <StyledJupiterTitle>Stef.fM</StyledJupiterTitle>
    </StyledJupiterHeaderWrapper>
  );
};

export default JupiterHeader;
