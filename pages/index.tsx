import JupiterButton from "components/Jupiter/Button";
import JupiterButtonGroup from "components/Jupiter/ButtonGroup";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterSlider from "components/Jupiter/Slider";

const Home = (): JSX.Element => {
  return (
    <>
      <JupiterKnob
        size={36}
        degrees={260}
        min={1}
        max={11}
        value={80}
        onChange={(value) => console.log("Knob 1 value:", value)}
        label="Vol Con"
      />
      <JupiterButtonGroup>
        <JupiterButton />
        <JupiterButton on />
        <JupiterButton colour="cream" label="Play" />
        <JupiterButton colour="yellow" label="Pause" />
        <JupiterButton colour="orange" label="Next" />
        <JupiterButton colour="red" label="Prev Track" />
        <JupiterButton colour="green" />
        <JupiterButton colour="blue" />
      </JupiterButtonGroup>
      <JupiterSlider label="Slider" />
    </>
  );
};

export default Home;
