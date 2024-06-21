import { StyledJupiterButtonGroup } from "./StyledJupiterButtonGroup";
import type { JupiterButtonGroupProps } from "./types";

const JupiterButtonGroup: React.FC<JupiterButtonGroupProps> = (props) => {
  const { children } = props;

  return <StyledJupiterButtonGroup>{children}</StyledJupiterButtonGroup>;
};

export default JupiterButtonGroup;
