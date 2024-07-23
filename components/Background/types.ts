import { BackgroundExtended } from "db/types";

export type BackgroundProps = {
  background: BackgroundExtended | undefined;
};

export type StyledBackgroundProps = {
  $background: BackgroundExtended | undefined;
};
