import { StyledDx7Wrapper } from "components/Dx7/Wrapper/StyledDx7Wrapper";
import { DX7WrapperProps } from "components/Dx7/Wrapper/types";

const Dx7Wrapper: React.FC<DX7WrapperProps> = ({ children }) => {
  return <StyledDx7Wrapper>{children}</StyledDx7Wrapper>;
};

export default Dx7Wrapper;
