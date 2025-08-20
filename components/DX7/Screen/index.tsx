import { useMixcloud } from "contexts/mixcloud";
import { StyledDx7Screen } from "./StyledDx7Screen";

const Dx7Screen: React.FC = () => {
  const {
    screen: { holdingMessage, temporaryMessage, setTemporaryMessage },
    session: { displayLength },
    widget: { playing },
    track: { details: trackDetails },
  } = useMixcloud();

  return <StyledDx7Screen>{holdingMessage}</StyledDx7Screen>;
};

export default Dx7Screen;
