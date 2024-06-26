import type { JupiterCaseProps } from "components/Jupiter/Case/types";

import { StyledJupiterTable } from "./StyledJupiterTable";

const JupiterTable: React.FC<JupiterCaseProps> = ({ children }) => {
  return <StyledJupiterTable>{children}</StyledJupiterTable>;
};

export default JupiterTable;
