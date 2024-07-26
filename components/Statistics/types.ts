export type CategoryMixCount = {
  category: string;
  count: number;
};

export type TopTrackCount = {
  name?: string;
  artistName?: string;
  remixArtistName?: string;
  publisher?: string;
  count: number;
};

export type TopTagCount = {
  tag: string;
  count: number;
};

export type Stats = {
  mixCount: number;
  trackCount: number;
  totalDuration: string;
  categoryMixCounts: CategoryMixCount[];
  tagCounts: { tag: string; count: number }[];
  averageMixDuration: string;
  top10ArtistTrackCounts: TopTrackCount[];
  top10RemixArtistTrackCounts: TopTrackCount[];
  top10PublisherCounts: TopTrackCount[];
};
