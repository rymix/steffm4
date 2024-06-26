import {
  StyledJupiterHeaderWrapper,
  StyledJupiterSlats,
  StyledJupiterTitle,
} from "components/Jupiter/Header/StyledJupiterHeader";

const JupiterHeader: React.FC = () => {
  return (
    <StyledJupiterHeaderWrapper>
      <StyledJupiterSlats />
      <StyledJupiterTitle>Stef.FM</StyledJupiterTitle>
    </StyledJupiterHeaderWrapper>
  );
};

export default JupiterHeader;
