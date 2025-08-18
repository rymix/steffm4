import Dx7Controls from "./Controls";
import Dx7Header from "./Header";
import { StyledDx7Case } from "./StyledDx7";
import Dx7Wrapper from "./Wrapper";

export const Dx7: React.FC = () => {
  return (
    <Dx7Wrapper>
      <StyledDx7Case>
        <Dx7Header />
        <Dx7Controls />
      </StyledDx7Case>
    </Dx7Wrapper>
  );
};

export default Dx7;
