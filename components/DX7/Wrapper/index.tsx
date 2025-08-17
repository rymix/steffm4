import { StyledDX7Wrapper } from "components/DX7/Wrapper/StyledDX7Wrapper";
import { DX7WrapperProps } from "components/DX7/Wrapper/types";

const DX7Wrapper: React.FC<DX7WrapperProps> = ({ children }) => {
  return <StyledDX7Wrapper>{children}</StyledDX7Wrapper>;
};

export default DX7Wrapper;
