export type NoteParagraph = {
  text: string;
  emphasize?: boolean;
};

export type Note = {
  paragraphs: NoteParagraph[];
};

export type NotesList = Note[];

export type FloppyDiskStackProps = {
  notesList: string[];
  onAddDisk: () => void;
};

export type DiskProps = {
  id: number;
  notes: string;
  startRotate: number;
  endRotate: number;
  finalX: number;
  finalY: number;
};

export type FloppyDiskProps = {
  notes: string;
};
