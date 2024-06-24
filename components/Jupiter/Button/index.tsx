import {
  StyledJupiterButton,
  StyledJupiterButtonWrapper,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";
import type { JupiterButtonProps } from "components/Jupiter/Button/types";
import JupiterLabel from "components/Jupiter/Label";
import { useState } from "react";

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  color,
  label,
  labelPosition = "above",
  textColor = "white",
}) => {
  const [down, setDown] = useState();

  return (
    <StyledJupiterButtonWrapper>
      {labelPosition === "above" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
        />
      )}
      <StyledJupiterButton
        $color={color}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
      >
        <StyledJupiterLed $down={down} $on={on} />
      </StyledJupiterButton>
      {labelPosition === "below" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
        />
      )}
    </StyledJupiterButtonWrapper>
  );
};

export default JupiterButton;
