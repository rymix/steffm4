// components/Floppy/types.ts

import { JSX } from "react";

export type DiskLabel = {
  trackName?: string;
  artistName?: string;
};

export type FloppyDiskStackProps = {
  label?: DiskLabel;
};

export type DiskProps = {
  id: number;
  notes: JSX.Element[];
  startRotate: number;
  endRotate: number;
  finalX: number;
  finalY: number;
  startX: number;
  floppyColor: string;
  labelColor: string;
  labelSecondColor: string;
  textColor: string;
  sliderColor: string;
  font: string;
  randomValues: {
    fontSize: number;
    rotation: number;
    fontSizeMobile: number;
  };
};

export type FloppyDiskProps = {
  notes: JSX.Element[];
  floppyColor: string;
  labelColor: string;
  labelSecondColor: string;
  textColor: string;
  sliderColor: string;
  font: string;
  randomValues: {
    fontSize: number;
    rotation: number;
    fontSizeMobile: number;
  };
};
