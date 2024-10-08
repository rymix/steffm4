import styled from "styled-components";

export const StyledJupiterTable = styled.div`
  align-items: center;
  background: green;
  display: flex;
  height: 100vh;
  justify-content: center;
  position: relative;
  width: 100%;

  background-color: #795141;
  background-image: url("table/wood-pattern6.png");
  background-size: 600px;

  z-index: 0;

  &::after {
    background-color: rgba(255, 255, 255, 0);
    background-image: radial-gradient(
      circle farthest-side at 50% 70%,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
`;
