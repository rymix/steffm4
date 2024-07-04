import styled from "styled-components";

export const StyledJupiterCase = styled.div`
  margin: 20px;
  max-width: 960px;
  min-width: 960px;
  width: 960px;
  z-index: 2;

  @media (max-width: 1000px) {
    max-width: 700px;
    min-width: 700px;
    width: 700px;
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
