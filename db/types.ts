export type Track = {
  artistName: string;
  coverArtDate: string;
  coverArtLarge: string;
  coverArtSmall: string;
  localCoverArtLarge: string;
  localCoverArtSmall: string;
  publisher: string;
  remixArtistName?: string;
  sectionNumber: number;
  startTime: string;
  trackName: string;
};

export type Category = {
  index: number;
  code: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
};

export type Mix = {
  category: Category["code"];
  coverArtDate: string;
  coverArtLarge: string;
  coverArtSmall: string;
  duration: string;
  fileName: string;
  listOrder: number;
  mixcloudKey: string;
  name: string;
  notes?: string;
  releaseDate: string;
  shortName: string;
  tags: string[];
  tracks: Track[];
};

export type Database = {
  categories: Category[];
  mixes: Mix[];
};
