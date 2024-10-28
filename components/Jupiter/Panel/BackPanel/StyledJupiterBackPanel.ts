import styled, { keyframes } from "styled-components";

export const StyledJupiterBackPanel = styled.div`
  background: #3c3c3b;
  background-image: url("images/jupiter/rear.png");
  background-repeat: repeat-x;
  background-position: left;
  display: block;
  height: 54px;
  width: 100%;
`;

// const powerButtonAnimation = (): ReturnType<typeof keyframes> => keyframes`
//   0% {
//     transform: rotateZ(360deg);
//     sbackground: rgba(252, 121, 31, 0.9);
//   }
//   100% {
//     sbackground: rgba(0, 101, 11, 0.9);
//   }
// `;

const fadeOut = keyframes`
  0% {
    background: rgba(252, 121, 31, 0.9);
  }
  50% {
    background: rgba(245, 111, 21, 0.9);
  }
  100% {
    background: rgba(252, 121, 31, 0.9);
  }
`;

export const StyledJupiterBackPanelPowerButton = styled.div`
  background: rgba(252, 121, 31, 0.9);
  border: 5px solid rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  bottom: 16px;
  display: block;
  height: 24px;
  position: absolute;
  right: 34px;
  width: 34px;
  zbox-shadow: 0 0 5px 5px rgba(252, 121, 31, 0.5);

  animation: ${fadeOut} forwards 0.2s infinite;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 3px;
    background: radial-gradient(
      circle at bottom,
      rgba(236, 169, 122, 0.8) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 40%
    );
  }
`;
