import FloppyDisk from "components/Floppy/FloppyDisk";
import {
  AnimatedDisk,
  FadingDisk,
  StyledDiskContainer,
} from "components/Floppy/FloppyDiskStack/StyledFloppyDiskStack";

import React, { useEffect, useState } from "react";
import { DiskProps, FloppyDiskStackProps } from "../types";

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
    const newDisk: DiskProps = {
      id: Date.now(),
      notes: notesList[currentIndex % notesList.length],
      startRotate: Math.random() * 60 - 30,
      endRotate: Math.random() * 20 - 10,
      finalX: Math.random() * 20 - 10, // Random X position within -10px to +10px
      finalY: Math.random() * 20 - 10, // Random Y position within -10px to +10px
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
        >
          {index === 0 && disks.length >= 5 ? (
            <FadingDisk>
              <FloppyDisk notes={disk.notes} />
            </FadingDisk>
          ) : (
            <FloppyDisk notes={disk.notes} />
          )}
        </AnimatedDisk>
      ))}
    </StyledDiskContainer>
  );
};

export default FloppyDiskStack;
