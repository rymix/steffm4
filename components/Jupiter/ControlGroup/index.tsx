import { StyledJupiterControlGroup } from "components/Jupiter/ControlGroup/StyledJupiterControlGroup";
import type { JupiterControlGroupProps } from "components/Jupiter/ControlGroup/types";

const JupiterControlGroup: React.FC<JupiterControlGroupProps> = ({
  children,
  pad,
}) => {
  return (
    <StyledJupiterControlGroup $pad={pad}>{children}</StyledJupiterControlGroup>
  );
};

export default JupiterControlGroup;
