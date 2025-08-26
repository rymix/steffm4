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

  /* Medium breakpoint: 900px - scale down bezel */
  @media (max-width: 900px) {
    padding: 15px;
    margin: 15px 0;
  }

  /* Small breakpoint: 480px - further scale down bezel */
  @media (max-width: 480px) {
    padding: 10px;
    margin: 10px 0;
  }
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

  width: 680px;
  height: 80px;

  /* Medium breakpoint: 900px - scale down screen */
  @media (max-width: 900px) {
    width: 90vw;
    max-width: 600px;
    font-size: 18px;
    padding: 15px;
  }

  /* Small breakpoint: 480px - further scale down */
  @media (max-width: 480px) {
    width: 95vw;
    max-width: 400px;
    font-size: 14px;
    padding: 10px;
    height: 60px;
  }

  /* Mobile portrait: taller screen for 3-line display - stay within container */
  @media (max-width: 768px) and (orientation: portrait) {
    width: calc(100% - 40px); /* Stay within container padding */
    max-width: 300px;
    height: 120px;
    font-size: 12px;
    line-height: 1.3;
    padding: 12px;
  }

  /* Mobile landscape: wider but constrained to container */
  @media (max-width: 768px) and (orientation: landscape) {
    width: calc(100% - 20px); /* Stay within container padding */
    max-width: 450px;
    height: 80px;
    font-size: 14px;
    padding: 10px;
  }

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

  /* Medium breakpoint: 900px - adjust message positioning */
  @media (max-width: 900px) {
    top: 15px;
    left: 15px;
    right: 15px;
  }

  /* Small breakpoint: 480px - further adjust positioning */
  @media (max-width: 480px) {
    top: 10px;
    left: 10px;
    right: 10px;
  }

  /* Mobile portrait: adjust for taller screen */
  @media (max-width: 768px) and (orientation: portrait) {
    top: 12px;
    left: 12px;
    right: 12px;
  }

  /* Mobile landscape: standard positioning */
  @media (max-width: 768px) and (orientation: landscape) {
    top: 10px;
    left: 10px;
    right: 10px;
  }
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
