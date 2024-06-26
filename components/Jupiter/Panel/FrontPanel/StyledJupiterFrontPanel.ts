import styled from "styled-components";
import { NOISE_BACKGROUND } from "utils/constants";

export const StyledJupiterFrontPanelWrapper = styled.div`
  zbackground: #3c3c3b;
  zbackground-image: url(${NOISE_BACKGROUND});
  zbackground-size: cover;
  border-top: 2px solid #333333;
  height: 160px;
  overflow: hidden;
  perspective: 3000px;
  width: 100%;
`;

export const StyledJupiterFrontPanel = styled.div`
  background: #3c3c3b;
  zbackground-image: url("images/jupiter/jack.png");
  background-repeat: repeat-x;
  background-position: left;
  height: 100%;
  width: 100%;
  transform: rotateX(-65deg);
  transform-origin: top;
`;
