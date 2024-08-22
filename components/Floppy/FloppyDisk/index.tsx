import {
  StyledDown,
  StyledFitinha,
  StyledFloppy,
  StyledNotes,
  StyledSlider,
  StyledTop,
} from "components/Floppy/FloppyDisk/StyledFloppyDisk";
import { FloppyDiskProps } from "components/Floppy/FloppyDisk/types";
import React from "react";

const FloppyDisk: React.FC<FloppyDiskProps> = ({ notes }) => {
  return (
    <StyledFloppy>
      <StyledTop>
        <StyledSlider />
        <StyledFitinha />
      </StyledTop>
      <StyledDown>
        <StyledNotes dangerouslySetInnerHTML={{ __html: notes }} />
      </StyledDown>
    </StyledFloppy>
  );
};

export default FloppyDisk;
