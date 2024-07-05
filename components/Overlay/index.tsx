import { StyledOverlay } from "components/Overlay/StyledOverlay";
import { useMixcloud } from "contexts/mixcloud";

const Overlay: React.FC = () => {
  const {
    session: { menuOpen, modalOpen },
  } = useMixcloud();

  return <StyledOverlay className={modalOpen || menuOpen ? "visible" : ""} />;
};

export default Overlay;
