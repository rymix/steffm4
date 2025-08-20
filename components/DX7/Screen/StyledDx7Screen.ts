import styled from "styled-components";

export const StyledDx7Screen = styled.div`
  position: relative;
  background-color: rgba(210, 238, 10, 1); /* solid base */
  color: rgba(36, 29, 25, 0.6);
  font-family: LEDBoard7;
  font-size: 20px;
  padding: 20px;
  text-shadow: 0 0 3px rgba(36, 29, 25, 0.3);
  overflow: hidden; /* hide scaled edges */

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
    background-image: url(/images/dx7/dot-matrix-grid3.png);
    background-repeat: repeat; /* set to 'repeat' if it's a tile */
    background-position: center;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
  }
`;
