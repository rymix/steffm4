import {
  StyledJupiterTitle,
  StyledJupiterTitleWrapper,
} from "components/Jupiter/Title/StyledJupiterTitle";
import type { JupiterTitleProps } from "components/Jupiter/Title/types";

const JupiterTitle: React.FC<JupiterTitleProps> = ({ title }) => {
  return (
    <StyledJupiterTitleWrapper>
      <StyledJupiterTitle>{title}</StyledJupiterTitle>
    </StyledJupiterTitleWrapper>
  );
};

export default JupiterTitle;
