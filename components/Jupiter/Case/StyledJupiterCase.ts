import styled from "styled-components";

export const StyledJupiterCase = styled.div`
  margin: 20px;
  max-width: 1100px;
  min-width: 1100px;
  width: 1100px;
  z-index: 2;

  @media (max-width: 1200px) {
    max-width: 720px;
    min-width: 720px;
    width: 720px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
    min-width: 600px;
    width: 600px;
  }

  @media (max-width: 640px) {
    max-width: 500px;
    min-width: 500px;
    width: 500px;
  }

  @media (max-width: 550px) {
    max-width: 400px;
    min-width: 400px;
    width: 400px;
  }

  @media (max-width: 440px) {
    max-width: 300px;
    min-width: 300px;
    width: 300px;
  }
`;
