import { StyledOverlayProps } from "components/Overlay/types";
import styled from "styled-components";

export const StyledOverlay = styled.div<StyledOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;

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
`;
