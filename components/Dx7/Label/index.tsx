import {
  StyledDx7Label,
  StyledDx7LabelWrapper,
} from "components/Dx7/Label/StyledDx7Label";
import type { Dx7LabelProps } from "components/Dx7/Label/types";

const Dx7Label: React.FC<Dx7LabelProps> = ({
  label,
  paddingTop = 0,
  paddingBottom = 0,
  textColor = "white",
  size = "normal",
}) => {
  return (
    <StyledDx7LabelWrapper>
      <StyledDx7Label
        $paddingBottom={paddingBottom}
        $paddingTop={paddingTop}
        $textColor={textColor}
        $size={size}
      >
        {label}
      </StyledDx7Label>
    </StyledDx7LabelWrapper>
  );
};

export default Dx7Label;
