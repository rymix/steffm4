import { StyledJupiterCase } from "components/Jupiter/Case/StyledJupiterCase";
import type { JupiterCaseProps } from "components/Jupiter/Case/types";

const JupiterCase: React.FC<JupiterCaseProps> = ({ children }) => {
  return <StyledJupiterCase>{children}</StyledJupiterCase>;
};

export default JupiterCase;
