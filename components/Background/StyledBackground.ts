// components/Background/StyledBackground.ts

import { StyledBackgroundProps } from "components/Background/types";
import styled from "styled-components";

// Shared styles for both background layers (backgroundA and backgroundB)
const SharedBackgroundStyles = styled.div<StyledBackgroundProps>`
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 1;

  background-color: ${(props) =>
    props.$background
      ? props.$background.backgroundCategoryObject?.code === "table"
        ? "#795141"
        : "transparent"
      : "orange"};
  background-image: ${(props) =>
    props.$background
      ? `url(/${props.$background.backgroundCategoryObject?.folder}/${props.$background.fileName})`
      : "none"};
  background-size: ${(props) =>
    props.$background?.tileType === "stretch"
      ? "cover"
      : props.$background?.tileType === "tile"
        ? props.$background.backgroundCategoryObject?.code === "table"
          ? "600px"
          : `${props.$background.width}px ${props.$background.height}px`
        : "cover"};

  background-repeat: ${(props) =>
    props.$background?.tileType === "tile" ? "repeat" : "no-repeat"};
  background-position: center;

  transition: opacity 1.5s ease-in-out; /* Smooth transition for opacity */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle,
      transparent 70%,
      rgba(0, 0, 0, 0.8) 120%
    );
    pointer-events: none;
    z-index: 2;
  }

  &::after {
    background-color: rgba(255, 255, 255, 0);
    background-image: radial-gradient(
      circle farthest-side at 50% 70%,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
`;

// Export the two background layers
export const StyledBackgroundLayerA = styled(
  SharedBackgroundStyles,
)<StyledBackgroundProps>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
`;

export const StyledBackgroundLayerB = styled(
  SharedBackgroundStyles,
)<StyledBackgroundProps>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
`;
