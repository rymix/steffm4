import JupiterLabel from "components/Jupiter/Label";
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
  label,
  labelPosition = "above",
}) => {
  return (
    <>
      <StyledJupiterSliderWrapper>
        {labelPosition === "above" && (
          <JupiterLabel
            label={label}
            labelPosition={labelPosition}
            paddingTop={0}
            paddingBottom={10}
          />
        )}
        <StyledJupiterSlider
          aria-label="Volume"
          orientation={orientation}
          defaultValue={70}
          min={0}
          max={100}
        />
        {labelPosition === "below" && (
          <JupiterLabel
            label={label}
            labelPosition={labelPosition}
            paddingTop={0}
            paddingBottom={10}
          />
        )}
      </StyledJupiterSliderWrapper>
    </>
  );
};

export default JupiterSlider;
