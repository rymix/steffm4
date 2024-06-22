import {
  StyledJupiterSlider,
  StyledJupiterSliderWrapper,
} from "components/Jupiter/Slider/StyledJupiterSlider";
import type { JupiterSliderProps } from "components/Jupiter/Slider/types";
import JupiterHandle from "public/svg/slider-handle.svg";
import React from "react";

console.log("JupiterHandle", JupiterHandle.src);

const JupiterSlider: React.FC<JupiterSliderProps> = ({
  orientation = "vertical",
}) => {
  return (
    <>
      <StyledJupiterSliderWrapper>
        <StyledJupiterSlider
          aria-label="Volume"
          orientation={orientation}
          defaultValue={70}
          min={0}
          max={100}
        />
      </StyledJupiterSliderWrapper>
    </>
  );
};

export default JupiterSlider;
