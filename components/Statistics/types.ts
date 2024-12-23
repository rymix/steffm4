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
  tagCounts: TopTagCount[];
  top10TagCounts: TopTagCount[];
  averageMixDuration: string;
  artistTrackCounts: TopTrackCount[];
  top10ArtistTrackCounts: TopTrackCount[];
  remixArtistTrackCounts: TopTrackCount[];
  top10RemixArtistTrackCounts: TopTrackCount[];
  publisherCounts: TopTrackCount[];
  top10PublisherCounts: TopTrackCount[];
};
