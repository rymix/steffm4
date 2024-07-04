import { StyledJupiterControlGroup } from "components/Jupiter/ControlGroup/StyledJupiterControlGroup";
import type { JupiterControlGroupProps } from "components/Jupiter/ControlGroup/types";

import JupiterTitle from "../Title";

const JupiterControlGroup: React.FC<JupiterControlGroupProps> = ({
  children,
  pad,
  title,
  direction = "row",
  grow = 0,
}) => {
  return (
    <StyledJupiterControlGroup $pad={pad} $direction={direction} $grow={grow}>
      {title && <JupiterTitle title={title} />}
      {children}
    </StyledJupiterControlGroup>
  );
};

export default JupiterControlGroup;
