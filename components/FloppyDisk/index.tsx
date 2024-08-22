import {
  StyledDown,
  StyledFitinha,
  StyledFloppy,
  StyledNotes,
  StyledSlider,
  StyledTop,
} from "components/FloppyDisk/StyledFloppyDisk";
import { FloppyDiskProps } from "components/FloppyDisk/types";
import React from "react";

const FloppyDisk: React.FC<FloppyDiskProps> = ({ notes }) => {
  return (
    <StyledFloppy>
      <StyledTop>
        <StyledSlider />
        <StyledFitinha />
      </StyledTop>
      <StyledDown>
        <StyledNotes>{notes}</StyledNotes>
      </StyledDown>
    </StyledFloppy>
  );
};

export default FloppyDisk;
