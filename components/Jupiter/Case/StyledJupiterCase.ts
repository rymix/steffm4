import type { StyledJupiterCaseProps } from "components/Jupiter/Case/types";
import styled from "styled-components";

export const StyledJupiterCase = styled.div<StyledJupiterCaseProps>`
  margin: 20px;
  width: 100%;
  max-width: 1100px;
  min-width: 320px;
  z-index: 2;

  /* PORTRAIT */
  @media screen and (orientation: portrait) and (max-width: 1100px) {
    max-width: 1100px;
    min-width: 480px;
    transform: scale(0.9);
  }

  @media screen and (orientation: portrait) and (max-width: 768px) {
    max-width: 480px;
    min-width: 320px;
    transform: scale(0.9);
  }

  @media screen and (orientation: portrait) and (max-width: 420px) {
    transform: scale(0.8);
  }

  @media screen and (orientation: portrait) and (max-width: 320px) {
    transform: scale(0.7);
  }

  /* LANDSCAPE */
  @media screen and (orientation: landscape) and (min-width: 1100px) {
    width: 1100px;
    transform: scale(0.6);
  }

  @media screen and (orientation: landscape) and (max-width: 1100px) {
    max-width: 1100px;
    min-width: 480px;
    transform: scale(0.5);
  }

  @media screen and (orientation: landscape) and (max-width: 768px) {
    max-width: 480px;
    min-width: 320px;
    transform: scale(0.4);
  }

  @media screen and (orientation: landscape) and (max-width: 420px) {
    transform: scale(0.4);
  }

  @media screen and (orientation: landscape) and (max-width: 320px) {
    transform: scale(0.4);
  }
`;
