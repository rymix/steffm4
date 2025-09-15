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
import { useEffect } from "react";
import useSound from "use-sound";
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

  const [playClickUp] = useSound("/audio/click-up.mp3", {
    volume: 0.5,
  });
  const [playSwishOpen] = useSound("/audio/swish-open.mp3", {
    volume: 0.5,
  });
  const [playSwishClose2] = useSound("/audio/swish-close2.mp3", {
    volume: 0.5,
  });

  useEffect(() => {
    playSwishOpen();
  }, []);

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
          <StyledCloseLink
            onClick={handleCloseModal}
            onMouseDown={playClickUp}
            onMouseUp={playSwishClose2}
          />
        </StyledModalHeader>
      )}

      <StyledModalContent $hideChrome={modalHideChrome}>
        {modalContent}
        {modalHideChrome && (
          <StyledCloseLink
            onClick={handleCloseModal}
            onMouseDown={playClickDown}
            onMouseUp={playSwishClose2}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          />
        )}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
