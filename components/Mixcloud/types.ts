import type { CSSProperties } from "react";
import type { ShowsDataType } from "sources/mixmotion-main/src/lib";

export type MixcloudProps = {
  autoPlay?: boolean;
  activityTimeout?: number;
  backdropVideoList?: string[];
  collapsed?: boolean;
  children?: React.ReactNode;
  // customButtons?: ButtonProps[];
  enableBackdropVideo?: boolean;
  enableUserLink?: boolean;
  height?: string;
  listIndex?: number;
  showWidget?: boolean;
  showsData?: ShowsDataType;
  style?: CSSProperties;
  url?: string;
  withExclusives?: boolean;
  width?: string;
  onBuffering?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onReady?: (player: any) => void;
};
