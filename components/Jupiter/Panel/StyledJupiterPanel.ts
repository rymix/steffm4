import type {
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
  padding: ${(props) => props.$padding ?? "10px"};
`;

export const StyledJupiterPanelItems = styled.div<StyledJupiterPanelItemsProps>`
  display: flex;
  justify-content: ${(props) => props.$align ?? "center"};
`;
