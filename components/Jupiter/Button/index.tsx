import {
  StyledJupiterButton,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";

type JupiterButtonProps = {
  on?: boolean;
  colour?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
};

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  colour,
}) => {
  return (
    <StyledJupiterButton colour={colour}>
      <StyledJupiterLed on={on} />
    </StyledJupiterButton>
  );
};

export default JupiterButton;
