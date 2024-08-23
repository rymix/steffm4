// components/Floppy/FloppyDisk/

import styled from "styled-components";

// Define CSS variables for consistent theming
const floppyColor = "#675d56";
const externalBackground = "transparent";
const labelLine1 = "#ddc4b0";
const labelLine2 = "#decdc1";
const textNote = "#a4243b";
const shadow = "#32281d";
const slider = "#33291f";

// Main Floppy Disk Container
export const StyledFloppy = styled.div<{ floppyColor: string }>`
  width: 290px;
  height: 290px;
  background-color: ${(props) => props.floppyColor};
  box-shadow: -5px 8px 10px ${shadow};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

// Top part of the floppy
export const StyledTop = styled.div<{ floppyColor: string }>`
  width: 190px;
  height: 100px;
  background-color: ${(props) => props.floppyColor};
  margin-left: 30px;
  position: relative;
  border-left: 2px solid rgba(0, 0, 0, 0.2);
  border-right: 2px solid rgba(0, 0, 0, 0.15);
  border-top: 2px solid transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

// Slider element
export const StyledSlider = styled.div<{ sliderColor: string }>`
  width: 150px;
  height: inherit;
  position: absolute;
  left: 40px;
  top: -3px;
  border-radius: 8px;
  border: 10px solid ${(props) => props.sliderColor};
  border-left-width: 100px;
  z-index: 1;
  transition: left 0.2s ease-in-out;

  &:hover {
    left: 0;
  }
`;

// Black tape element inside the top part
export const StyledFitinha = styled.div`
  position: absolute;
  width: 42px;
  height: 82px;
  background-color: rgba(0, 0, 0, 0.8);
  right: 45px;
  top: 6px;
  z-index: 0;
`;

// Bottom part of the floppy where the notes are displayed
export const StyledDown = styled.div<{ labelColor: string }>`
  width: 225px;
  height: 180px;
  border-left: 2px solid rgba(0, 0, 0, 0.6);
  border-right: 2px solid rgba(0, 0, 0, 0.3);
  border-top: 2px solid rgba(0, 0, 0, 0.6);
  margin-left: 30px;
  margin-top: 15px;
  border-radius: 5px;
  position: relative;
  background: linear-gradient(
    to bottom,
    ${(props) => props.labelColor} 50%,
    ${(props) => props.labelColor} 50%
  );
  background-size: 100% 50px;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: transparent;
    bottom: 20px;
    box-shadow: inset -4px 0 10px rgba(0, 0, 0, 0.3);
  }

  &::after {
    right: -25px;
  }

  &::before {
    left: -25px;
  }
`;

// Notes section inside the bottom part
export const StyledNotes = styled.div<{ textColor: string }>`
  font-family: "ShadowsIntoLight", cursive;
  margin-left: 15px;
  margin-top: 0px;
  color: ${(props) => props.textColor};
  font-size: 1.3rem;
  transform: rotate(-3deg);

  p > span {
    text-decoration: underline;
    text-transform: uppercase;
    border-bottom: 2px solid ${(props) => props.textColor};
  }
`;
