import JupiterButton from "components/Jupiter/Button";

const Home = (): JSX.Element => {
  return (
    <>
      <JupiterButton />
      <JupiterButton on />
      <JupiterButton colour="cream" />
      <JupiterButton colour="yellow" />
      <JupiterButton colour="orange" />
      <JupiterButton colour="red" />
      <JupiterButton colour="green" />
      <JupiterButton colour="blue" />
    </>
  );
};

export default Home;
