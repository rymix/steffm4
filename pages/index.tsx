import JupiterButton from "components/Jupiter/Button";
import JupiterButtonGroup from "components/Jupiter/ButtonGroup";

const Home = (): JSX.Element => {
  return (
    <JupiterButtonGroup>
      <JupiterButton />
      <JupiterButton on />
      <JupiterButton colour="cream" label="Play" />
      <JupiterButton colour="yellow" label="Pause" />
      <JupiterButton colour="orange" label="Next" />
      <JupiterButton colour="red" label="" />
      <JupiterButton colour="green" />
      <JupiterButton colour="blue" />
    </JupiterButtonGroup>
  );
};

export default Home;
