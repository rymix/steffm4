// components/Floppy/FloppyDiskStack/StyledFloppyDiskStack.ts

import styled, { keyframes } from "styled-components";

// Container for the disk stack
export const StyledDiskContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 1;

  /* @media (max-width: 700px) {
    transform: scale(0.6);
  } */
`;

// Animation for tossing the disk
const tossAnimation = (
  $startRotate: number,
  $endRotate: number,
  $finalX: number,
  $finalY: number,
  $startX: number,
): ReturnType<typeof keyframes> => keyframes`
  0% {
    transform: translate(${$startX}px, 100vh) rotate(${$startRotate}deg);
  }
  100% {
    ztransform: translate(${$finalX}px, ${$finalY}px) rotate(${$endRotate}deg);
    transform: translate(${$finalX}px, ${$finalY}px) rotate(0deg);
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
  $index: number;
  $startRotate: number;
  $endRotate: number;
  $finalX: number;
  $finalY: number;
  $startX: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform-origin: center;
  z-index: ${(props) => props.$index}; /* Ensure stacking order */

  animation: ${(props) =>
      tossAnimation(
        props.$startRotate,
        props.$endRotate,
        props.$finalX,
        props.$finalY,
        props.$startX,
      )}
    0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
`;

// Styled component for fading out the oldest disk
export const FadingDisk = styled.div`
  animation: ${fadeOut} 1s ease forwards;
`;
