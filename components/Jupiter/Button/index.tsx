import {
  StyledJupiterButton,
  StyledJupiterButtonLabel,
  StyledJupiterButtonLabelWrapper,
  StyledJupiterButtonWrapper,
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
      <StyledJupiterButtonLabelWrapper>
        <StyledJupiterButtonLabel>{label}</StyledJupiterButtonLabel>
      </StyledJupiterButtonLabelWrapper>
      <StyledJupiterButton colour={colour}>
        <StyledJupiterLed on={on} />
      </StyledJupiterButton>
    </StyledJupiterButtonWrapper>
  );
};

export default JupiterButton;
