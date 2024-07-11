import styled from "styled-components";

export const StyledJupiterBackPanel = styled.div`
  background: #3c3c3b;
  background-image: url("images/jupiter/rear.png");
  background-repeat: repeat-x;
  background-position: left;
  display: block;
  height: 54px;
  width: 100%;
`;

export const StyledJupiterBackPanelPowerButton = styled.div`
  background: rgba(252, 121, 31, 0.9);
  border-radius: 3px;
  bottom: 16px;
  display: block;
  height: 24px;
  position: absolute;
  right: 26px;
  width: 54px;
  box-shadow: 0 0 10px 5px rgba(252, 121, 31, 0.5); /* Outer glow */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 3px;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 70%
    ); /* Inset glow */
  }
`;
