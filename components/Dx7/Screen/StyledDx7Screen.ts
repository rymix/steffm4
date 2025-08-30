import { StyledDx7ScreenProps } from "components/Dx7/Screen/types";
import styled from "styled-components";

export const StyledDx7ScreenBezel = styled.div`
  background: rgba(32, 16, 0, 1);
  background-image:
    linear-gradient(170deg, #0007, transparent 50%),
    linear-gradient(to bottom, transparent, #fff1 95%, #fff4 100%);
  box-shadow:
    inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
  border: 2px solid #333;
  border-radius: 3px;
  padding: 20px;
  margin: 20px 0;
`;

export const StyledDx7Screen = styled.div<StyledDx7ScreenProps>`
  position: relative;
  background-color: rgba(210, 238, 10, 1);
  background-color: ${(props) =>
    props.$lightOn ? "rgba(210, 238, 10, 1)" : "rgba(74, 84, 77, 1)"};
  color: rgba(36, 29, 25, 0.6);
  font-family: "LEDBoard7";
  font-size: 20px;
  line-height: 1.2;
  padding: 20px;
  text-shadow: 0 0 3px rgba(36, 29, 25, 0.3);
  overflow: hidden; /* hide scaled edges */
  transition: background-color 0.1s ease-in-out;

  width: ${(props) => `${props.$screenWidth ?? 640}px`};
  height: 80px;

  /* ensure content sits above the pseudo background */
  & > * {
    position: relative;
    z-index: 1;
  }

  /* background image layer */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/images/dx7/dot-matrix-grid3.png");
    background-repeat: repeat; /* set to 'repeat' if it's a tile */
    background-position: center;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
  }
`;

export const StyledDx7ScreenMessage = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  transition: none;
`;

export const StyledDx7ScreenDebug = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 2px 4px;
  z-index: 10;
  font-family: monospace;
`;
