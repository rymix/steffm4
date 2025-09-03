import { Slider } from "@mui/material";
import type { StyledDx7SliderProps } from "components/Dx7/Slider/types";
import type { StyledDx7SliderOuterProps } from "components/Dx7/types";
import Dx7Handle from "public/svg/slider-handle4.png";
import styled from "styled-components";

export const StyledDx7SliderOuter = styled.div<StyledDx7SliderOuterProps>`
  /* Large screens (>480px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 480 &&
    !props.$isPortrait &&
    `
    scale: 0.8;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 480 &&
    props.$isPortrait &&
    `
    scale: 0.8;
  `}

  /* Small screens (≤480px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 480 &&
    !props.$isPortrait &&
    `
    scale: 0.75;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 480 &&
    props.$isPortrait &&
    `
    scale: 0.75;
  `}
`;

export const StyledDx7SliderWrapper = styled.div`
  display: flex;
`;

export const StyledDx7SliderFrame = styled.div`
  background: rgba(20, 20, 20, 1);
  border: 2px solid black;
  display: flex;
  padding: 9px 9px 5px 9px;
  width: 60px;
`;

export const StyledDx7SliderBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 128px;
  width: 54px;
`;

export const StyledDx7Slider = styled(Slider)<StyledDx7SliderProps>`
  & .MuiSlider-thumb {
    width: 50px;
    height: 15px;
    border-radius: 1px;
    background: url(${Dx7Handle.src}) no-repeat center center;
    background-size: cover;
    box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.9);
    z-index: 2;

    &:focus,
    &:hover,
    &:active {
      box-shadow: "none";
    }
  }

  & .MuiSlider-thumb.Mui-focusVisible,
  & .MuiSlider-thumb:hover,
  & .MuiSlider-thumb.Mui-active,
  & .MuiSlider-thumb:active,
  & .MuiSlider-thumb:focus-visible {
    box-shadow: none !important;
  }

  & .MuiSlider-track {
    display: none;
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
      left: 100%;
      transform: translateX(-50%);
      width: 28.8px;
      height: 100%;

      pointerevents: none;
      z-index: -1;
      mix-blend-mode: multiply;
    }
  }

  & .MuiSlider-root {
    padding: 0 8px;
  }
`;

export const StyledDx7SliderLines = styled.div`
  background: orange;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    white 0%,
    transparent 0.5%,
    transparent 9%,
    white 9%,
    transparent 9.5%,
    transparent 18%,
    white 18%,
    transparent 18.5%,
    transparent 27%,
    white 27%,
    transparent 27.5%,
    transparent 36%,
    white 36%,
    transparent 36.5%,
    transparent 45%,
    white 45%,
    transparent 45.5%,
    transparent 54%,
    white 54%,
    transparent 54.5%,
    transparent 63%,
    white 63%,
    transparent 63.5%,
    transparent 72%,
    white 72%,
    transparent 72.5%,
    transparent 81%,
    white 81%,
    transparent 81.5%,
    transparent 90%,
    white 90%,
    transparent 90.5%,
    transparent 99%,
    white 99%,
    transparent 100%
  );

  width: 12px;
  height: 128px;
  margin: 10px 0 0 10px;

  /* Medium breakpoint: 900px - smaller slider lines */

  /* @media (max-width: 900px) {
    width: 10px;
    height: 110px;
    margin: 8px 0 0 8px;
  } */

  /* Small breakpoint: 480px - compact slider lines */

  /* @media (max-width: 480px) {
    width: 8px;
    height: 90px;
    margin: 6px 0 0 6px;
  } */
`;

export const StyledDx7SliderLabels = styled.div`
  & > * {
    height: 50%;
  }
`;
