import type {
  StyledJupiterPanelBorderProps,
  StyledJupiterPanelItemsProps,
  StyledJupiterPanelProps,
} from "components/Jupiter/Panel/types";
import styled from "styled-components";
import { NOISE_BACKGROUND } from "utils/constants";

export const StyledJupiterPanel = styled.div<StyledJupiterPanelProps>`
  background: ${(props) =>
    props.$background
      ? `#3c3c3b; background-image: url(${NOISE_BACKGROUND}); background-size: cover;`
      : "none"};
  zpadding: ${(props) => props.$padding ?? "10px"};

  display: flex;
  flex-direction: row;
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
