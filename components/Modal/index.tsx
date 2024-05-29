import { useSession } from "contexts/session";

import { StyledModal } from "./StyledModal";

const Modal = () => {
  const { modalOpen, setModalOpen, modalRef } = useSession();

  return (
    <StyledModal
      className={`modal ${modalOpen ? "modal-open" : ""}`}
      ref={modalRef}
    >
      <div className="modal-content">
        <div>{modalOpen ? "true" : "false"}</div>
        <button onClick={() => setModalOpen(false)}>Close</button>
      </div>
    </StyledModal>
  );
};

export default Modal;
