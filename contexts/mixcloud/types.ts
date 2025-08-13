import type { BackgroundExtended, Category, Mix, Track } from "db/types";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";

export type Favourite = {
  mcKey: string;
};

export type Progress = {
  complete: boolean;
  mcKey: string;
  seconds: number;
};

export type Scale = {
  x: number;
  y: number;
};

export type MixcloudContextState = {
  isReady: boolean;
  mcKey: string;
  mcUrl: string;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  tempRouteValue: string | null;
  controls: {
    fetchLatestMcKey: () => Promise<string>;
    fetchRandomMcKey: () => Promise<string>;
    fetchRandomMcKeyByCategory: (_category: string | null) => Promise<string>;
    handleLoad: (_localMcKey?: string) => void;
    handleLoadLatest: () => Promise<void>;
    handleLoadRandom: (_category?: string) => Promise<void>;
    handleLoadRandomFavourite: () => Promise<void>;
    handleNext: () => void;
    handlePause: () => void;
    handlePlay: () => void;
    handlePrevious: () => void;
    handleRandom: (_category?: string) => Promise<void>;
    handleSeek: (_seconds: number) => Promise<boolean>;
  };
  favourites: {
    addFavourite: (_localMcKey: string) => void;
    favouritesList: Favourite[];
    isFavourite: (_localMcKey: string) => boolean;
    removeFavourite: (_localMcKey: string) => void;
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
    updateSelectedCategory: (_index: number) => void;
  };
  history: {
    latestMcKey: string;
    latestProgress: number;
    progress: Progress[];
    setLatestMcKey: React.Dispatch<React.SetStateAction<string>>;
    setLatestProgress: React.Dispatch<React.SetStateAction<number>>;
    setProgress: React.Dispatch<React.SetStateAction<Progress[]>>;
  };
  mix: {
    categoryName: string;
    copySharableLink: (_localMix?: Mix) => void;
    duration: number;
    details: Mix | undefined;
    favourite: boolean | undefined;
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
    background: BackgroundExtended | undefined;
    backgroundAutoChange: boolean;
    burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
    displayLength: number;
    filterBackgroundCategory: string | undefined;
    handleCloseModal: () => void;
    isAtBottom: boolean;
    isMobile: boolean;
    jupiterCaseRef: React.MutableRefObject<HTMLDivElement | null>;
    keyboardShortcutsEnabled: boolean;
    menuOpen: boolean;
    modalContent: ReactNode | null;
    modalHideChrome: boolean;
    modalOpen: boolean;
    modalRef: React.MutableRefObject<HTMLDivElement | null>;
    modalTitle: string | null;
    openModal: (
      _content: ReactNode,
      _title?: string | undefined,
      _seconds?: number | undefined,
      _hideChrome?: boolean,
      _disableShortcuts?: boolean,
    ) => void;
    scale: Scale | null;
    secondsRemaining: number | null;
    setBackground: React.Dispatch<
      React.SetStateAction<BackgroundExtended | undefined>
    >;
    setBackgroundAutoChange: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayLength: React.Dispatch<React.SetStateAction<number>>;
    setFilterBackgroundCategory: React.Dispatch<
      React.SetStateAction<string | undefined>
    >;
    setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
    setKeyboardShortcutsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
    setModalHideChrome: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
    setScale: React.Dispatch<React.SetStateAction<Scale>>;
    setThemeName: React.Dispatch<React.SetStateAction<string>>;
    setTooltipFading: React.Dispatch<React.SetStateAction<boolean>>;
    setTooltipMessage: React.Dispatch<React.SetStateAction<string | null>>;
    setTooltipPosition: React.Dispatch<
      React.SetStateAction<{ x: number; y: number }>
    >;
    setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
    showTooltip: (_message: string, _x: number, _y: number) => void;
    tooltipFading: boolean;
    tooltipMessage: string | null;
    tooltipPosition: { x: number; y: number };
    tooltipVisible: boolean;
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
    changeMix: (_mixKey: string, _autoplay: boolean) => void;
    endedEventRef: React.MutableRefObject<boolean>;
    iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
    loaded: boolean;
    pauseTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
    player: any;
    playerUpdated: boolean;
    playing: boolean;
    scriptLoaded: boolean;
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayer: React.Dispatch<React.SetStateAction<any>>;
    setPlayerUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setScriptLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    setupEventListeners: (_widgetInstance: any) => void;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    volume: number;
    widgetUrl: string;
  };
};
