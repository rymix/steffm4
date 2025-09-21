/* eslint-disable unicorn/no-useless-undefined */

import type { Favourite, Progress } from "contexts/mixcloud/types";
import type { BackgroundExtended, Category, Mix, Track } from "db/types";
import usePersistedState from "hooks/usePersistedState";
import { useRef, useState } from "react";
import {
  AUTO_CHANGE_BACKGROUND,
  DEFAULT_BACKGROUND,
  DEFAULT_ENABLE_AUDIO,
  DEFAULT_THEME,
  DEFAULT_VOLUME,
  VOLUME_AVAILABLE,
} from "utils/constants";

/**
 * Core shared state hook for Mixcloud functionality
 * Contains essential shared state that other hooks depend on
 */
export const useMixcloudCore = (): MixcloudCoreState => {
  // ================================================================
  // REFS AND IMMUTABLE STATE
  // ================================================================

  // #region Core Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mcKeyRef = useRef<string>(
    "/rymixxx/adventures-in-decent-music-volume-1/",
  );
  const wasShareLink = useRef<boolean>(false);
  const dynamicRouteHandledRef = useRef<boolean>(false);
  const jupiterCaseRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // #endregion

  // #region Timer and Timeout Refs
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // #endregion

  // #region Event and Detection Refs
  const endedEventRef = useRef<boolean>(false);
  // #endregion

  // ================================================================
  // PERSISTED STATE (localStorage)
  // ================================================================

  // #region User Preferences
  const [playerTheme, setPlayerTheme] = usePersistedState<"Jupiter" | "Dx7">(
    "playerTheme",
    "Jupiter",
  );
  const [volume, setVolume] = usePersistedState<number>(
    "volume",
    VOLUME_AVAILABLE ? DEFAULT_VOLUME : 0,
  );
  const [enableAudio, setEnableAudio] = usePersistedState<boolean>(
    "enableAudio",
    DEFAULT_ENABLE_AUDIO,
  );
  const [selectedCategory, setSelectedCategory] = usePersistedState<
    string | null | undefined
  >("selectedCategory", null);
  const [background, setBackground] = usePersistedState<
    BackgroundExtended | undefined
  >("background", DEFAULT_BACKGROUND);
  const [backgroundAutoChange, setBackgroundAutoChange] =
    usePersistedState<boolean>("backgroundAutoChange", AUTO_CHANGE_BACKGROUND);
  const [filterBackgroundCategory, setFilterBackgroundCategory] =
    usePersistedState<string | undefined>(
      "filterBackgroundCategory",
      undefined,
    );
  const [favouritesList, setFavouritesList] = usePersistedState<Favourite[]>(
    "favourites",
    [],
  );
  const [latestMcKey, setLatestMcKey] = usePersistedState<string>(
    "latestMcKey",
    "",
  );
  const [latestProgress, setLatestProgress] = usePersistedState<number>(
    "latestProgress",
    0,
  );
  const [progress, setProgress] = usePersistedState<Progress[]>("progress", []);
  const [dx7ScreenLight, setDx7ScreenLight] = usePersistedState<boolean>(
    "dx7ScreenLight",
    true,
  );
  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] =
    usePersistedState<boolean>("keyboardShortcutsEnabled", true);
  const [themeName, setThemeName] = usePersistedState<string>(
    "themeName",
    DEFAULT_THEME,
  );
  // #endregion

  // ================================================================
  // COMPONENT STATE
  // ================================================================

  // #region Core State
  const [isReady, setIsReady] = useState<boolean>(false);
  const [tempRouteValue, setTempRouteValue] = useState<string | null>(null);
  // #endregion

  // #region Widget State
  const [loaded, setLoaded] = useState<boolean>(false);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const [playerUpdated, setPlayerUpdated] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [widgetUrl, setWidgetUrl] = useState<string>("");
  // #endregion

  // #region Mix and Track Data
  const [mixDetails, setMixDetails] = useState<Mix | undefined>(undefined);
  const [trackDetails, setTrackDetails] = useState<Track | undefined>(
    undefined,
  );
  const [mixDuration, setMixDuration] = useState<number>(0);
  const [mixProgress, setMixProgress] = useState<number>(0);
  const [mixProgressPercent, setMixProgressPercent] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [trackProgressPercent, setTrackProgressPercent] = useState<number>(0);
  const [sectionNumber, setSectionNumber] = useState<number>(1);
  const [showUnavailable, setShowUnavailable] = useState<boolean>(false);
  // #endregion

  // #region Filters and Categories
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined,
  );
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  // #endregion

  return {
    // Refs
    refs: {
      iframe: iframeRef,
      mcKey: mcKeyRef,
      wasShareLink,
      dynamicRouteHandled: dynamicRouteHandledRef,
      jupiterCase: jupiterCaseRef,
      burgerMenu: burgerMenuRef,
      modal: modalRef,
      pauseTimeout: pauseTimeoutRef,
      timer: timerRef,
      endedEvent: endedEventRef,
    },

    // Persisted State
    preferences: {
      playerTheme,
      setPlayerTheme,
      volume,
      setVolume,
      enableAudio,
      setEnableAudio,
      selectedCategory,
      setSelectedCategory,
      background,
      setBackground,
      backgroundAutoChange,
      setBackgroundAutoChange,
      filterBackgroundCategory,
      setFilterBackgroundCategory,
      favouritesList,
      setFavouritesList,
      latestMcKey,
      setLatestMcKey,
      latestProgress,
      setLatestProgress,
      progress,
      setProgress,
      dx7ScreenLight,
      setDx7ScreenLight,
      keyboardShortcutsEnabled,
      setKeyboardShortcutsEnabled,
      themeName,
      setThemeName,
    },

    // Core State
    core: {
      isReady,
      setIsReady,
      tempRouteValue,
      setTempRouteValue,
    },

    // Widget State
    widget: {
      loaded,
      setLoaded,
      scriptLoaded,
      setScriptLoaded,
      player,
      setPlayer,
      playerUpdated,
      setPlayerUpdated,
      playing,
      setPlaying,
      widgetUrl,
      setWidgetUrl,
    },

    // Mix and Track Data
    data: {
      mixDetails,
      setMixDetails,
      trackDetails,
      setTrackDetails,
      mixDuration,
      setMixDuration,
      mixProgress,
      setMixProgress,
      mixProgressPercent,
      setMixProgressPercent,
      trackProgress,
      setTrackProgress,
      trackProgressPercent,
      setTrackProgressPercent,
      sectionNumber,
      setSectionNumber,
      showUnavailable,
      setShowUnavailable,
    },

    // Filters
    filters: {
      categories,
      setCategories,
      mixes,
      setMixes,
      selectedTag,
      setSelectedTag,
    },
  };
};

export type MixcloudCoreState = ReturnType<typeof useMixcloudCore>;
