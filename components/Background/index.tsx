import { StyledBackground } from "components/Background/StyledBackground";
import { useMixcloud } from "contexts/mixcloud";

const Background: React.FC = () => {
  const {
    session: { background },
  } = useMixcloud();

  return <StyledBackground $background={background} />;
};

export default Background;
