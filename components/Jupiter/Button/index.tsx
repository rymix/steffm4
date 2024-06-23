import {
  StyledJupiterButton,
  StyledJupiterButtonWrapper,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";
import type { JupiterButtonProps } from "components/Jupiter/Button/types";
import JupiterLabel from "components/Jupiter/Label";

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  color,
  label,
  labelPosition = "above",
}) => {
  return (
    <StyledJupiterButtonWrapper>
      {labelPosition === "above" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
        />
      )}
      <StyledJupiterButton $color={color}>
        <StyledJupiterLed $on={on} />
      </StyledJupiterButton>
      {labelPosition === "below" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
        />
      )}
    </StyledJupiterButtonWrapper>
  );
};

export default JupiterButton;
