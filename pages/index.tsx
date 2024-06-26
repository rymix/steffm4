import JupiterButton from "components/Jupiter/Button";
import JupiterCase from "components/Jupiter/Case";
import JupiterControlGroup from "components/Jupiter/ControlGroup";
import JupiterHeader from "components/Jupiter/Header";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterPanel from "components/Jupiter/Panel";
import JupiterBackPanel from "components/Jupiter/Panel/BackPanel";
import JupiterFrontPanel from "components/Jupiter/Panel/FrontPanel";
import JupiterScreen from "components/Jupiter/Screen";
import JupiterSlider from "components/Jupiter/Slider";

const Home = (): JSX.Element => {
  return (
    <JupiterCase>
      <JupiterPanel padding="0" background={false}>
        <JupiterBackPanel />
      </JupiterPanel>
      <JupiterPanel align="right">
        <JupiterHeader />
      </JupiterPanel>
      <JupiterPanel title="Screen">
        <JupiterControlGroup>
          <JupiterScreen />
        </JupiterControlGroup>
      </JupiterPanel>
      <JupiterPanel title="Controls">
        <JupiterControlGroup>
          <JupiterKnob
            size={64}
            degrees={260}
            min={1}
            max={11}
            value={80}
            onChange={(value) => console.log("Knob 1 value:", value)}
          />
        </JupiterControlGroup>
        <JupiterControlGroup>
          <JupiterButton color="red" label="Stop" />
          <JupiterButton color="green" label="Play" />
        </JupiterControlGroup>
        <JupiterControlGroup>
          <JupiterButton color="cream" label="Prev" />
          <JupiterButton color="cream" label="Next" />
        </JupiterControlGroup>
        <JupiterControlGroup>
          <JupiterButton color="blue" label="Rand" />
        </JupiterControlGroup>
        <JupiterControlGroup>
          <JupiterSlider label="Volume" />
        </JupiterControlGroup>
      </JupiterPanel>
      <JupiterPanel padding="0" background={false}>
        <JupiterFrontPanel />
      </JupiterPanel>
    </JupiterCase>
  );
};

export default Home;
