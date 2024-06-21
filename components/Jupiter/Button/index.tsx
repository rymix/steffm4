import {
  StyledJupiterButton,
  StyledJupiterButtonWrapper,
  StyledJupiterLabel,
  StyledJupiterLabelWrapper,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";
import type { JupiterButtonProps } from "components/Jupiter/Button/types";

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  colour,
  label,
}) => {
  return (
    <StyledJupiterButtonWrapper>
      <StyledJupiterLabelWrapper>
        <StyledJupiterLabel>{label}</StyledJupiterLabel>
      </StyledJupiterLabelWrapper>
      <StyledJupiterButton colour={colour}>
        <StyledJupiterLed on={on} />
      </StyledJupiterButton>
    </StyledJupiterButtonWrapper>
  );
};

export default JupiterButton;
