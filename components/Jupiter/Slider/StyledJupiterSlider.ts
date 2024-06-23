import { Slider } from "@mui/material";
import type { StyledJupiterSliderProps } from "components/Jupiter/Slider/types";
import JupiterHandle from "public/svg/slider-handle.svg";
import styled from "styled-components";

export const StyledJupiterSliderWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 128px;
  width: 54px;
`;

export const StyledJupiterSlider = styled(Slider)<StyledJupiterSliderProps>`
  & .MuiSlider-track {
    display: none;
  }

  & .MuiSlider-thumb {
    width: 28.8px;
    height: 13.2px;
    border-radius: 1px;
    background: url(${JupiterHandle.src}) no-repeat center center;
    background-size: cover;
    box-shadow: 0px 5px 15px -3px rgba(0, 0, 0, 0.9);
    z-index: 2;
    &:focus,
    &:hover,
    &:active {
      box-shadow: "none";
    }
  }

  & .MuiSlider-track {
    width: 8px;
    background-color: black;
    position: relative;
    z-index: 1;
  }

  & .MuiSlider-rail {
    width: 8px;
    background-color: black;
    opacity: 1;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 28.8px;
      height: 100%;

      background: linear-gradient(
        to bottom,
        transparent 0%,
        ${(props) => props.$lineColor || "black"} 2%,
        transparent 3%,
        transparent 15%,
        ${(props) => props.$lineColor || "black"} 17%,
        transparent 18%,
        transparent 31%,
        ${(props) => props.$lineColor || "black"} 33%,
        transparent 34%,
        transparent 48%,
        ${(props) => props.$lineColor || "black"} 51%,
        transparent 52%,
        transparent 65%,
        ${(props) => props.$lineColor || "black"} 67%,
        transparent 68%,
        transparent 81%,
        ${(props) => props.$lineColor || "black"} 83%,
        transparent 84%,
        transparent 96%,
        ${(props) => props.$lineColor || "black"} 99%,
        transparent 100%
      );
      pointerevents: none;
      z-index: -1;
      mix-blend-mode: multiply;
    }
  }

  & .MuiSlider-root {
    padding: 0 8px;
  }
`;
