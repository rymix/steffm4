import styled from "styled-components";
import { NOISE_BACKGROUND } from "utils/constants";

export const StyledJupiterBackPanelWrapper = styled.div`
  zbackground: #3c3c3b;
  zbackground-image: url(${NOISE_BACKGROUND});
  zbackground-size: cover;
  border-bottom: 2px solid red;
  height: 50px;
  overflow: hidden;
  perspective: 400px;
  width: 100%;
`;

export const StyledJupiterBackPanel = styled.div`
  background: #3c3c3b;
  background-image: url("images/jupiter/jack.png");
  background-repeat: repeat-x;
  background-position: left;
  height: 100%;
  width: 100%;
  transform: rotateX(45deg);
  transform-origin: bottom;
`;
