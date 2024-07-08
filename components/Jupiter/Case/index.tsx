import { StyledJupiterCase } from "components/Jupiter/Case/StyledJupiterCase";
import type { JupiterCaseProps } from "components/Jupiter/Case/types";
import { useMixcloud } from "contexts/mixcloud";

const JupiterCase: React.FC<JupiterCaseProps> = ({ children }) => {
  const {
    session: { scale },
  } = useMixcloud();

  return <StyledJupiterCase $scale={scale}>{children}</StyledJupiterCase>;
};

export default JupiterCase;
