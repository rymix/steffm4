import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

export const StyledModal = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 240px;
  min-width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;

  &.modal-open {
    opacity: 1;
    visibility: visible;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  &.modal-open + .modal-overlay {
    opacity: 1;
    visibility: visible;
  }
`;

export const StyledModalHeader = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.modal.countdown};
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
`;

export const StyledModalContent = styled.div`
  padding: 20px;
  text-align: center;
  flex-grow: 1;
`;

export const StyledCloseLink = styled(CloseIcon)`
  color: ${({ theme }) => theme.colors.modal.closeLink};
  cursor: pointer;
  font-size: 36px;

  &:hover {
    color: ${({ theme }) => theme.colors.modal.closeLinkHover};
  }
`;
