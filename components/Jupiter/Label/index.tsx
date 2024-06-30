import {
  StyledJupiterLabel,
  StyledJupiterLabelWrapper,
} from "components/Jupiter/Label/StyledJupiterLabel";
import type { JupiterLabelProps } from "components/Jupiter/Label/types";

const JupiterLabel: React.FC<JupiterLabelProps> = ({
  label,
  paddingTop = 0,
  paddingBottom = 0,
  textColor = "white",
}) => {
  return (
    <StyledJupiterLabelWrapper>
      <StyledJupiterLabel
        $paddingBottom={paddingBottom}
        $paddingTop={paddingTop}
        $textColor={textColor}
      >
        {label}
      </StyledJupiterLabel>
    </StyledJupiterLabelWrapper>
  );
};

export default JupiterLabel;
