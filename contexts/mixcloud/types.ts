export type MixcloudContextState = {
  collapsed: boolean;
  duration: number;
  loaded: boolean;
  mcKey: string;
  player: any;
  playing: boolean;
  progress: number;
  scriptLoaded: boolean;
  shows: string[];
  showIndex: number;
  showUnavailable: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setMcKey: React.Dispatch<React.SetStateAction<string>>;
  setPlayer: React.Dispatch<React.SetStateAction<any>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setShows: React.Dispatch<React.SetStateAction<string[]>>;
  setShowIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowUnavailable: React.Dispatch<React.SetStateAction<boolean>>;
};
