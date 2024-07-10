import type { Category, Mix, Track } from "db/types";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";

export type Favourite = {
  mcKey: string;
};

export type MixcloudContextState = {
  isReady: boolean;
  mcKey: string;
  mcUrl: string;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  controls: {
    fetchRandomMcKey: () => Promise<string>;
    fetchRandomMcKeyByCategory: (category: string | null) => Promise<string>;
    handleLoad: (localMcKey?: string) => void;
    handleLoadRandom: (category?: string) => void;
    handleLoadRandomFavourite: () => void;
    handleNext: () => void;
    handlePause: () => void;
    handlePlay: () => void;
    handlePlayPause: () => void;
    handlePrevious: () => void;
  };
  favourites: {
    addFavourite: (localMcKey: string) => void;
    favouritesList: Favourite[];
    isFavourite: (localMcKey: string) => boolean;
    removeFavourite: (localMcKey: string) => void;
    setFavouritesList: React.Dispatch<React.SetStateAction<Favourite[]>>;
  };
  filters: {
    mixes: Mix[];
    categories: Category[] | undefined;
    selectedCategory: string | null | undefined;
    selectedTag: string;
    setMixes: React.Dispatch<React.SetStateAction<Mix[]>>;
    setSelectedCategory: React.Dispatch<
      React.SetStateAction<string | null | undefined>
    >;
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
  screen: {
    holdingMessage: string | undefined;
    setHoldingMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
    setTemporaryMessage: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
    temporaryMessage: string | undefined;
  };
  session: {
    burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
    displayLength: number;
    handleCloseModal: () => void;
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
    scale: number;
    secondsRemaining: number | null;
    setDisplayLength: React.Dispatch<React.SetStateAction<number>>;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
    setScale: React.Dispatch<React.SetStateAction<number>>;
    setThemeName: React.Dispatch<React.SetStateAction<string>>;
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
