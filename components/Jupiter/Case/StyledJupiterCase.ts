import styled from "styled-components";

export const StyledJupiterCase = styled.div`
  margin: 20px;
  max-width: 1100px;
  min-width: 1100px;
  width: 1100px;
  z-index: 2;

  @media screen and (orientation: landscape) and (min-width: 769px) and (max-width: 1024px) {
    transform: scale(0.6);
  }

  @media screen and (orientation: landscape) and (min-width: 600px) and (max-width: 768px) {
    transform: scale(0.5);
  }
`;
