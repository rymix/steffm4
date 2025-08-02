// components/Floppy/FloppyDisk/

import styled from "styled-components";

// Main Floppy Disk Container
export const StyledFloppy = styled.div<{ $floppyColor: string }>`
  width: 100%; /* 290px of 290px */
  height: 100%; /* 290px of 290px */
  background-color: ${(props) => props.$floppyColor};
  box-shadow: -5px 8px 10px rgba(0, 0, 0, 0.5);
  border-radius: 3.44%; /* 10px of 290px */
  display: flex;
  flex-direction: column;
  clip-path: polygon(0 0, 94% 0, 100% 6%, 100% 100%, 0 100%);
`;

// Top part of the floppy
export const StyledTop = styled.div<{ $floppyColor: string }>`
  width: 65.51%; /* 190px of 290px */
  height: 34.48%; /* 100px of 290px */
  background-color: ${(props) => props.$floppyColor};
  margin-left: 10.34%; /* 30px of 290px */
  position: relative;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  border-right: 2px solid rgba(255, 255, 255, 0.15);
  border-top: 0;
  border-bottom-left-radius: 4.21%; /* 8px of 190px */
  border-bottom-right-radius: 4.21%; /* 8px of 190px */
`;

// Slider element
export const StyledSlider = styled.div<{
  $sliderColor: string;
  $hovered: boolean;
}>`
  width: 78.95%; /* 150px of 190px */
  height: 100%;
  position: absolute;
  left: ${(props) =>
    props.$hovered ? "0" : "21.05%"}; /* Set left based on hover state */
  top: -1.58%; /* -3px of 190px */
  border-radius: 4.21%; /* 150px of 190px */
  border: 10px solid ${(props) => props.$sliderColor}; /* 10px of 190px */
  border-left-width: 4.25em;
  z-index: 1;
  transition: left 0.2s ease-in-out;
`;

// Black tape element inside the top part
export const StyledFitinha = styled.div`
  position: absolute;
  width: 22.11%; /* 42px of 190px */
  height: 90%;
  background-color: rgba(0, 0, 0, 0.8);
  right: 23.68%; /* 45px of 190px */
  top: 3.16%; /* 6px of 190px */
  z-index: 0;
`;

// Bottom part of the floppy where the notes are displayed
export const StyledDown = styled.div<{
  $labelColor: string;
  $labelSecondColor: string;
}>`
  width: 77.59%; /* 225px of 290px */
  height: 62.07%; /* 180px of 290px */
  border-left: 2px solid rgba(0, 0, 0, 0.2);
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  margin-left: 10.34%; /* 30px of 290px */
  margin-top: 5.17%; /* 15px of 290px */
  border-radius: 5px;
  position: relative;
  background: linear-gradient(
    to bottom,
    ${(props) => props.$labelColor} 50%,
    ${(props) => props.$labelSecondColor} 50%
  );

  background-size: 100% 50px;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 6.17%; /* 15px of 290px */
    height: 8.17%; /* 15px of 290px */
    background-color: transparent;
    bottom: 10.9%; /* 20px of 290px */
    box-shadow: inset -4px 0 10px rgba(0, 0, 0, 0.3);
  }

  &::after {
    right: -10.62%; /* -25px of 290px */
  }

  &::before {
    background-color: rgba(0, 0, 0, 0.7);
    left: -10.62%; /* -25px of 290px */
  }
`;

// Notes section inside the bottom part
export const StyledNotes = styled.div<{ 
  $textColor: string; 
  $font: string; 
  $fontSize: number;
  $rotation: number;
  $fontSizeMobile: number;
}>`
  font-family: ${(props) => props.$font};
  margin-left: 15px;
  margin-top: 0px;
  color: ${(props) => props.$textColor};
  font-size: ${(props) => props.$fontSize}rem;
  line-height: 1.1;
  transform: rotate(${(props) => props.$rotation}deg);

  @media (max-width: 1024px) {
    font-size: ${(props) => props.$fontSizeMobile}rem;
    top: 130px;
    left: 150px;
  }

  p > span {
    text-decoration: underline;
    text-transform: uppercase;
    border-bottom: 2px solid ${(props) => props.$textColor};
  }
`;
