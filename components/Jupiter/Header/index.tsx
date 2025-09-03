import {
  StyledJupiterHeaderWrapper,
  StyledJupiterSlats,
  StyledJupiterTitle,
} from "components/Jupiter/Header/StyledJupiterHeader";
import JupiterMixcloudConnected from "components/MixcloudConnected";

const JupiterHeader: React.FC = () => {
  return (
    <StyledJupiterHeaderWrapper>
      <JupiterMixcloudConnected />
      <StyledJupiterSlats />
      <StyledJupiterTitle>Stef.fM</StyledJupiterTitle>
    </StyledJupiterHeaderWrapper>
  );
};

export default JupiterHeader;
