import type { Category, Mix } from "db/types";

export type MixcloudContextState = {
  mcKey: string;
  mcUrl: string;
  setMcKey: React.Dispatch<React.SetStateAction<string>>;
  controls: {
    fetchRandomMcKey: () => Promise<string>;
    fetchRandomMcKeyByCategory: (category: string | null) => Promise<string>;
    handleLoad: (localMcKey?: string) => void;
    handleNext: () => void;
    handlePause: () => void;
    handlePlay: () => void;
    handlePlayPause: () => void;
    handlePrevious: () => void;
    mcKeyNext: string;
    mcKeyPrevious: string;
    setMcKeyNext: React.Dispatch<React.SetStateAction<string>>;
    setMcKeyPrevious: React.Dispatch<React.SetStateAction<string>>;
  };
  filters: {
    mixes: Mix[];
    categories: Category[] | undefined;
    selectedCategory: string | null;
    selectedTag: string;
    setMixes: React.Dispatch<React.SetStateAction<Mix[]>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
    updateSelectedCategory: (index: number) => void;
  };
  mix: {
    categoryName: string;
    duration: number;
    details: Mix | undefined;
    progress: number;
    progressPercent: number;
    setDetails: React.Dispatch<React.SetStateAction<Mix | undefined>>;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    setProgressPercent: React.Dispatch<React.SetStateAction<number>>;
    setShowUnavailable: React.Dispatch<React.SetStateAction<boolean>>;
    showUnavailable: boolean;
  };
  track: {
    progress: number;
    progressPercent: number;
    sectionNumber: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    setProgressPercent: React.Dispatch<React.SetStateAction<number>>;
    setSectionNumber: React.Dispatch<React.SetStateAction<number>>;
  };
  widget: {
    iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
    loaded: boolean;
    player: any;
    playerUpdated: boolean;
    playing: boolean;
    scriptLoaded: boolean;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayer: React.Dispatch<React.SetStateAction<any>>;
    setPlayerUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    volume: number;
    widgetUrl: string;
  };
};
