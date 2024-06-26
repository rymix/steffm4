import {
  StyledJupiterFrontPanel,
  StyledJupiterFrontPanelWrapper,
} from "components/Jupiter/Panel/FrontPanel/StyledJupiterFrontPanel";

const JupiterFrontPanel: React.FC = () => {
  return (
    <StyledJupiterFrontPanelWrapper>
      <StyledJupiterFrontPanel />
    </StyledJupiterFrontPanelWrapper>
  );
};

export default JupiterFrontPanel;
