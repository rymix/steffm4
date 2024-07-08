import {
  StyledJupiterHeaderWrapper,
  StyledJupiterSlats,
  StyledJupiterTitle,
} from "components/Jupiter/Header/StyledJupiterHeader";

const JupiterHeader: React.FC = () => {
  return (
    <StyledJupiterHeaderWrapper>
      <StyledJupiterSlats />
      <StyledJupiterTitle>Stef.fM</StyledJupiterTitle>
    </StyledJupiterHeaderWrapper>
  );
};

export default JupiterHeader;
