import FloppyDisk from "components/Floppy/FloppyDisk";
import {
  AnimatedDisk,
  FadingDisk,
  StyledDiskContainer,
} from "components/Floppy/FloppyDiskStack/StyledFloppyDiskStack";
import React, { useEffect, useState } from "react";

import { DiskProps, FloppyDiskStackProps } from "components/Floppy/types";

const floppyColors = [
  "#675d56",
  "#32694a",
  "#d04145",
  "#2c3e6e",
  "#f4e858",
  "#2c2827",
  "#cbcab8",
];
const labelColors = ["#ddc4b0", "#d3d3d3", "#add8e6", "#e6e6fa"];
const textColors = [
  "#a4243b",
  "#000000",
  "#000000",
  "#000000",
  "#008000",
  "#000080",
  "#000080",
  "#000080",
];
const sliderColors = ["#1b1a20", "#a5acb2", "#a5acb2", "#959ca2", "#d1d3df"];
const fonts = ["GloriaHallelujah", "Caveat", "IndieFlower", "ShadowsIntoLight"];

const getRandomOffset = (amount: number): number => {
  return Math.random() * (2 * amount) - amount;
};

const FloppyDiskStack: React.FC<FloppyDiskStackProps> = ({ label }) => {
  const [disks, setDisks] = useState<DiskProps[]>([]);

  useEffect(() => {
    const addDisk = (notes: JSX.Element[]): void => {
      const diskWidth = 290; // Assuming the disk's width is 290px
      const labelColor =
        labelColors[Math.floor(Math.random() * labelColors.length)];
      const newDisk: DiskProps = {
        id: Date.now(),
        notes,
        startRotate: getRandomOffset(120),
        endRotate: getRandomOffset(10),
        finalX: getRandomOffset(10) - 145,
        finalY: getRandomOffset(10) - 120,
        startX: Math.random() * diskWidth * 3 - diskWidth, // Random X start position from left to 3x disk width to the right
        floppyColor:
          floppyColors[Math.floor(Math.random() * floppyColors.length)],
        labelColor,
        labelSecondColor: Math.random() < 0.7 ? labelColor : "#e6e6fa",
        textColor: textColors[Math.floor(Math.random() * textColors.length)],
        sliderColor:
          sliderColors[Math.floor(Math.random() * sliderColors.length)],
        font: fonts[Math.floor(Math.random() * fonts.length)],
      };

      if (disks.length >= 5) {
        const remainingDisks = disks.slice(1);
        setDisks([...remainingDisks, newDisk]);
      } else {
        setDisks((prevDisks) => [...prevDisks, newDisk]);
      }
    };

    const notes = [
      label?.trackName ? (
        <p key="trackName">{label.trackName}</p>
      ) : (
        <p key="trackName">Track Name Unavailable</p>
      ),
      label?.artistName ? (
        <p key="artistName">{label.artistName}</p>
      ) : (
        <p key="artistName">Artist Name Unavailable</p>
      ),
    ];

    addDisk(notes);
  }, [label]);

  return (
    <StyledDiskContainer>
      {disks.map((disk, index) => (
        <AnimatedDisk
          key={disk.id}
          $index={index}
          $startRotate={disk.startRotate}
          $endRotate={disk.endRotate}
          $finalX={disk.finalX}
          $finalY={disk.finalY}
          $startX={disk.startX}
        >
          {index === 0 && disks.length >= 5 ? (
            <FadingDisk>
              <FloppyDisk
                notes={disk.notes}
                floppyColor={disk.floppyColor}
                labelColor={disk.labelColor}
                labelSecondColor={disk.labelSecondColor}
                textColor={disk.textColor}
                sliderColor={disk.sliderColor}
                font={disk.font}
              />
            </FadingDisk>
          ) : (
            <FloppyDisk
              notes={disk.notes}
              floppyColor={disk.floppyColor}
              labelColor={disk.labelColor}
              labelSecondColor={disk.labelSecondColor}
              textColor={disk.textColor}
              sliderColor={disk.sliderColor}
              font={disk.font}
            />
          )}
        </AnimatedDisk>
      ))}
    </StyledDiskContainer>
  );
};

export default FloppyDiskStack;
