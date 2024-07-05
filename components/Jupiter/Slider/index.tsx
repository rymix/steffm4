import JupiterLabel from "components/Jupiter/Label";
import {
  StyledJupiterSlider,
  StyledJupiterSliderWrapper,
} from "components/Jupiter/Slider/StyledJupiterSlider";
import type { JupiterSliderProps } from "components/Jupiter/Slider/types";
import React from "react";

const JupiterSlider: React.FC<JupiterSliderProps> = ({
  onChange,
  orientation = "vertical",
  label,
  labelPosition = "above",
  lineColor = "white",
  textColor = "white",
  volume = 70,
}) => {
  const handleChange = (event: Event, value: number | number[]): void => {
    if (onChange) {
      if (Array.isArray(value)) {
        onChange(value[0]);
      } else {
        onChange(value);
      }
    }
  };

  return (
    <>
      <StyledJupiterSliderWrapper>
        {labelPosition === "above" && (
          <JupiterLabel
            label={label}
            labelPosition={labelPosition}
            paddingTop={0}
            paddingBottom={10}
            textColor={textColor}
          />
        )}
        <StyledJupiterSlider
          aria-label="Volume"
          orientation={orientation}
          value={volume}
          min={0}
          max={100}
          $lineColor={lineColor}
          onChange={handleChange}
        />
        {labelPosition === "below" && (
          <JupiterLabel
            label={label}
            labelPosition={labelPosition}
            paddingTop={0}
            paddingBottom={10}
            textColor={textColor}
          />
        )}
      </StyledJupiterSliderWrapper>
    </>
  );
};

export default JupiterSlider;
