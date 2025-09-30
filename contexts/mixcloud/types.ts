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

export type MobileAutoplayDetection = {
  isDetecting: boolean;
  wasPlaying: boolean;
  hasStartedPlaying: boolean;
  detectionStartTime: number;
  shouldShowModal: boolean;
};

// Hook return types for individual hooks
export type PlaybackControlsReturn = {
  // Actions
  handlePlay: () => void;
  handlePause: () => void;
  handleSeek: (_seconds: number) => Promise<boolean>;
  handleVolumeChange: (_newVolume: number) => void;
  togglePlayPause: () => void;
  // State
  playing: boolean;
  volume: number;
  loaded: boolean;
};

export type NavigationControlsReturn = {
  // Actions
  handleNext: () => void;
  handlePrevious: () => void;
  handleRandom: (_category?: string) => Promise<void>;
  handleLoadLatest: () => Promise<void>;
  handleLoadRandomFavourite: () => Promise<void>;
  updateSelectedCategory: (_index: number) => void;
  // State
  selectedCategory: string | null | undefined;
  categories: Category[] | undefined;
};

export type MixcloudAPIReturn = {
  // API functions
  fetchRandomMcKey: () => Promise<string>;
  fetchRandomMcKeyByCategory: (_category: string | null) => Promise<string>;
  fetchLatestMcKey: () => Promise<string>;
  fetchMixDetails: (_mcKey: string) => Promise<Mix>;
  fetchCategories: () => Promise<Category[]>;
  fetchMixes: () => Promise<Mix[]>;
  // State
  categories: Category[] | undefined;
  mixes: Mix[];
};

export type FavouritesReturn = {
  favouritesList: Favourite[];
  isFavourite: (_mcKey: string) => boolean;
  addFavourite: (_mcKey: string) => void;
  removeFavourite: (_mcKey: string) => void;
  getRandomFavouriteMcKey: () => Promise<string>;
  setFavouritesList: React.Dispatch<React.SetStateAction<Favourite[]>>;
  mixIsFavourite: boolean;
};

export type ResponsiveDesignReturn = {
  scale: Scale;
  setScale: React.Dispatch<React.SetStateAction<Scale>>;
  displayLength: number;
  setDisplayLength: React.Dispatch<React.SetStateAction<number>>;
  isMobileDevice: boolean;
  setIsMobileDevice: React.Dispatch<React.SetStateAction<boolean>>;
  isAtBottom: boolean;
  setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
  touchStartY: number;
  setTouchStartY: React.Dispatch<React.SetStateAction<number>>;
  swipeDistance: number;
  setSwipeDistance: React.Dispatch<React.SetStateAction<number>>;
  screen: {
    isResizing: boolean;
    screenComponentWidth: number;
    screenComponentCharsPerLine: number;
  };
  detectMobileDevice: () => boolean;
  handleResize: () => void;
};

export type ScreenMessagesReturn = {
  temporaryMessage: string | undefined;
  holdingMessage: string | undefined;
  setTemporaryMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setHoldingMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type ThemeAndSessionReturn = {
  theme: DefaultTheme;
  themeName: string;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  playerTheme: "Jupiter" | "Dx7";
  setPlayerTheme: React.Dispatch<React.SetStateAction<"Jupiter" | "Dx7">>;
  background: BackgroundExtended | undefined;
  setBackground: React.Dispatch<
    React.SetStateAction<BackgroundExtended | undefined>
  >;
  backgroundAutoChange: boolean;
  setBackgroundAutoChange: React.Dispatch<React.SetStateAction<boolean>>;
  filterBackgroundCategory: string | undefined;
  setFilterBackgroundCategory: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  displayLength: number;
  dx7ScreenLight: boolean;
  setDx7ScreenLight: React.Dispatch<React.SetStateAction<boolean>>;
  enableAudio: boolean;
  setEnableAudio: React.Dispatch<React.SetStateAction<boolean>>;
  keyboardShortcutsEnabled: boolean;
  setKeyboardShortcutsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  copySharableLink: (_localMix?: Mix) => void;
  categoryName: string;
};

export type TooltipReturn = {
  tooltipMessage: string | null;
  setTooltipMessage: React.Dispatch<React.SetStateAction<string | null>>;
  tooltipVisible: boolean;
  setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
  tooltipFading: boolean;
  setTooltipFading: React.Dispatch<React.SetStateAction<boolean>>;
  tooltipPosition: { x: number; y: number };
  setTooltipPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  showTooltip: (_message: string, _x: number, _y: number) => void;
  hideTooltip: () => void;
  cleanup: () => void;
  refs: {
    tooltipTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
    tooltipFadeTimer: React.MutableRefObject<ReturnType<
      typeof setTimeout
    > | null>;
  };
};

export type ModalWithTimerReturn = {
  modalContent: ReactNode | null;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle: string | null;
  setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
  modalHideChrome: boolean;
  setModalHideChrome: React.Dispatch<React.SetStateAction<boolean>>;
  secondsRemaining: number | null;
  setSecondsRemaining: React.Dispatch<React.SetStateAction<number | null>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: (
    _content: ReactNode,
    _title?: string,
    _seconds?: number,
    _hideChrome?: boolean,
    _disableShortcuts?: boolean,
  ) => void;
  handleCloseModal: () => void;
  startTimer: (_seconds: number) => void;
  stopTimer: () => void;
};

export type WidgetManagementReturn = {
  changeMix: (_mixKey: string, _autoplay?: boolean) => void;
  setupEventListeners: (_widgetInstance: any) => void;
  handleLoad: (_localMcKey?: string, _isDynamicRoute?: boolean) => void;
  mobileAutoplayTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
  mobileAutoplayDetectionRef: React.MutableRefObject<MobileAutoplayDetection>;
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
    isResizing: boolean;
    screenComponentWidth: number;
    screenComponentCharsPerLine: number;
  };
  session: {
    background: BackgroundExtended | undefined;
    backgroundAutoChange: boolean;
    burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
    displayLength: number;
    dx7ScreenLight: boolean;
    enableAudio: boolean;
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
    setDx7ScreenLight: React.Dispatch<React.SetStateAction<boolean>>;
    setEnableAudio: React.Dispatch<React.SetStateAction<boolean>>;
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
  themes: {
    playerTheme: "Jupiter" | "Dx7";
    setPlayerTheme: React.Dispatch<React.SetStateAction<"Jupiter" | "Dx7">>;
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
