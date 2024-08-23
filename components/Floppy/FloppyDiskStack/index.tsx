import FloppyDisk from "components/Floppy/FloppyDisk";
import {
  AnimatedDisk,
  FadingDisk,
  StyledDiskContainer,
} from "components/Floppy/FloppyDiskStack/StyledFloppyDiskStack";

import React, { useEffect, useState } from "react";
import { DiskProps, FloppyDiskStackProps } from "../types";

const floppyColors = [
  "#675d56",
  "#32694a",
  "#d04145",
  "#2c3e6e",
  "#f4e858",
  "#2c2827",
  "#cbcab8",
];
const labelColors = ["#ddc4b0", "#d3d3d3", "#add8e6", "#ffb6c1", "#e6e6fa"];
const textColors = ["#a4243b", "#000000", "#ff0000", "#008000", "#000080"];
const sliderColors = ["#1b1a20", "#a5acb2", "#a5acb2", "#959ca2", "#d1d3df"];

const FloppyDiskStack: React.FC<FloppyDiskStackProps> = ({
  notesList,
  onAddDisk,
}) => {
  const [disks, setDisks] = useState<DiskProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Independent index tracker

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < notesList.length) {
        addDisk();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, notesList]);

  const addDisk = () => {
    const diskWidth = 290; // Assuming the disk's width is 290px
    const newDisk: DiskProps = {
      id: Date.now(),
      notes: notesList[currentIndex % notesList.length],
      startRotate: Math.random() * 120 - 60, // Random starting rotation between -60 and +60 degrees
      endRotate: Math.random() * 20 - 10, // Random ending rotation between -10 and +10 degrees
      finalX: Math.random() * 20 - 10, // Random X position within -10px to +10px
      finalY: Math.random() * 20 - 10, // Random Y position within -10px to +10px
      startX: Math.random() * diskWidth * 3 - diskWidth, // Random X start position from left to 3x disk width to the right
      floppyColor:
        floppyColors[Math.floor(Math.random() * floppyColors.length)],
      labelColor: labelColors[Math.floor(Math.random() * labelColors.length)],
      textColor: textColors[Math.floor(Math.random() * textColors.length)],
      sliderColor:
        sliderColors[Math.floor(Math.random() * sliderColors.length)],
    };

    if (disks.length >= 5) {
      // Start the removal of the oldest disk
      const remainingDisks = disks.slice(1);

      setTimeout(() => {
        setDisks([...remainingDisks, newDisk]);
        setCurrentIndex((prevIndex) => prevIndex + 1); // Increment index after adding new disk
      }, 1000); // Allow time for the fade-out animation
    } else {
      setDisks((prevDisks) => [...prevDisks, newDisk]);
      setCurrentIndex((prevIndex) => prevIndex + 1); // Increment index after adding new disk
    }
  };

  return (
    <StyledDiskContainer>
      {disks.map((disk, index) => (
        <AnimatedDisk
          key={disk.id}
          index={index}
          startRotate={disk.startRotate}
          endRotate={disk.endRotate}
          finalX={disk.finalX}
          finalY={disk.finalY}
          startX={disk.startX}
        >
          {index === 0 && disks.length >= 5 ? (
            <FadingDisk>
              <FloppyDisk
                notes={disk.notes}
                floppyColor={disk.floppyColor}
                labelColor={disk.labelColor}
                textColor={disk.textColor}
                sliderColor={disk.sliderColor}
              />
            </FadingDisk>
          ) : (
            <FloppyDisk
              notes={disk.notes}
              floppyColor={disk.floppyColor}
              labelColor={disk.labelColor}
              textColor={disk.textColor}
              sliderColor={disk.sliderColor}
            />
          )}
        </AnimatedDisk>
      ))}
    </StyledDiskContainer>
  );
};

export default FloppyDiskStack;
