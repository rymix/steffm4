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
