import styled, { keyframes } from "styled-components";

// Container for the disk stack
export const StyledDiskContainer = styled.div`
  background: green;
  position: relative;
  width: 290px; /* Match floppy disk size */
  height: 290px;
  margin: 0 auto;
`;

// Animation for tossing the disk
const tossAnimation = (
  startRotate: number,
  endRotate: number,
  finalX: number,
  finalY: number,
) => keyframes`
  0% {
    transform: translate(-1000px, -1000px) rotate(${startRotate}deg);
  }
  100% {
    transform: translate(${finalX}px, ${finalY}px) rotate(${endRotate}deg);
  }
`;

// Fade out animation for the oldest disk
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// Styled component for the animated disk
export const AnimatedDisk = styled.div<{
  index: number;
  startRotate: number;
  endRotate: number;
  finalX: number;
  finalY: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  z-index: ${(props) => props.index}; /* Ensure stacking order */

  animation: ${(props) =>
      tossAnimation(
        props.startRotate,
        props.endRotate,
        props.finalX,
        props.finalY,
      )}
    0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
`;

// Styled component for fading out the oldest disk
export const FadingDisk = styled.div`
  animation: ${fadeOut} 1s ease forwards;
`;
