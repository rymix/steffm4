import type { Mix } from "db/types";

export type MixRowProps = {
  mix: Mix;
};

export type StyledMixRowProps = {
  $listenedStatus: "active" | "listened" | "unlistened" | "partial";
};

export type TrackListMiniProps = {
  mix: Mix;
};

export type StyledTrackListMiniProps = {
  $on: boolean;
};

export type StyledMixListCategoryProps = {
  $on: boolean;
};
