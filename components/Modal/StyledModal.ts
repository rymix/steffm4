import CloseIcon from "@mui/icons-material/Close";
import { StyledModalProps } from "components/Modal/types";
import styled from "styled-components";

export const StyledModal = styled.div<StyledModalProps>`
  background: #f6f4ef;
  background-image: url("textures/rice-paper-2.png");

  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 80vh;
  min-height: 240px;
  min-width: 320px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 60;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  width: ${(props) =>
    props.$hideChrome ? "640px" : "clamp(320px, 80%, 60vw)"};

  ${(props) =>
    props.$open === false &&
    `
      opacity: 0;
      visibility: hidden;
    `}

  ${(props) =>
    props.$open === true &&
    `
      opacity: 1;
      visibility: visible;
    `}

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
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
`;

export const StyledModalTitle = styled.div`
  font-weight: 700;
  padding-left: 10px;
  width: 100%;
`;

export const StyledCountdown = styled.div`
  color: ${({ theme }) => theme.colors.modal.countdown};
`;

export const StyledModalContent = styled.div<{ $hideChrome?: boolean }>`
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  padding: ${({ $hideChrome }) => ($hideChrome ? "0" : "20px")};
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
