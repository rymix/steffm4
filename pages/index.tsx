import JupiterButton from "components/Jupiter/Button";
import JupiterControlGroup from "components/Jupiter/ControlGroup";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterPanel from "components/Jupiter/Panel";
import JupiterSlider from "components/Jupiter/Slider";
import JupiterTitle from "components/Jupiter/Title";

const Home = (): JSX.Element => {
  return (
    <>
      <JupiterPanel>
        <JupiterTitle title="VCO Modulator" />
        <JupiterControlGroup>
          <JupiterKnob
            size={36}
            degrees={260}
            min={1}
            max={11}
            value={80}
            onChange={(value) => console.log("Knob 1 value:", value)}
            label="Vol Con"
          />
          <JupiterKnob
            size={36}
            degrees={260}
            min={1}
            max={11}
            value={80}
            onChange={(value) => console.log("Knob 2 value:", value)}
            label="Vol Con"
            labelPosition="below"
          />
          <JupiterButton />
          <JupiterButton on />
          <JupiterButton color="cream" label="Play" labelPosition="below" />
          <JupiterButton color="yellow" label="Pause" />
          <JupiterButton color="orange" label="Next" />
          <JupiterButton color="red" label="Prev Track" />
          <JupiterButton color="green" />
          <JupiterButton color="blue" />

          <JupiterSlider label="Slider" />
          <JupiterSlider label="Slider" labelPosition="below" />
        </JupiterControlGroup>
      </JupiterPanel>
    </>
  );
};

export default Home;
