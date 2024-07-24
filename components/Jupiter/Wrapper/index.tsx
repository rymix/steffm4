import { StyledJupiterWrapper } from "components/Jupiter/Wrapper/StyledJupiterWrapper";
import { JupiterWrapperProps } from "components/Jupiter/Wrapper/types";

const JupiterWrapper: React.FC<JupiterWrapperProps> = ({ children }) => {
  return <StyledJupiterWrapper>{children}</StyledJupiterWrapper>;
};

export default JupiterWrapper;
