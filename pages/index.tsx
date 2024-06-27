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
import JupiterTable from "components/Jupiter/Table";

const Home = (): JSX.Element => {
  return (
    <JupiterTable>
      <JupiterCase>
        <JupiterPanel padding="0" background="rear">
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
          <JupiterControlGroup pad="rightBig">
            <JupiterKnob
              size={92}
              degrees={220}
              min={1}
              max={5}
              value={1}
              onChange={(value) => console.log("Knob 1 value:", value)}
              steps
              labelVisible={false}
            />
          </JupiterControlGroup>
          <JupiterControlGroup pad="both">
            <JupiterButton color="red" label="Stop" />
            <JupiterButton color="green" label="Play" />
          </JupiterControlGroup>
          <JupiterControlGroup pad="right">
            <JupiterButton color="cream" label="Prev" />
            <JupiterButton color="cream" label="Next" />
          </JupiterControlGroup>
          <JupiterControlGroup pad="right">
            <JupiterButton color="blue" label="Rand" />
          </JupiterControlGroup>
          <JupiterControlGroup pad="right">
            <JupiterSlider label="Volume" />
          </JupiterControlGroup>
          <JupiterControlGroup>
            <JupiterButton color="orange" label="Info" />
            <JupiterButton color="orange" label="Share" />
          </JupiterControlGroup>
        </JupiterPanel>
        <JupiterPanel padding="0" background="front">
          <JupiterFrontPanel />
        </JupiterPanel>
      </JupiterCase>
    </JupiterTable>
  );
};

export default Home;
