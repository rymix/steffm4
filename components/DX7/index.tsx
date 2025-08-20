import Dx7Controls from "components/Dx7/Controls";
import Dx7Header from "components/Dx7/Header";
import Dx7Screen from "components/Dx7/Screen";
import { StyledDx7Case } from "components/Dx7/StyledDx7";
import Dx7Wrapper from "components/Dx7/Wrapper";

export const Dx7: React.FC = () => {
  return (
    <Dx7Wrapper>
      <StyledDx7Case>
        <Dx7Header />
        <Dx7Controls />
        <Dx7Screen />
      </StyledDx7Case>
    </Dx7Wrapper>
  );
};

export default Dx7;
