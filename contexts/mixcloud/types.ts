export type MixcloudContextState = {
  collapsed: boolean;
  duration: number;
  handleLoad: (localMcKey?: string) => void;
  handlePlayPause: () => void;
  handleVolumeDown: () => void;
  handleVolumeUp: () => void;
  loaded: boolean;
  mcKey: string;
  mcUrl: string;
  player: any;
  playing: boolean;
  progress: number;
  scriptLoaded: boolean;
  showUnavailable: boolean;
  volume: number;
  volumeIndex: number;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setMcKey: React.Dispatch<React.SetStateAction<string>>;
  setPlayer: React.Dispatch<React.SetStateAction<any>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUnavailable: React.Dispatch<React.SetStateAction<boolean>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  setVolumeIndex: React.Dispatch<React.SetStateAction<number>>;
};
