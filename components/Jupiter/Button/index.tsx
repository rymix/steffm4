import {
  StyledJupiterButton,
  StyledJupiterButtonWrapper,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";
import type { JupiterButtonProps } from "components/Jupiter/Button/types";
import JupiterLabel from "components/Jupiter/Label";

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  colour,
  label,
}) => {
  return (
    <StyledJupiterButtonWrapper>
      <JupiterLabel label={label} paddingTop={0} paddingBottom={10} />
      <StyledJupiterButton colour={colour}>
        <StyledJupiterLed on={on} />
      </StyledJupiterButton>
    </StyledJupiterButtonWrapper>
  );
};

export default JupiterButton;
