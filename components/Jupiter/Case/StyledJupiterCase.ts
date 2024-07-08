import type { StyledJupiterCaseProps } from "components/Jupiter/Case/types";
import styled from "styled-components";

export const StyledJupiterCase = styled.div<StyledJupiterCaseProps>`
  margin: 20px;
  max-width: 1100px;
  min-width: 1100px;
  width: 1100px;
  z-index: 2;

  ${(props) =>
    props.$scale &&
    props.$scale !== 1 &&
    `
        transform: scale(${props.$scale});

    `}

  @media screen and (orientation: landscape) and (max-width: 1300px) {
    max-width: 900px;
    min-width: 900px;
    width: 900px;
  }

  @media screen and (orientation: landscape) and (max-width: 1024px) {
    max-width: 760px;
    min-width: 760px;
    width: 760px;
  }

  @media screen and (orientation: landscape) and (max-width: 768px) {
    max-width: 500px;
    min-width: 500px;
    width: 500px;
  }

  @media screen and (orientation: landscape) and (max-width: 550px) {
    max-width: 400px;
    min-width: 400px;
    width: 400px;
  }

  @media screen and (orientation: landscape) and (max-width: 440px) {
    max-width: 320px;
    min-width: 320px;
    width: 320px;
  }

  @media screen and (max-width: 323px) {
    max-width: 322px;
    min-width: 322px;
    width: 322px;
  }

  @media screen and (orientation: portrait) and (max-width: 1300px) {
    max-width: 900px;
    min-width: 900px;
    width: 900px;
  }

  @media screen and (orientation: portrait) and (max-width: 1024px) {
    max-width: 760px;
    min-width: 760px;
    width: 760px;
  }

  @media screen and (orientation: portrait) and (max-width: 768px) {
    max-width: 400px;
    min-width: 400px;
    width: 400px;
  }

  @media screen and (orientation: portrait) and (max-width: 550px) {
    max-width: 400px;
    min-width: 400px;
    width: 400px;
  }

  @media screen and (orientation: portrait) and (max-width: 440px) {
    max-width: 322px;
    min-width: 322px;
    width: 322px;
  }

  @media screen and (max-width: 323px) {
    max-width: 322px;
    min-width: 322px;
    width: 322px;
  }
`;
