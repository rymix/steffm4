import {
  StyledJupiterPanel,
  StyledJupiterPanelItems,
} from "components/Jupiter/Panel/StyledJupiterPanel";
import type { JupiterPanelProps } from "components/Jupiter/Panel/types";
import JupiterTitle from "components/Jupiter/Title";

const JupiterPanel: React.FC<JupiterPanelProps> = ({
  children,
  title,
  align,
}) => {
  return (
    <StyledJupiterPanel>
      {title && <JupiterTitle title={title} />}
      <StyledJupiterPanelItems $align={align}>
        {children}
      </StyledJupiterPanelItems>
    </StyledJupiterPanel>
  );
};

export default JupiterPanel;
