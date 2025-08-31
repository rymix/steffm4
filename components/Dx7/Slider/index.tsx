import Dx7Label from "components/Dx7/Label";
import {
  StyledDx7Slider,
  StyledDx7SliderBody,
  StyledDx7SliderFrame,
  StyledDx7SliderLabels,
  StyledDx7SliderLines,
  StyledDx7SliderOuter,
  StyledDx7SliderWrapper,
} from "components/Dx7/Slider/StyledDx7Slider";
import { Dx7SliderProps } from "components/Dx7/Slider/types";
import { useDeviceOrientation } from "components/Dx7/useDeviceOrientation";
import React from "react";

const Dx7Slider: React.FC<Dx7SliderProps> = ({
  onChange,
  orientation = "vertical",
  label,
  labelPosition = "above",
  lineColor = "white",
  textColor = "white",
  size = "normal",
  value = 70,
}) => {
  const { windowWidth, isMobile, isPortrait } = useDeviceOrientation();

  const handleChange = (event: Event, localValue: number | number[]): void => {
    if (onChange) {
      if (Array.isArray(localValue)) {
        onChange(localValue[0]);
      } else {
        onChange(localValue);
      }
    }
  };

  return (
    <StyledDx7SliderOuter
      $windowWidth={windowWidth}
      $isMobile={isMobile}
      $isPortrait={isPortrait}
    >
      {labelPosition === "above" && (
        <Dx7Label
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={4}
          textColor={textColor}
          size={size}
        />
      )}
      <StyledDx7SliderWrapper>
        <StyledDx7SliderFrame>
          <StyledDx7SliderBody>
            <StyledDx7Slider
              aria-label="Volume"
              orientation={orientation}
              value={value}
              min={0}
              max={100}
              $lineColor={lineColor}
              onChange={handleChange}
            />
          </StyledDx7SliderBody>
        </StyledDx7SliderFrame>
        <StyledDx7SliderLines />
        <StyledDx7SliderLabels>
          <Dx7Label
            label="Max"
            labelPosition={labelPosition}
            paddingTop={0}
            paddingBottom={57}
            textColor={textColor}
            size={size}
          />
          <Dx7Label
            label="Min"
            labelPosition={labelPosition}
            paddingTop={0}
            paddingBottom={2}
            textColor={textColor}
            size={size}
          />
        </StyledDx7SliderLabels>
      </StyledDx7SliderWrapper>
      {labelPosition === "below" && (
        <Dx7Label
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={4}
          textColor={textColor}
          size={size}
        />
      )}
    </StyledDx7SliderOuter>
  );
};

export default Dx7Slider;
