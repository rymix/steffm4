import { StyledDx7BottomPanelPowerButtonProps } from "components/Dx7/BottomPanel/types";
import styled, { keyframes } from "styled-components";

export const StyledDx7BottomPanel = styled.div`
  background: #241d19;
  display: block;
  height: 10px;
  width: 100%;
`;

const poweredOff = keyframes`
  0% {
    background: rgba(100, 100, 100, 0.9);
  }
  100% {
    background: rgba(100, 100, 100, 0.9);
  }
`;

const poweredOn = keyframes`
  0% {
    background: rgba(252, 121, 31, 0.9);
  }
  50% {
    background: rgba(245, 111, 21, 0.9);
  }
  100% {
    background: rgba(255, 127, 41, 0.9);
  }
`;

export const StyledDx7BottomPanelPowerButton = styled.div<StyledDx7BottomPanelPowerButtonProps>`
  border: 5px solid rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  bottom: 10px;
  display: block;
  height: 24px;
  position: absolute;
  right: 34px;
  width: 34px;

  animation: ${(props) => (props.$isConnected ? poweredOn : poweredOff)}
    forwards 0.2s infinite;

  &::before {
    content: "";
    position: absolute;
    inset: 0 0 0 0;
    border-radius: 3px;
    background: radial-gradient(
      circle at bottom,
      rgba(236, 169, 122, 0.8) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 40%
    );
  }
`;
