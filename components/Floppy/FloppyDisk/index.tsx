import {
  StyledDown,
  StyledFitinha,
  StyledFloppy,
  StyledNotes,
  StyledSlider,
  StyledTop,
} from "components/Floppy/FloppyDisk/StyledFloppyDisk";
import { FloppyDiskProps } from "components/Floppy/types";
import React from "react";

const FloppyDisk: React.FC<FloppyDiskProps> = ({
  notes,
  floppyColor,
  labelColor,
  textColor,
  sliderColor,
}) => {
  return (
    <StyledFloppy floppyColor={floppyColor}>
      <StyledTop floppyColor={floppyColor}>
        <StyledSlider sliderColor={sliderColor} />
        <StyledFitinha />
      </StyledTop>
      <StyledDown labelColor={labelColor}>
        <StyledNotes textColor={textColor}>
          {notes.paragraphs.map((para, index) => (
            <React.Fragment key={index}>{para}</React.Fragment>
          ))}
        </StyledNotes>
      </StyledDown>
    </StyledFloppy>
  );
};

export default FloppyDisk;
