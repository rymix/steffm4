import {
  StyledJupiterPanel,
  StyledJupiterPanelBorder,
  StyledJupiterPanelContent,
  StyledJupiterPanelItems,
} from "components/Jupiter/Panel/StyledJupiterPanel";
import type {
  JupiterPanelContentProps,
  JupiterPanelProps,
} from "components/Jupiter/Panel/types";
import JupiterTitle from "components/Jupiter/Title";

const JupiterPanelContent: React.FC<JupiterPanelContentProps> = ({
  children,
}) => <StyledJupiterPanelContent>{children}</StyledJupiterPanelContent>;

const JupiterPanel: React.FC<JupiterPanelProps> = ({
  children,
  title,
  align,
  padding,
  background = true,
}) => {
  return (
    <StyledJupiterPanel $padding={padding} $background={background}>
      <StyledJupiterPanelBorder />
      <JupiterPanelContent>
        {title && <JupiterTitle title={title} />}
        <StyledJupiterPanelItems $align={align}>
          {children}
        </StyledJupiterPanelItems>
      </JupiterPanelContent>
      <StyledJupiterPanelBorder />
    </StyledJupiterPanel>
  );
};

export default JupiterPanel;
