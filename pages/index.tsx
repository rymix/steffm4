import JupiterButton from "components/Jupiter/Button";
import JupiterButtonGroup from "components/Jupiter/ButtonGroup";
import Knob from "components/Jupiter/Knob";
import JupiterSlider from "components/Jupiter/Slider";

const Home = (): JSX.Element => {
  return (
    <>
      <Knob
        size={36}
        degrees={260}
        min={1}
        max={11}
        value={80}
        color
        onChange={(value) => console.log("Knob 1 value:", value)}
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
      <JupiterSlider />
    </>
  );
};

export default Home;
