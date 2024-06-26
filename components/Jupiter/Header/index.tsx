import {
  StyledJupiterHeaderWrapper,
  StyledJupiterSlats,
  StyledJupiterTitle,
} from "./StyledJupiterHeader";

const JupiterHeader: React.FC = () => {
  return (
    <StyledJupiterHeaderWrapper>
      <StyledJupiterSlats />
      <StyledJupiterTitle>Stef.FM</StyledJupiterTitle>
    </StyledJupiterHeaderWrapper>
  );
};

export default JupiterHeader;
