import type { Category, Mix, Track } from "db/types";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";

export type MixcloudContextState = {
  initialized: boolean;
  mcKey: string;
  mcUrl: string;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
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
  session: {
    burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
    holdingMessage: string;
    isMobile: boolean;
    menuOpen: boolean;
    modalContent: ReactNode | null;
    modalOpen: boolean;
    modalRef: React.MutableRefObject<HTMLDivElement | null>;
    modalTitle: string | null;
    openModal: (
      content: ReactNode,
      title?: string | null,
      seconds?: number,
    ) => void;
    secondsRemaining: number | null;
    setHoldingMessage: React.Dispatch<React.SetStateAction<string>>;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
    setTemporaryMessage: React.Dispatch<React.SetStateAction<string>>;
    setThemeName: React.Dispatch<React.SetStateAction<string>>;
    temporaryMessage: string;
    theme: DefaultTheme;
    themeName: string;
  };
  track: {
    details: Track | undefined;
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
