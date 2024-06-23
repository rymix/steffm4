import { StyledJupiterControlGroup } from "components/Jupiter/ControlGroup/StyledJupiterControlGroup";
import type { JupiterControlGroupProps } from "components/Jupiter/ControlGroup/types";

const JupiterControlGroup: React.FC<JupiterControlGroupProps> = (props) => {
  const { children } = props;

  return <StyledJupiterControlGroup>{children}</StyledJupiterControlGroup>;
};

export default JupiterControlGroup;
