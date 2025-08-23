import {
  StyledDx7Slider,
  StyledDx7SliderItem,
  StyledDx7SliderLines,
  StyledDx7SliderOuter,
  StyledDx7SliderWrapper,
} from "components/Dx7/Slider/StyledDx7Slider";
import { Dx7SliderProps } from "components/Dx7/Slider/types";
import React from "react";

const Dx7Slider: React.FC<Dx7SliderProps> = ({
  onChange,
  orientation = "vertical",
  lineColor = "white",
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
    <StyledDx7SliderOuter>
      <StyledDx7SliderItem>
        <StyledDx7SliderWrapper>
          <StyledDx7Slider
            aria-label="Volume"
            orientation={orientation}
            value={volume}
            min={0}
            max={100}
            $lineColor={lineColor}
            onChange={handleChange}
          />
        </StyledDx7SliderWrapper>
      </StyledDx7SliderItem>
      <StyledDx7SliderItem>
        <StyledDx7SliderLines />
      </StyledDx7SliderItem>
    </StyledDx7SliderOuter>
  );
};

export default Dx7Slider;
