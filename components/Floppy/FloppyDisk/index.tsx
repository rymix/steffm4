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

const FloppyDisk: React.FC<FloppyDiskProps> = ({ notes }) => {
  return (
    <StyledFloppy>
      <StyledTop>
        <StyledSlider />
        <StyledFitinha />
      </StyledTop>
      <StyledDown>
        <StyledNotes>
          {notes.paragraphs.map((para, index) => (
            <React.Fragment key={index}>{para}</React.Fragment>
          ))}
        </StyledNotes>
      </StyledDown>
    </StyledFloppy>
  );
};

export default FloppyDisk;
