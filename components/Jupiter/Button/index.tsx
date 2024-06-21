import {
  StyledJupiterButton,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";
import type { JupiterButtonProps } from "components/Jupiter/Button/types";

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  colour,
}) => {
  return (
    <StyledJupiterButton colour={colour}>
      <StyledJupiterLed on={on} />
    </StyledJupiterButton>
  );
};

export default JupiterButton;
