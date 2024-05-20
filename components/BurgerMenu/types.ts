export type CatalogueProps = {
  autoPlay?: boolean;
  activityTimeout?: number;
  collapsed?: boolean;
  children?: React.ReactNode;
  height?: string;
  url?: string;
  width?: string;
  onBuffering?: () => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
  onPause?: () => void;
  onPlay?: () => void;
  onProgress?: () => void;
  onReady?: (player: any) => void;
};

export type Category = {
  code: string;
  name: string;
};

export type Tag = string;
