import Countdown from "components/Countdown";
import {
  StyledCloseLink,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
} from "components/Modal/StyledModal";
import { useSession } from "contexts/session";

const Modal: React.FC = () => {
  const { modalOpen, setModalOpen, modalRef, modalContent } = useSession();

  return (
    <StyledModal
      className={`modal ${modalOpen ? "modal-open" : ""}`}
      ref={modalRef}
    >
      <StyledModalHeader>
        <div />
        <Countdown />
        <StyledCloseLink onClick={() => setModalOpen(false)} />
      </StyledModalHeader>
      <StyledModalContent>{modalContent}</StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
