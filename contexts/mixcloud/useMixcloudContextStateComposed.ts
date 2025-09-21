import type { MixcloudContextState } from "contexts/mixcloud/types";
import useMasterTimer from "hooks/useMasterTimer";
import { mcKeyUnformatter } from "utils/functions";

import {
  useFavourites,
  useMixcloudAPI,
  useMixcloudCore,
  useModalWithTimer,
  useNavigationControls,
  usePlaybackControls,
  useResponsiveDesign,
  useScreenMessages,
  useThemeAndSession,
  useTooltip,
  useWidgetManagement,
} from "./hooks";

/**
 * Composed version of useMixcloudContextState using compositional hooks
 * This maintains the same external interface while being internally modular
 */
const useMixcloudContextStateComposed = (): MixcloudContextState => {
  // ================================================================
  // CORE COMPOSITIONAL HOOKS
  // ================================================================

  // Core shared state - this is the foundation that other hooks depend on
  const coreState = useMixcloudCore();

  // External hooks
  const { subscribe: _subscribe } = useMasterTimer();

  // Specialized compositional hooks
  const favourites = useFavourites(coreState);
  const responsive = useResponsiveDesign(coreState);
  const tooltip = useTooltip();
  const screenMessages = useScreenMessages();
  const modal = useModalWithTimer(coreState);
  const themeAndSession = useThemeAndSession(coreState);
  const api = useMixcloudAPI(coreState);

  // Create playback controls
  const playback = usePlaybackControls(coreState);

  // Create navigation controls with temporary placeholder
  // We need to break the circular dependency here
  const tempNavigation = useNavigationControls(
    coreState,
    favourites,
    // Temporary placeholder for handleLoad - will be replaced below
    (_mcKey: string) => console.log("Temporary handleLoad placeholder", _mcKey),
    api.fetchRandomMcKeyByCategory,
    api.fetchLatestMcKey,
  );

  // Create widget management hook with handleNext from navigation
  const widgetManagement = useWidgetManagement(
    coreState,
    api,
    modal,
    tempNavigation.handleNext,
  );

  // Create final navigation controls with the real handleLoad function
  const navigation = useNavigationControls(
    coreState,
    favourites,
    widgetManagement.handleLoad,
    api.fetchRandomMcKeyByCategory,
    api.fetchLatestMcKey,
  );

  // ================================================================
  // COMPOSE THE EXTERNAL INTERFACE
  // ================================================================

  // Return the same interface as the original hook
  return {
    isReady: coreState.core.isReady,
    mcKey: mcKeyUnformatter(coreState.refs.mcKey.current),
    mcUrl: `https://www.mixcloud.com${coreState.refs.mcKey.current}`,
    setIsReady: coreState.core.setIsReady,
    tempRouteValue: coreState.core.tempRouteValue,

    controls: {
      fetchLatestMcKey: api.fetchLatestMcKey,
      fetchRandomMcKey: api.fetchRandomMcKey,
      fetchRandomMcKeyByCategory: api.fetchRandomMcKeyByCategory,
      handleLoad: widgetManagement.handleLoad,
      handleLoadLatest: navigation.handleLoadLatest,
      handleLoadRandom: navigation.handleRandom,
      handleLoadRandomFavourite: navigation.handleLoadRandomFavourite,
      handleNext: navigation.handleNext,
      handlePause: playback.handlePause,
      handlePlay: playback.handlePlay,
      handlePrevious: navigation.handlePrevious,
      handleRandom: navigation.handleRandom,
      handleSeek: playback.handleSeek,
    },

    favourites: {
      addFavourite: favourites.addFavourite,
      favouritesList: favourites.favouritesList,
      isFavourite: favourites.isFavourite,
      removeFavourite: favourites.removeFavourite,
      setFavouritesList: favourites.setFavouritesList,
    },

    filters: {
      mixes: api.mixes,
      categories: api.categories,
      selectedCategory: navigation.selectedCategory,
      selectedTag: coreState.filters.selectedTag,
      setMixes: coreState.filters.setMixes,
      setSelectedCategory: coreState.preferences.setSelectedCategory,
      setSelectedTag: coreState.filters.setSelectedTag,
      updateSelectedCategory: navigation.updateSelectedCategory,
    },

    history: {
      latestMcKey: coreState.preferences.latestMcKey,
      latestProgress: coreState.preferences.latestProgress,
      progress: coreState.preferences.progress,
      setLatestMcKey: coreState.preferences.setLatestMcKey,
      setLatestProgress: coreState.preferences.setLatestProgress,
      setProgress: coreState.preferences.setProgress,
    },

    mix: {
      categoryName: themeAndSession.categoryName,
      copySharableLink: themeAndSession.copySharableLink,
      duration: coreState.data.mixDuration,
      details: coreState.data.mixDetails,
      favourite: favourites.mixIsFavourite,
      progress: coreState.data.mixProgress,
      progressPercent: coreState.data.mixProgressPercent,
      setDetails: coreState.data.setMixDetails,
      setDuration: coreState.data.setMixDuration,
      setProgress: coreState.data.setMixProgress,
      setProgressPercent: coreState.data.setMixProgressPercent,
      setShowUnavailable: coreState.data.setShowUnavailable,
      showUnavailable: coreState.data.showUnavailable,
    },

    screen: {
      holdingMessage: screenMessages.holdingMessage,
      setHoldingMessage: screenMessages.setHoldingMessage,
      setTemporaryMessage: screenMessages.setTemporaryMessage,
      temporaryMessage: screenMessages.temporaryMessage,
      isResizing: responsive.screen.isResizing,
      screenComponentWidth: responsive.screen.screenComponentWidth,
      screenComponentCharsPerLine:
        responsive.screen.screenComponentCharsPerLine,
    },

    session: {
      background: themeAndSession.background,
      backgroundAutoChange: themeAndSession.backgroundAutoChange,
      burgerMenuRef: coreState.refs.burgerMenu,
      displayLength: responsive.displayLength,
      dx7ScreenLight: themeAndSession.dx7ScreenLight,
      enableAudio: themeAndSession.enableAudio,
      filterBackgroundCategory: themeAndSession.filterBackgroundCategory,
      handleCloseModal: modal.handleCloseModal,
      isAtBottom: responsive.isAtBottom,
      isMobile: responsive.isMobileDevice,
      jupiterCaseRef: coreState.refs.jupiterCase,
      keyboardShortcutsEnabled: themeAndSession.keyboardShortcutsEnabled,
      menuOpen: modal.menuOpen,
      modalContent: modal.modalContent,
      modalHideChrome: modal.modalHideChrome,
      modalOpen: modal.modalOpen,
      modalRef: coreState.refs.modal,
      modalTitle: modal.modalTitle,
      openModal: modal.openModal,
      scale: responsive.scale,
      secondsRemaining: modal.secondsRemaining,
      setBackground: themeAndSession.setBackground,
      setBackgroundAutoChange: themeAndSession.setBackgroundAutoChange,
      setDisplayLength: responsive.setDisplayLength,
      setDx7ScreenLight: themeAndSession.setDx7ScreenLight,
      setEnableAudio: themeAndSession.setEnableAudio,
      setFilterBackgroundCategory: themeAndSession.setFilterBackgroundCategory,
      setIsAtBottom: responsive.setIsAtBottom,
      setIsMobile: responsive.setIsMobileDevice,
      setKeyboardShortcutsEnabled: themeAndSession.setKeyboardShortcutsEnabled,
      setMenuOpen: modal.setMenuOpen,
      setModalContent: modal.setModalContent,
      setModalHideChrome: modal.setModalHideChrome,
      setModalOpen: modal.setModalOpen,
      setModalTitle: modal.setModalTitle,
      setScale: responsive.setScale,
      setThemeName: themeAndSession.setThemeName,
      setTooltipFading: tooltip.setTooltipFading,
      setTooltipMessage: tooltip.setTooltipMessage,
      setTooltipPosition: tooltip.setTooltipPosition,
      setTooltipVisible: tooltip.setTooltipVisible,
      showTooltip: tooltip.showTooltip,
      tooltipFading: tooltip.tooltipFading,
      tooltipMessage: tooltip.tooltipMessage,
      tooltipPosition: tooltip.tooltipPosition,
      tooltipVisible: tooltip.tooltipVisible,
      theme: themeAndSession.theme,
      themeName: themeAndSession.themeName,
    },

    themes: {
      playerTheme: themeAndSession.playerTheme,
      setPlayerTheme: themeAndSession.setPlayerTheme,
    },

    track: {
      details: coreState.data.trackDetails,
      progress: coreState.data.trackProgress,
      progressPercent: coreState.data.trackProgressPercent,
      sectionNumber: coreState.data.sectionNumber,
      setProgress: coreState.data.setTrackProgress,
      setProgressPercent: coreState.data.setTrackProgressPercent,
      setSectionNumber: coreState.data.setSectionNumber,
    },

    widget: {
      changeMix: widgetManagement.changeMix,
      endedEventRef: coreState.refs.endedEvent,
      iframeRef: coreState.refs.iframe,
      loaded: coreState.widget.loaded,
      pauseTimeoutRef: coreState.refs.pauseTimeout,
      player: coreState.widget.player,
      playerUpdated: coreState.widget.playerUpdated,
      playing: coreState.widget.playing,
      scriptLoaded: coreState.widget.scriptLoaded,
      setLoaded: coreState.widget.setLoaded,
      setPlayer: coreState.widget.setPlayer,
      setPlayerUpdated: coreState.widget.setPlayerUpdated,
      setPlaying: coreState.widget.setPlaying,
      setScriptLoaded: coreState.widget.setScriptLoaded,
      setupEventListeners: widgetManagement.setupEventListeners,
      setVolume: coreState.preferences.setVolume,
      volume: coreState.preferences.volume,
      widgetUrl: coreState.widget.widgetUrl,
    },
  };
};

export default useMixcloudContextStateComposed;
