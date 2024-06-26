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
  padding,
  background = true,
}) => {
  return (
    <StyledJupiterPanel $padding={padding} $background={background}>
      {title && <JupiterTitle title={title} />}
      <StyledJupiterPanelItems $align={align}>
        {children}
      </StyledJupiterPanelItems>
    </StyledJupiterPanel>
  );
};

export default JupiterPanel;
