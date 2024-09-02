import {
  StyledDown,
  StyledFitinha,
  StyledFloppy,
  StyledNotes,
  StyledSlider,
  StyledTop,
} from "components/Floppy/FloppyDisk/StyledFloppyDisk";
import { FloppyDiskProps } from "components/Floppy/types";
import React, { useState } from "react";

const FloppyDisk: React.FC<FloppyDiskProps> = ({
  notes,
  floppyColor,
  labelColor,
  labelSecondColor,
  textColor,
  sliderColor,
  font,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Hover state

  const handleMouseOver = () => {
    setIsHovered(true); // Set hover state to true
  };

  const handleMouseOut = () => {
    setIsHovered(false); // Set hover state to false
  };

  return (
    <StyledFloppy
      $floppyColor={floppyColor}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <StyledTop $floppyColor={floppyColor}>
        <StyledSlider $sliderColor={sliderColor} $hovered={isHovered} />
        <StyledFitinha />
      </StyledTop>
      <StyledDown $labelColor={labelColor} $labelSecondColor={labelSecondColor}>
        <StyledNotes $textColor={textColor} $font={font}>
          {notes}
        </StyledNotes>
      </StyledDown>
    </StyledFloppy>
  );
};

export default FloppyDisk;
