import type {
  StyledJupiterPanelBorderProps,
  StyledJupiterPanelItemsProps,
  StyledJupiterPanelProps,
  StyledJupiterPanelWrapperProps,
} from "components/Jupiter/Panel/types";
import styled from "styled-components";
import { NOISE_BACKGROUND } from "utils/constants";

export const StyledJupiterPanelWrapper = styled.div<StyledJupiterPanelWrapperProps>`
  background: ${(props) =>
    props.$background === "panel"
      ? `#3c3c3b; background-image: url(${NOISE_BACKGROUND}); background-size: cover;`
      : "none"};

  zpadding: ${(props) => props.$padding ?? "10px"};
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
  background: linear-gradient(
    to right,
    white 0%,
    #c9c9c7 10%,
    #c9c9c7 90%,
    black 100%
  );
  width: 12px;
`;

export const StyledJupiterPanelContent = styled.div`
  width: 100%;
`;
