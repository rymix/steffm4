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
};

export type FloppyDiskProps = {
  notes: Note;
};
