import {
  StyledDown,
  StyledFitinha,
  StyledFloppy,
  StyledNotes,
  StyledSlider,
  StyledTop,
} from "components/Floppy/FloppyDisk/StyledFloppyDisk";
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
            <p key={index}>
              {para.emphasize ? <span>{para.text}</span> : para.text}
            </p>
          ))}
        </StyledNotes>
      </StyledDown>
    </StyledFloppy>
  );
};

export default FloppyDisk;
