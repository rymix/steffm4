import { StyledOverlay } from "components/Overlay/StyledOverlay";
import { useSession } from "contexts/session";

const Overlay = () => {
  const { menuOpen, modalOpen } = useSession();

  return <StyledOverlay className={modalOpen || menuOpen ? "visible" : ""} />;
};

export default Overlay;
