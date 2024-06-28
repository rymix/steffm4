import type {
  StyledJupiterPanelBorderProps,
  StyledJupiterPanelContentProps,
  StyledJupiterPanelItemsProps,
  StyledJupiterPanelProps,
  StyledJupiterPanelWrapperProps,
} from "components/Jupiter/Panel/types";
import { padding } from "polished";
import styled from "styled-components";

export const StyledJupiterPanelWrapper = styled.div<StyledJupiterPanelWrapperProps>`
  background: ${(props) =>
    props.$background === "panel" ? "#1c1c1b" : "none"};
  background-image: ${(props) =>
    props.$background === "panel" ? `url(textures/white-sand.png)` : "none"};
  overflow: hidden;

  ${(props) =>
    props.$background === "rear" &&
    `
    perspective: 300px;
  `}

  ${(props) =>
    props.$background === "front" &&
    `
    perspective: 1000px;
  `}

  display: flex;
  flex-direction: row;
`;

export const StyledJupiterPanel = styled.div<StyledJupiterPanelProps>`
  display: flex;
  width: 100%;

  ${(props) =>
    props.$background === "rear" &&
    `
    transform: rotateX(65deg);
    transform-origin: bottom;
  `}

  ${(props) =>
    props.$background === "front" &&
    `
    transform: rotateX(-65deg);
    transform-origin: top;
  `}
`;

export const StyledJupiterPanelItems = styled.div<StyledJupiterPanelItemsProps>`
  display: flex;
  justify-content: ${(props) => props.$align ?? "center"};
`;

export const StyledJupiterPanelBorder = styled.div<StyledJupiterPanelBorderProps>`
  ${({ $position }) =>
    $position === "left" &&
    `
    background: linear-gradient(
      to right,
      white 0%,
      #c9c9c7 10%,
      #c9c9c7 90%,
      black 100%
    );
    box-shadow: 10px 0 8px  rgba(0, 0, 0, 0.3);
  `}

  ${({ $position }) =>
    $position === "right" &&
    `
    background: linear-gradient(
      to right,
      white 0%,
      #c9c9c7 10%,
      #c9c9c7 90%,
      black 100%
    );
    box-shadow: -10px 0 8px  rgba(0, 0, 0, 0.3);
  `}

  width: 12px;
`;

export const StyledJupiterPanelContent = styled.div<StyledJupiterPanelContentProps>`
  ${({ $padding }) =>
    $padding &&
    `
    padding: ${padding}
  `}

  width: 100%;
`;
