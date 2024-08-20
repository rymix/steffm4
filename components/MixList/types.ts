import type { Mix } from "db/types";

export type MixRowProps = {
  mix: Mix;
  highlight?: string;
  matchType?: any;
  trackMatch?: any;
};

export type StyledMixRowProps = {
  $listenedStatus: "active" | "listened" | "unlistened" | "partial";
};

export type StyledToggleProps = {
  $on?: boolean;
  $default?: boolean;
};

export type TrackListMiniProps = {
  mix: Mix;
  highlight?: string;
};

export type StyledTrackListMiniProps = {
  $on: boolean;
};

export type StyledMixListCategoryProps = {
  $on: boolean;
};
