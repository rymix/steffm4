// components/Floppy/types.ts

export type Note = {
  paragraphs: JSX.Element[];
};

export type Notes = Note[];

export type FloppyDiskStackProps = {
  notesList: Notes;
  onAddDisk: () => void;
};

export type DiskProps = {
  id: number;
  notes: Note;
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
  notes: Note;
  floppyColor: string;
  labelColor: string;
  textColor: string;
  sliderColor: string;
  font: string;
};
