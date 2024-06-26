import {
  StyledJupiterBackPanel,
  StyledJupiterBackPanelWrapper,
} from "components/Jupiter/BackPanel/StyledJupiterBackPanel";
import type { JupiterCaseProps } from "components/Jupiter/Case/types";

const JupiterBackPanel: React.FC<JupiterCaseProps> = () => {
  return (
    <StyledJupiterBackPanelWrapper>
      <StyledJupiterBackPanel />
    </StyledJupiterBackPanelWrapper>
  );
};

export default JupiterBackPanel;
