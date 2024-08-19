import type { StyledJupiterCaseProps } from "components/Jupiter/Case/types";
import styled from "styled-components";

export const StyledJupiterCase = styled.div<StyledJupiterCaseProps>`
  margin: 20px;
  width: 100%;
  max-width: 1100px;
  min-width: 320px;
  z-index: 2;
  ${(props) =>
    props.$scale && props.$scale.y !== 1
      ? `transform: scale(${props.$scale.y});`
      : ""}

  /* PORTRAIT */
  @media screen and (orientation: portrait) and (max-width: 1100px) {
    max-width: 1100px;
    min-width: 480px;
  }

  @media screen and (orientation: portrait) and (max-width: 768px) {
    max-width: 480px;
    min-width: 320px;
  }

  @media screen and (orientation: portrait) and (max-width: 320px) {
    transform: scale(0.7);
  }
`;
