import {
  StyledCloseLink,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
} from "components/Modal/StyledModal";
import { useSession } from "contexts/session";

const Modal = () => {
  const { modalOpen, setModalOpen, modalRef, modalContent } = useSession();

  return (
    <StyledModal
      className={`modal ${modalOpen ? "modal-open" : ""}`}
      ref={modalRef}
    >
      <StyledModalHeader>
        <div /> {/* Empty div to push close link to the right */}
        <StyledCloseLink onClick={() => setModalOpen(false)} />
      </StyledModalHeader>
      <StyledModalContent>{modalContent}</StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
