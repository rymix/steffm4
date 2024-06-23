import { StyledJupiterPanel } from "components/Jupiter/Panel/StyledJupiterPanel";
import type { JupiterPanelProps } from "components/Jupiter/Panel/types";

const JupiterPanel: React.FC<JupiterPanelProps> = ({ children }) => {
  return <StyledJupiterPanel>{children}</StyledJupiterPanel>;
};

export default JupiterPanel;
