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

const Modal: React.FC = () => {
  const {
    session: {
      handleCloseModal,
      modalOpen,
      modalRef,
      modalContent,
      modalTitle,
      secondsRemaining,
    },
  } = useMixcloud();

  return (
    <StyledModal $open={modalOpen} ref={modalRef}>
      <StyledModalHeader>
        {modalTitle && <StyledModalTitle>{modalTitle}</StyledModalTitle>}
        {secondsRemaining !== null && (
          <StyledCountdown>
            <Countdown seconds={secondsRemaining} />
          </StyledCountdown>
        )}
        <StyledCloseLink onClick={handleCloseModal} />
      </StyledModalHeader>
      <StyledModalContent>{modalContent}</StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
