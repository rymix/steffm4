import styled, { keyframes } from "styled-components";

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const StyledGradientBackground = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  background-size: 400% 400%;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  animation: ${gradient} 25s ease infinite;
  z-index: -999;
`;