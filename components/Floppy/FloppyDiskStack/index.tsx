import FloppyDisk from "components/Floppy/FloppyDisk";
import {
  AnimatedDisk,
  FadingDisk,
  StyledDiskContainer,
} from "components/Floppy/FloppyDiskStack/StyledFloppyDiskStack";
import {
  DiskProps,
  FloppyDiskStackProps,
} from "components/Floppy/FloppyDiskStack/types";
import React, { useEffect, useState } from "react";

const FloppyDiskStack: React.FC<FloppyDiskStackProps> = ({
  notesList,
  onAddDisk,
}) => {
  const [disks, setDisks] = useState<DiskProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (disks.length < notesList.length) {
        addDisk();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [disks, notesList]);

  const addDisk = () => {
    const newDisk: DiskProps = {
      id: Date.now(),
      notes: notesList[disks.length % notesList.length],
      startRotate: Math.random() * 60 - 30,
      endRotate: Math.random() * 20 - 10,
      finalX: Math.random() * 20 - 10, // Random X position within -10px to +10px
      finalY: Math.random() * 20 - 10, // Random Y position within -10px to +10px
    };

    setDisks((prevDisks) => {
      if (prevDisks.length >= notesList.length) {
        const [first, ...rest] = prevDisks;
        setTimeout(() => {
          setDisks(rest);
        }, 1000); // Delay to allow fade-out
        return [...rest, newDisk];
      } else {
        return [...prevDisks, newDisk];
      }
    });
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
