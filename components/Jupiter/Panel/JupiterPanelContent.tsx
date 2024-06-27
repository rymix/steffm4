import { StyledJupiterPanelContent } from "components/Jupiter/Panel/StyledJupiterPanel";
import type { JupiterPanelContentProps } from "components/Jupiter/Panel/types";

const JupiterPanelContent: React.FC<JupiterPanelContentProps> = ({
  children,
}) => <StyledJupiterPanelContent>{children}</StyledJupiterPanelContent>;

export default JupiterPanelContent;
