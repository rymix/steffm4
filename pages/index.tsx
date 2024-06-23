import JupiterButton from "components/Jupiter/Button";
import JupiterButtonGroup from "components/Jupiter/ButtonGroup";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterSlider from "components/Jupiter/Slider";

const Home = (): JSX.Element => {
  return (
    <>
      <JupiterKnob />
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
      <JupiterSlider />
    </>
  );
};

export default Home;
