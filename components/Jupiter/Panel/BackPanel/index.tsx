import {
  StyledJupiterBackPanel,
  StyledJupiterBackPanelPowerButton,
} from "components/Jupiter/Panel/BackPanel/StyledJupiterBackPanel";

const JupiterBackPanel: React.FC = () => {
  return (
    <StyledJupiterBackPanel>
      <StyledJupiterBackPanelPowerButton />
    </StyledJupiterBackPanel>
  );
};

export default JupiterBackPanel;
