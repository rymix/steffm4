import JupiterButton from "components/Jupiter/Button";
import JupiterControlGroup from "components/Jupiter/ControlGroup";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterSlider from "components/Jupiter/Slider";

const Home = (): JSX.Element => {
  return (
    <>
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
        <JupiterButton colour="cream" label="Play" labelPosition="below" />
        <JupiterButton colour="yellow" label="Pause" />
        <JupiterButton colour="orange" label="Next" />
        <JupiterButton colour="red" label="Prev Track" />
        <JupiterButton colour="green" />
        <JupiterButton colour="blue" />

        <JupiterSlider label="Slider" />
        <JupiterSlider label="Slider" labelPosition="below" />
      </JupiterControlGroup>
    </>
  );
};

export default Home;
