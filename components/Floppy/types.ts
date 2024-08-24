// components/Floppy/types.ts

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
  textColor: string;
  sliderColor: string;
  font: string;
};

export type FloppyDiskProps = {
  notes: JSX.Element[];
  floppyColor: string;
  labelColor: string;
  textColor: string;
  sliderColor: string;
  font: string;
};
