import Countdown from "components/Countdown";
import {
  StyledCloseLink,
  StyledCountdown,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalTitle,
} from "components/Modal/StyledModal";
import { useMixcloud } from "contexts/mixcloud";

// Adding hideChrome as a prop and defaulting to false
type ModalProps = {
  hideChrome?: boolean;
};

const Modal: React.FC<ModalProps> = () => {
  const {
    session: {
      handleCloseModal,
      modalHideChrome,
      modalOpen,
      modalRef,
      modalContent,
      modalTitle,
      secondsRemaining,
    },
  } = useMixcloud();

  return (
    <StyledModal $open={modalOpen} $hideChrome={modalHideChrome} ref={modalRef}>
      {!modalHideChrome && (
        <StyledModalHeader>
          {modalTitle && <StyledModalTitle>{modalTitle}</StyledModalTitle>}
          {secondsRemaining !== null && (
            <StyledCountdown>
              <Countdown seconds={secondsRemaining} />
            </StyledCountdown>
          )}
          <StyledCloseLink onClick={handleCloseModal} />
        </StyledModalHeader>
      )}

      <StyledModalContent $hideChrome={modalHideChrome}>
        {modalContent}
        {modalHideChrome && (
          <StyledCloseLink
            onClick={handleCloseModal}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          />
        )}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
