import { StyledJupiterPanelContent } from "components/Jupiter/Panel/StyledJupiterPanel";
import type { JupiterPanelContentProps } from "components/Jupiter/Panel/types";

const JupiterPanelContent: React.FC<JupiterPanelContentProps> = ({
  children,
  padding = null,
}) => (
  <StyledJupiterPanelContent $padding={padding}>
    {children}
  </StyledJupiterPanelContent>
);

export default JupiterPanelContent;
