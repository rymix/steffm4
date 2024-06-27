import JupiterPanelContent from "components/Jupiter/Panel/JupiterPanelContent";
import {
  StyledJupiterPanel,
  StyledJupiterPanelBorder,
  StyledJupiterPanelItems,
  StyledJupiterPanelWrapper,
} from "components/Jupiter/Panel/StyledJupiterPanel";
import type { JupiterPanelProps } from "components/Jupiter/Panel/types";
import JupiterTitle from "components/Jupiter/Title";

const JupiterPanel: React.FC<JupiterPanelProps> = ({
  children,
  title,
  align,
  padding,
  background = "panel",
}) => {
  return (
    <StyledJupiterPanelWrapper $padding={padding} $background={background}>
      <StyledJupiterPanel $background={background}>
        <StyledJupiterPanelBorder $position="left" />
        <JupiterPanelContent>
          {title && <JupiterTitle title={title} />}
          <StyledJupiterPanelItems $align={align}>
            {children}
          </StyledJupiterPanelItems>
        </JupiterPanelContent>
        <StyledJupiterPanelBorder $position="right" />
      </StyledJupiterPanel>
    </StyledJupiterPanelWrapper>
  );
};

export default JupiterPanel;
