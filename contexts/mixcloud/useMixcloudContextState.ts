/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/no-useless-undefined */

import type {
  Favourite,
  MixcloudContextState,
  Progress,
  Scale,
} from "contexts/mixcloud/types";
import type { BackgroundExtended, Category, Mix, Track } from "db/types";
import useMasterTimer from "hooks/useMasterTimer";
import usePersistedState from "hooks/usePersistedState";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import themes from "styles/themes";
import {
  AUTO_CHANGE_BACKGROUND,
  DEBUG,
  DEFAULT_BACKGROUND,
  DEFAULT_MESSAGE,
  DEFAULT_VOLUME,
  DISPLAY_LENGTH,
  GA4,
  VOLUME_AVAILABLE,
} from "utils/constants";
import {
  convertTimeToHumanReadable,
  convertTimeToSeconds,
  copyToClipboard,
  mcKeyFormatter,
  mcKeyUnformatter,
  mcKeyUrlFormatter,
  mcWidgetUrlFormatter,
} from "utils/functions";

const useMixcloudContextState = (): MixcloudContextState => {
  // #region State and ref vars
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const endedEventRef = useRef<boolean>(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { subscribe } = useMasterTimer();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [lastMixUpdateTime, setLastMixUpdateTime] = useState<number | null>(
    null,
  );
  const [lastTrackUpdateTime, setLastTrackUpdateTime] = useState<number | null>(
    null,
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const mcKeyRef = useRef<string>("/rymixxx/adventures-in-decent-music-volume-1/");
  const wasShareLink = useRef<boolean>(false);
  const dynamicRouteHandledRef = useRef<boolean>(false);
  const testRef = useRef<string>("NOT_SET");
  const [tempRouteValue, setTempRouteValue] = useState<string | null>(null);
  
  const setTestValue = (value: string) => {
    testRef.current = value;
    console.log("🧪 TEST REF SET TO:", value);
  };

  const setTempRouteValueFromRoute = (value: string | null) => {
    console.log("🎵 TEMP route value set:", value);
    if (value === null) {
      console.trace("🎵 TEMP route value being cleared - stack trace:");
    }
    setTempRouteValue(value);
    
    // Update mcKeyRef when temp value is set
    if (value) {
      const formattedKey = mcKeyFormatter(value);
      console.log("🎵 Updating mcKeyRef from temp route value:", formattedKey);
      mcKeyRef.current = formattedKey;
    }
  };
  const [mixDetails, setMixDetails] = useState<Mix | undefined>();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [mixProgress, setMixProgress] = useState<number>(0);
  const [mixProgressPercent, setMixProgressPercent] = useState<number>(0);
  const [player, setPlayer] = useState<any>(null);
  const [playerUpdated, setPlayerUpdated] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [keyboardShortcutsEnabled, setKeyboardShortcutsEnabled] =
    useState<boolean>(true);

  const jupiterCaseRef = useRef<HTMLDivElement>(null);

  // Add a validation function to sync playing state
  const validatePlayingState = useCallback(async () => {
    if (!player) return;

    try {
      const isPaused = await player.getIsPaused();
      const isPlaying = !isPaused; // Convert paused state to playing state
      if (isPlaying !== playing) {
        if (DEBUG)
          console.warn(
            `Playing state out of sync. UI: ${playing}, Widget: ${isPlaying} (paused: ${isPaused}). Correcting UI state.`,
          );
        setPlaying(isPlaying);
      }
    } catch (error) {
      console.error("Error validating playing state:", error);
    }
  }, [player, playing]);

  const [scale, setScale] = useState<Scale>({ x: 1, y: 1 });
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = usePersistedState<
    string | null | undefined
  >("selectedCategory", null);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [showUnavailable, setShowUnavailable] = useState<boolean>(false);
  const [trackDetails, setTrackDetails] = useState<Track | undefined>();
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [trackProgressPercent, setTrackProgressPercent] = useState<number>(0);
  const [trackSectionNumber, setTrackSectionNumber] = useState<number>(0);
  const [volume, setVolume] = usePersistedState<number>(
    "volume",
    DEFAULT_VOLUME,
  );

  /* Session */
  const [displayLength, setDisplayLength] = useState<number>(DISPLAY_LENGTH);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalHideChrome, setModalHideChrome] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [themeName, setThemeName] = useState<string>("defaultTheme");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const theme = themes[themeName] || themes.defaultTheme;

  /* Screen */
  const [holdingMessage, setHoldingMessage] = useState<string | undefined>(
    DEFAULT_MESSAGE,
  );
  const [temporaryMessage, setTemporaryMessage] = useState<
    string | undefined
  >();

  /* Favourites */
  const [favouritesList, setFavouritesList] = usePersistedState<Favourite[]>(
    "favourites",
    [],
  );
  const [mixIsFavourite, setMixIsFavourite] = useState<boolean>(false);

  /* Progress */
  const [latestMcKey, setLatestMcKey] = usePersistedState<string>(
    "latestMcKey",
    "",
  );
  const [latestProgress, setLatestProgress] = usePersistedState<number>(
    "latestProgress",
    0,
  );
  const [progress, setProgress] = usePersistedState<Progress[]>("progress", []);

  /* Background */
  const [background, setBackground] = usePersistedState<
    BackgroundExtended | undefined
  >("background", DEFAULT_BACKGROUND);
  const [backgroundAutoChange, setBackgroundAutoChange] =
    usePersistedState<boolean>("backgroundAutoChange", AUTO_CHANGE_BACKGROUND);
  const [filterBackgroundCategory, setFilterBackgroundCategory] = useState<
    string | undefined
  >();

  /* Tooltip */
  const [tooltipMessage, setTooltipMessage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipFading, setTooltipFading] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  /* Scroller */
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0); // Store touch start position
  const [swipeDistance, setSwipeDistance] = useState(0);
  // #endregion

  // #region Validate playing state
  // Periodically validate playing state using master timer
  useEffect(() => {
    if (!player) return undefined;

    const unsubscribe = subscribe(
      "validatePlayingState",
      validatePlayingState,
      1000,
    );
    return unsubscribe;
  }, [player, validatePlayingState, subscribe]);

  // #endregion

  // #region Tooltip
  const showTooltip = (message: string, x: number, y: number): void => {
    // Clear any existing tooltip timers
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
    }
    if (tooltipFadeTimerRef.current) {
      clearTimeout(tooltipFadeTimerRef.current);
    }

    setTooltipMessage(message);
    setTooltipPosition({ x, y });
    setTooltipVisible(true);
    setTooltipFading(true);

    tooltipTimerRef.current = setTimeout(() => {
      setTooltipFading(false);
      tooltipFadeTimerRef.current = setTimeout(() => {
        setTooltipVisible(false);
        setTooltipMessage(null);
        tooltipFadeTimerRef.current = null;
      }, 1000);
      tooltipTimerRef.current = null;
    }, 2000);
  };
  // #endregion

  // #region Progress
  const updateProgressHistory = (
    localMcKey: string,
    seconds: number,
    complete: boolean,
  ): void => {
    const newProgress: Progress = { mcKey: localMcKey, seconds, complete };
    setProgress((prevProgress) => {
      // Remove any existing entry for the same mcKey
      const filteredProgress = prevProgress.filter(
        (p) => p.mcKey !== localMcKey,
      );
      return [...filteredProgress, newProgress];
    });
  };

  useEffect(() => {
    const percentageListened = (mixProgress / duration) * 100;
    const isComplete = percentageListened >= 95;

    updateProgressHistory(mcKeyRef.current, mixProgress, isComplete);
    setLatestMcKey(mcKeyRef.current);
    setLatestProgress(mixProgress);
  }, [mixProgress, duration]);
  // #endregion

  // #region Sharable link
  const copySharableLink = (localMix?: Mix): void => {
    let sharableKey = mcKeyRef.current;

    if (localMix) {
      sharableKey = localMix.mixcloudKey;
    }

    sharableKey = sharableKey.replaceAll("/rymixxx/", "").replaceAll("/", "");
    copyToClipboard(`https://stef.fm/${sharableKey}`);
    setTemporaryMessage("Sharable link copied to clipboard");
    if (DEBUG)
      console.log(
        "Share button clicked - temporaryMessage set to:",
        "Sharable link copied to clipboard",
      );

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: `Share Link ${sharableKey}`,
      });
    }
  };
  // #endregion

  // #region Favourites
  const addFavourite = (localMcKey: string): void => {
    const newFavouritesList = [
      ...favouritesList,
      { mcKey: mcKeyUnformatter(localMcKey) },
    ];
    setFavouritesList(newFavouritesList);
  };

  const removeFavourite = (localMcKey: string): void => {
    const newFavouritesList = favouritesList.filter(
      (fav) => fav.mcKey !== mcKeyUnformatter(localMcKey),
    );
    setFavouritesList(newFavouritesList);
  };

  const isFavourite = (localMcKey: string): boolean => {
    const localIsFavourite = favouritesList.some((fav) =>
      localMcKey.includes(fav.mcKey),
    );
    return localIsFavourite;
  };

  useEffect(() => {
    setMixIsFavourite(isFavourite(mcKeyRef.current));
  }, [favouritesList]);
  // #endregion

  // #region Screen
  useEffect(() => {
    if (mixDetails) {
      const mixMessage = [
        mixDetails.name,
        mixDetails.notes,
        mixDetails.releaseDate,
        mixDetails.duration
          ? convertTimeToHumanReadable(mixDetails.duration, "!")
          : undefined,
      ]
        .filter(Boolean)
        .join(" - ");
      setHoldingMessage(mixMessage);
    }
  }, [
    mixDetails?.name,
    mixDetails?.notes,
    mixDetails?.releaseDate,
    mixDetails?.duration,
  ]);
  // #endregion

  // #region Modal
  const handleCloseModal = (): void => {
    setModalContent(null);
    setModalOpen(false);
    // Re-enable shortcuts when modal closes (they may have been disabled by the modal)
    setKeyboardShortcutsEnabled(true);
  };

  /* Timer for Modal auto-close */
  const startTimer = useCallback(
    (timerDuration: number): void => {
      setSecondsRemaining(timerDuration);
      clearTimeout(timerRef.current || 0);

      // Use master timer for countdown
      const countdownId = `modalCountdown_${Date.now()}`;
      let currentSeconds = timerDuration;

      const unsubscribeCountdown = subscribe(
        countdownId,
        () => {
          currentSeconds -= 1;
          setSecondsRemaining(currentSeconds);

          if (currentSeconds <= 0) {
            handleCloseModal();
            setSecondsRemaining(null);
            unsubscribeCountdown();
          }
        },
        1000,
      );

      // Main timer to ensure cleanup
      timerRef.current = setTimeout(() => {
        handleCloseModal();
        setSecondsRemaining(null);
        unsubscribeCountdown();
        timerRef.current = null;
      }, timerDuration * 1000);
    },
    [subscribe],
  );

  const stopTimer = (): void => {
    clearTimeout(timerRef.current || 0);
    timerRef.current = null;
    setSecondsRemaining(null);
    handleCloseModal();
  };

  const openModal = useCallback(
    (
      content: ReactNode,
      title?: string | undefined,
      seconds?: number | undefined,
      hideChrome?: boolean,
      disableShortcuts?: boolean,
    ): void => {
      setModalContent(content);
      setModalTitle(title ?? null);
      setModalHideChrome(hideChrome ?? false);
      setModalOpen(true);

      // Disable shortcuts if requested
      if (disableShortcuts === true) {
        setKeyboardShortcutsEnabled(false);
      }

      if (seconds === undefined) {
        setSecondsRemaining(null);
      } else {
        startTimer(seconds);
      }
    },
    [],
  );
  // #endregion

  // #region Set isMobile if small screen
  useEffect(() => {
    const screenLimits = {
      landscape: [
        { width: 320, displayLength: 6 },
        { width: 440, displayLength: 8 },
        { width: 768, displayLength: 16 },
        { width: 880, displayLength: 18 },
        { width: 1000, displayLength: 20 },
        { width: 1052, displayLength: 24 },
      ],
      portrait: [
        { width: 320, displayLength: 6 },
        { width: 440, displayLength: 8 },
        { width: 768, displayLength: 10 },
        { width: 880, displayLength: 18 },
        { width: 1000, displayLength: 20 },
        { width: 1052, displayLength: 24 },
      ],
    };

    const handleResize = (): void => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const isPortrait = windowHeight > windowWidth;
      // const aspectRatio = windowWidth / windowHeight;
      const limits = isPortrait
        ? screenLimits.portrait
        : screenLimits.landscape;

      setIsMobile(windowWidth <= 768);

      const jupiterCaseHeight = jupiterCaseRef.current
        ? jupiterCaseRef.current.offsetHeight
        : 0;

      const jupiterCaseWidth = jupiterCaseRef.current
        ? jupiterCaseRef.current.offsetWidth
        : 0;

      const maxHeight = windowHeight - 40;
      const maxWidth = windowWidth - 40;

      // Calculate the scale factor
      let scaleFactorY = 1;
      if (jupiterCaseHeight > maxHeight) {
        scaleFactorY = maxHeight / jupiterCaseHeight;
      }

      const minScreenWidth = 320;
      const maxScreenWidth = 640;
      const minScale = 0.5;
      const maxScale = 1;

      const scaleFactorX =
        minScale +
        ((maxScale - minScale) *
          (Math.min(Math.max(jupiterCaseWidth, minScreenWidth), maxWidth) -
            minScreenWidth)) /
          (maxScreenWidth - minScreenWidth);

      setScale({ x: scaleFactorX, y: scaleFactorY });

      // Display lengths
      let limit;
      for (let i = 0; i < limits.length - 1; i += 1) {
        if (
          windowWidth >= limits[i].width &&
          windowWidth < limits[i + 1].width
        ) {
          limit = limits[i];
          break;
        }
      }

      if (limits.length > 0) {
        if (windowWidth <= limits[0].width) {
          setDisplayLength(limits[0].displayLength);
        } else {
          const lastLimit = limits.at(-1);
          if (lastLimit && windowWidth >= lastLimit.width) {
            setDisplayLength(lastLimit.displayLength);
          } else if (limit) {
            setDisplayLength(limit.displayLength);
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the state based on the initial window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // #endregion

  // #region Cancel timers and close Modals and Menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }

      if (modalRef.current && !modalRef.current.contains(target)) {
        stopTimer();
      }
    };

    const handleEscapePress = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        stopTimer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [burgerMenuRef, modalRef]);
  // #endregion

  // #region Helpers  
  const mcUrl = mcKeyUrlFormatter(mcKeyRef.current);
  const widgetUrl = mcWidgetUrlFormatter(mcKeyRef.current);

  // Forward declarations for functions used before definition
  let handleNext: () => Promise<void>;
  let fetchMixDetails: (_localMcKey?: string) => Promise<Mix | undefined>;

  // Helper function to set up event listeners on any widget instance
  const setupEventListeners = (widgetInstance: any): void => {
    console.log("🔧 Setting up event listeners");

    widgetInstance.events.play.on(() => {
      console.log("▶️ PLAY event");
      setPlaying(true);
      endedEventRef.current = false;
    });

    widgetInstance.events.pause.on(() => {
      console.log("⏸️ PAUSE event");
      setPlaying(false);

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      pauseTimeoutRef.current = setTimeout(() => {
        if (!endedEventRef.current) {
          console.log("✅ Genuine pause (not end-of-mix)");
        }
        pauseTimeoutRef.current = null;
      }, 500);
    });

    widgetInstance.events.progress.on((position: number, dur?: number) => {
      setMixProgress(position);
      if (dur && dur > 0) {
        setDuration(dur);
        setMixProgressPercent((position / dur) * 100);
      }
    });

    widgetInstance.events.ended.on(() => {
      console.log("🎯 ENDED event - auto-advancing");
      setPlaying(false);
      endedEventRef.current = true;

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }

      setTimeout(() => {
        handleNext();
      }, 500);
    });

    widgetInstance.events.error.on((error: any) => {
      console.log(`❌ ERROR: ${JSON.stringify(error)}`);
    });
  };
  // #endregion

  // General function to change mix - always recreates iframe for maximum reliability
  // (Declared first as it's called by navigation functions)
  const changeMix = (mixKey: string, autoplay = true): void => {
    if (!iframeRef.current) {
      console.log("❌ No iframe reference - cannot change mix");
      return;
    }

    // If temp route value is active, only allow widget initialization, not mix changing
    if (tempRouteValue) {
      console.log("🎵 Temp route active - initializing widget without changing mix:", tempRouteValue);
      // Skip the mix changing part, just do widget initialization
      setTimeout(() => {
        if (!(globalThis as any).Mixcloud?.PlayerWidget) {
          console.log("⏳ Mixcloud script not ready yet, skipping widget initialization");
          return;
        }

        const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(iframeRef.current);
        freshWidget.ready.then(() => {
          console.log(`✅ Widget ready for temp route: ${tempRouteValue}`);
          setPlayer(freshWidget);
          setupEventListeners(freshWidget);
          setPlaying(autoplay);
        });
      }, 1000);
      return;
    }

    console.log(`🔄 Changing mix to: ${mixKey}`);

    // Reset all state
    setMixProgress(0);
    setMixProgressPercent(0);
    setDuration(0);
    setPlaying(false);
    mcKeyRef.current = mixKey;

    // Fetch mix details for the new key
    fetchMixDetails().then((fetchedMixDetails) => {
      if (fetchedMixDetails) {
        setMixDetails(fetchedMixDetails);
      }
    });

    // Create new iframe URL
    const autoplayParam = autoplay ? "&autoplay=1" : "";
    const newWidgetUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&hide_tracklist=1&mini=1${autoplayParam}&feed=${encodeURIComponent(`https://www.mixcloud.com${mixKey}`)}`;

    // Update iframe source
    iframeRef.current.src = newWidgetUrl;

    // Initialize new widget with longer delay for reliability
    setTimeout(() => {
      // Check if Mixcloud script is loaded
      if (!(globalThis as any).Mixcloud?.PlayerWidget) {
        console.log(
          "⏳ Mixcloud script not ready yet, skipping widget initialization",
        );
        return;
      }

      const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(
        iframeRef.current,
      );

      freshWidget.ready
        .then(() => {
          console.log(`✅ Widget ready for: ${mixKey}`);
          setPlayer(freshWidget);
          setupEventListeners(freshWidget);

          // Get duration with retry logic for reliability
          const getDurationWithRetry = async (retries = 3): Promise<void> => {
            try {
              const dur = await freshWidget.getDuration();
              if (dur && dur > 0) {
                console.log(`📏 Duration loaded: ${dur}s`);
                setDuration(dur);
                if (autoplay) setPlaying(true);
              } else if (retries > 0) {
                console.log(
                  `⏳ Duration not ready, retrying... (${retries} attempts left)`,
                );
                setTimeout(() => getDurationWithRetry(retries - 1), 500);
              } else {
                console.log(`❌ Failed to get duration after retries`);
              }
            } catch (error) {
              if (retries > 0) {
                console.log(
                  `❌ Duration error, retrying... (${retries} attempts left)`,
                );
                setTimeout(() => getDurationWithRetry(retries - 1), 500);
              } else {
                console.log(`❌ Duration failed after all retries: ${error}`);
              }
            }
          };

          getDurationWithRetry();
        })
        .catch((error: any) => {
          console.log(`❌ Widget ready failed: ${error}`);
        });
    }, 1500); // Increased from 1000ms to 1500ms for reliability
  };

  // #region Fetch mix data from api
  const fetchRandomMcKey = async (): Promise<string> => {
    const response = await fetch("/api/randomMix");
    const data = await response.json();
    return data.mcKey;
  };

  const fetchRandomMcKeyByCategory = async (
    category: string | null,
  ): Promise<string> => {
    const response = await fetch(`/api/randomMix/${category}`);
    const data = await response.json();
    return data.mcKey;
  };

  const fetchLatestMcKey = async (): Promise<string> => {
    const response = await fetch("/api/latestMixes?count=1");
    const data = await response.json();
    return data[0].mixcloudKey;
  };

  fetchMixDetails = async (localMcKey?: string): Promise<Mix | undefined> => {
    if (!mcKeyRef.current && !localMcKey) return undefined;

    const lookupMcKey = localMcKey || mcKeyRef.current;

    const response = await fetch(`/api/mix/${mcKeyUnformatter(lookupMcKey)}`);
    const data: Mix = await response.json();
    return data;
  };

  const updateSelectedCategory = (index: number): void => {
    const category =
      categories.find((cat) => cat.index === index)?.code || null;
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchCategoryName = async (): Promise<void> => {
      if (!selectedCategory) {
        setCategoryName("");
        return;
      }

      const response = await fetch(`/api/category/${selectedCategory}`);
      const data: string = await response.json();
      setCategoryName(data);
    };

    fetchCategoryName();
  }, [selectedCategory]);
  // #endregion

  // #region Handlers for mix navigation
  // Migrated
  const handlePlay = async (): Promise<void> => {
    if (!player) {
      console.log("❌ No widget available for play");
      return;
    }
    if (playing) {
      console.log("▶️ Already playing - no action needed");
      return;
    }
    console.log("▶️ Playing current mix");
    try {
      await player.play();
    } catch (error) {
      console.log(`❌ Play error: ${error}`);
    }
  };

  // Migrated
  const handlePause = async (): Promise<void> => {
    if (!player) {
      console.log("❌ No widget available for pause");
      return;
    }
    console.log("⏸️ Pausing current mix");
    try {
      await player.pause();
    } catch (error) {
      console.log(`❌ Pause error: ${error}`);
    }
  };

  const handleSeek = useCallback(
    async (seconds: number): Promise<boolean> => {
      try {
        const seekAllowed = await player?.seek(seconds);
        if (seekAllowed) {
          setPlayerUpdated(true);
          return true;
        }
        if (DEBUG) console.log("Seek was not allowed");
        return false;
      } catch (error) {
        console.error("Error in play or seek:", error);
        return false;
      }
    },
    [player, playerUpdated],
  );

  // Navigate to next mix
  handleNext = async (): Promise<void> => {
    const mixIndex = mixes.findIndex((thisMix) =>
      mcKeyRef.current.includes(thisMix.mixcloudKey),
    );

    let nextMix;
    if (!mixes || mixes.length === 0 || mixIndex === -1) {
      nextMix = await fetchRandomMcKey();
    } else {
      const nextIndex = (mixIndex + 1) % mixes.length;
      nextMix = mixes[nextIndex].mixcloudKey;
    }

    console.log(`⏭️ Next: ${nextMix}`);
    changeMix(mcKeyFormatter(nextMix), true);
  };

  // Navigate to previous mix
  const handlePrevious = async (): Promise<void> => {
    const mixIndex = mixes.findIndex((thisMix) =>
      mcKeyRef.current.includes(thisMix.mixcloudKey),
    );

    const previousMix =
      !mixes || mixes.length === 0 || mixIndex === -1
        ? await fetchRandomMcKey()
        : mixes[mixIndex === 0 ? mixes.length - 1 : mixIndex - 1].mixcloudKey;

    console.log(`⏮️ Previous: ${previousMix}`);
    changeMix(mcKeyFormatter(previousMix), true);
  };

  // Load random mix (excluding current)
  const handleRandom = async (category?: string): Promise<void> => {
    let randomMix = await (category && category !== "all"
      ? fetchRandomMcKeyByCategory(category)
      : fetchRandomMcKey());

    randomMix = mcKeyFormatter(randomMix);

    console.log(`🎲 Random: ${randomMix}`);
    changeMix(randomMix, true);
  };

  const handleLoad = (localMcKey?: string, isDynamicRoute = false): void => {
    if (!localMcKey) {
      console.log("❌ No mcKey provided to handleLoad");
      return;
    }

    if (isDynamicRoute) {
      dynamicRouteHandledRef.current = true;
    }

    const formattedKey = mcKeyFormatter(localMcKey);
    console.log(`🎵 handleLoad called:`, {
      originalKey: localMcKey,
      formattedKey,
      currentMcKeyRef: mcKeyRef.current,
      isDynamicRoute
    });
    changeMix(formattedKey, true);
  };

  const handleLoadLatest = async (): Promise<void> => {
    const fetchedLatestMcKey = await fetchLatestMcKey();
    handleLoad(fetchedLatestMcKey);
  };

  const handleLoadRandom = async (category?: string): Promise<void> => {
    if (category && category !== "all") {
      const randomMcKey = await fetchRandomMcKeyByCategory(category);
      handleLoad(randomMcKey);
    } else {
      const randomMcKey = await fetchRandomMcKey();
      handleLoad(randomMcKey);
    }
  };

  const handleLoadRandomFavourite = async (): Promise<void> => {
    if (favouritesList.length === 0) {
      if (DEBUG) console.log("No favourites to load");
      return;
    }

    const randomIndex = Math.floor(Math.random() * favouritesList.length);
    const randomFavourite = favouritesList[randomIndex];
    handleLoad(randomFavourite.mcKey);
  };

  // #endregion

  // #region Calculate Progress
  useEffect(() => {
    const currentTime = Date.now();

    if (mixProgress && duration) {
      const newMixProgressPercent = (mixProgress / duration) * 100;

      if (!lastMixUpdateTime || currentTime - lastMixUpdateTime >= 1000) {
        setMixProgressPercent(newMixProgressPercent);
        setLastMixUpdateTime(currentTime);
      }
    }
  }, [duration, mixProgress, lastMixUpdateTime]);

  useEffect(() => {
    if (!mixDetails || !mixDetails.tracks || mixDetails.tracks.length === 0) {
      setTrackProgress(0);
      setTrackProgressPercent(0);
      setDuration(0);
      return;
    }

    const calculateMixProgress = (): void => {
      setDuration(convertTimeToSeconds(mixDetails.duration));
    };

    const calculateTrackProgress = (): void => {
      const currentMixProgressSeconds = mixProgress;

      const tracks = mixDetails.tracks.map((track) => ({
        ...track,
        startTimeSeconds: convertTimeToSeconds(track.startTime),
      }));

      let currentTrackIndex = tracks.findIndex((track, index) => {
        const nextTrack = tracks[index + 1];
        if (!nextTrack) return true;
        return (
          currentMixProgressSeconds >= track.startTimeSeconds &&
          currentMixProgressSeconds < nextTrack.startTimeSeconds
        );
      });

      if (currentTrackIndex === -1) {
        currentTrackIndex = tracks.length - 1; // If no match, assume last track
      }

      const currentTrack = tracks[currentTrackIndex];
      const nextTrackStartTime =
        tracks[currentTrackIndex + 1]?.startTimeSeconds || duration;
      const trackProgressSeconds =
        currentMixProgressSeconds - currentTrack.startTimeSeconds;
      const trackDuration = nextTrackStartTime - currentTrack.startTimeSeconds;

      const localTrackProgressPercent =
        (trackProgressSeconds / trackDuration) * 100;

      const currentTime = Date.now();

      if (!lastTrackUpdateTime || currentTime - lastTrackUpdateTime >= 1000) {
        setTrackProgress(trackProgressSeconds);
        setTrackProgressPercent(localTrackProgressPercent);
        setTrackSectionNumber(tracks[currentTrackIndex].sectionNumber);
        setTrackDetails(tracks[currentTrackIndex]);
        setLastTrackUpdateTime(currentTime);
      }
    };

    calculateTrackProgress();
    calculateMixProgress();
  }, [mixProgress, mixDetails, duration, lastTrackUpdateTime]);
  // #endregion

  // #region Volume Controls
  useEffect(() => {
    const updateVolume = async (): Promise<void> => {
      if (player) {
        player.setVolume(volume);
      }
    };

    updateVolume();
  }, [player, volume]);

  useEffect(() => {
    if (volume === 0) {
      const minVolumeText = [
        "It's oh so quiet",
        "The Sound of Silence",
        "Silent night, holy night",
        "Don't Stop the Music",
        "Enjoy the Silence",
        "So Quiet In Here",
      ];
      const randomIndex = Math.floor(Math.random() * minVolumeText.length);
      setTemporaryMessage(minVolumeText[randomIndex]);
    } else if (volume === 1) {
      const maxVolumeText = [
        "Up to 11",
        "Let's get loud, let's get loud",
        "Pump up the volume",
        "I Love It Loud",
        "Shout, Shout, Let It All Out",
        "Bring the Noise",
      ];
      const randomIndex = Math.floor(Math.random() * maxVolumeText.length);
      setTemporaryMessage(maxVolumeText[randomIndex]);
    }
  }, [volume]);
  // #endregion

  // #region Media Controls for mobiles etc.
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new globalThis.MediaMetadata({
        title: mixDetails?.name || "Unknown Title",
        artist: trackDetails?.artistName || "Unknown Artist",
        album: mixDetails?.notes || "Unknown Album",
        artwork: [
          {
            src: mixDetails?.coverArtSmall || "",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", handlePlay);
      navigator.mediaSession.setActionHandler("pause", handlePause);
      navigator.mediaSession.setActionHandler("previoustrack", handlePrevious);
      navigator.mediaSession.setActionHandler("nexttrack", handleNext);
    }

    return () => {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("previoustrack", null);
        navigator.mediaSession.setActionHandler("nexttrack", null);
      }
    };
  }, [
    mixDetails,
    trackDetails,
    handlePlay,
    handlePause,
    handlePrevious,
    handleNext,
  ]);
  // #endregion

  // #region Fetch Categories
  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  // #endregion

  // #region Script Loading
  // Load Mixcloud widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;
    script.addEventListener("load", () => {
      setScriptLoaded(true);
      console.log("📜 Mixcloud widget script loaded");
    });

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  // Re-initialize widget when script loads
  useEffect(() => {
    if ((globalThis as any).Mixcloud?.PlayerWidget && mcKeyRef.current && iframeRef.current && !player) {
      console.log("🔄 Script loaded, re-initializing widget");
      changeMix(mcKeyRef.current, false); // Don't autoplay on script load
    }
  }, [scriptLoaded, (globalThis as any).Mixcloud?.PlayerWidget]);
  // #endregion

  // #region Initial Load and Seeking
  const [hasSeeked, setHasSeeked] = useState<boolean>(false);
  const [loadLatestProgress, setLoadLatestProgress] = useState<number>(0);

  // Initial load logic - delayed to allow dynamic routes to set mcKey
  useEffect(() => {
    setLoadLatestProgress(latestProgress || 0);

    const handleInitialLoad = async (): Promise<void> => {
      // If dynamic route already handled loading OR temp route value exists OR was share link, don't override it
      if (dynamicRouteHandledRef.current || tempRouteValue || wasShareLink.current) {
        console.log("🎵 Skipping initial load", {
          dynamicRouteHandled: dynamicRouteHandledRef.current,
          tempRouteValue,
          wasShareLink: wasShareLink.current
        });
        return;
      }
      
      // Check for latest progress first
      if (latestMcKey) {
        console.log("🎵 Loading latest progress mix:", latestMcKey);
        handleLoad(latestMcKey);
      }
      // Load based on selected category
      else if (selectedCategory && selectedCategory === "fav") {
        console.log("🎵 Loading random favourite");
        await handleLoadRandomFavourite();
      } else if (selectedCategory && selectedCategory !== "all") {
        console.log("🎵 Loading random from category:", selectedCategory);
        await handleLoadRandom(selectedCategory);
      }
      // Default to random
      else {
        console.log("🎵 Loading random mix");
        await handleLoadRandom();
      }
    };

    // Delay initial load to allow dynamic route handling to set sessionStorage first
    const timeoutId = setTimeout(() => {
      // Re-check sessionStorage in case dynamic route set it after component mounted
      const shareLinkValue = sessionStorage?.getItem("shareLinkMcKey");
      if (shareLinkValue) {
        console.log("🎵 Found share link during timeout check:", shareLinkValue);
        mcKeyRef.current = shareLinkValue;
        wasShareLink.current = true;
        sessionStorage.removeItem("shareLinkMcKey");
        
        // Initialize PlayerWidget for share link after a short delay
        setTimeout(() => {
          console.log("🎵 Checking PlayerWidget initialization conditions:", {
            hasIframe: !!iframeRef.current,
            scriptLoaded,
            hasPlayer: !!player,
            hasMixcloudAPI: !!(globalThis as any).Mixcloud?.PlayerWidget
          });
          
          if (iframeRef.current && (globalThis as any).Mixcloud?.PlayerWidget && !player) {
            console.log("🎵 Initializing PlayerWidget for share link");
            const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(iframeRef.current);
            freshWidget.ready.then(() => {
              console.log("✅ PlayerWidget ready for share link");
              setPlayer(freshWidget);
              setupEventListeners(freshWidget);
              setPlaying(true); // Autoplay for share links
            }).catch((error: any) => {
              console.error("❌ PlayerWidget initialization failed:", error);
            });
          } else {
            console.log("🎵 PlayerWidget initialization conditions not met");
          }
        }, 500);
      }
      
      console.log("🎵 Timeout firing, about to call handleInitialLoad", {
        tempRouteValue,
        dynamicRouteHandled: dynamicRouteHandledRef.current,
        wasShareLink: wasShareLink.current,
        currentMcKey: mcKeyRef.current
      });
      handleInitialLoad();
      setIsReady(true);
      
      // Don't clear temp route value here - let the PlayerWidget initialization handle it
    }, 300); // Longer delay to allow dynamic route to execute and set sessionStorage

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Only run on mount - don't re-run when tempRouteValue changes

  // Check for share link on client-side immediately
  useEffect(() => {
    console.log("🎵 Checking for share link in sessionStorage...");
    const shareLinkValue = sessionStorage?.getItem("shareLinkMcKey");
    console.log("🎵 SessionStorage shareLinkMcKey:", shareLinkValue);
    
    if (shareLinkValue) {
      console.log("🎵 Found share link mcKey in sessionStorage:", shareLinkValue);
      mcKeyRef.current = shareLinkValue;
      wasShareLink.current = true;
      sessionStorage.removeItem("shareLinkMcKey");
      console.log("🎵 Updated mcKeyRef.current to:", mcKeyRef.current);
      console.log("🎵 Set wasShareLink.current to:", wasShareLink.current);
    } else {
      console.log("🎵 No share link found in sessionStorage");
    }
  }, []); // Run once on mount

  // Initialize PlayerWidget when temp route value exists and iframe is ready
  useEffect(() => {
    if (tempRouteValue && iframeRef.current && (globalThis as any).Mixcloud?.PlayerWidget && !player) {
      console.log("🎵 Initializing PlayerWidget for temp route value:", tempRouteValue);
      
      setTimeout(() => {
        const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(iframeRef.current);
        freshWidget.ready.then(() => {
          console.log(`✅ Widget ready for temp route: ${tempRouteValue}`);
          setPlayer(freshWidget);
          setupEventListeners(freshWidget);
          setPlaying(true); // Autoplay is on for share links
          
          // Clear temp value after successful initialization
          console.log("🎵 Clearing temp value after successful widget init");
          setTimeout(() => setTempRouteValue(null), 1000);
        });
      }, 1000);
    }
  }, [tempRouteValue, iframeRef.current, scriptLoaded, player]);

  // Seeking logic - restore playback position
  useEffect(() => {
    console.log("🔍 Seeking logic check:", {
      latestMcKey,
      hasSeeked,
      loadLatestProgress,
      player: !!player,
      currentMcKey: mcKeyRef.current,
      formattedCurrent: mcKeyFormatter(mcKeyRef.current),
      formattedLatest: latestMcKey ? mcKeyFormatter(latestMcKey) : null,
      shouldSeek: latestMcKey && !hasSeeked && loadLatestProgress > 60 && player && mcKeyFormatter(mcKeyRef.current) === mcKeyFormatter(latestMcKey)
    });
    
    if (
      !latestMcKey ||
      hasSeeked ||
      loadLatestProgress <= 60 ||
      !player ||
      mcKeyFormatter(mcKeyRef.current) !== mcKeyFormatter(latestMcKey)
    )
      return;

    const attemptSeek = async (): Promise<void> => {
      const maxAttempts = 5;
      let attempts = 0;

      const trySeek = async (): Promise<void> => {
        attempts += 1;
        try {
          const seekSuccessful = await handleSeek(loadLatestProgress);
          if (seekSuccessful) {
            setHasSeeked(true);
            if (DEBUG) console.log(`✅ Seek successful on attempt ${attempts}`);
          } else if (attempts < maxAttempts) {
            if (DEBUG)
              console.log(
                `⏳ Seek failed, attempt ${attempts}/${maxAttempts}, retrying...`,
              );
            setTimeout(trySeek, 1000);
          } else if (DEBUG)
            console.warn("❌ Seek failed after maximum attempts");
        } catch (error) {
          console.error(`❌ Seek error on attempt ${attempts}:`, error);
          if (attempts < maxAttempts) {
            setTimeout(trySeek, 1000);
          }
        }
      };

      // Start seeking attempts after a small delay
      setTimeout(trySeek, 500);
    };

    attemptSeek();
  }, [latestMcKey, loadLatestProgress, handleSeek, hasSeeked, player]);
  // #endregion

  // #region Keypress Listeners
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Don't handle shortcuts if they're disabled
      if (!keyboardShortcutsEnabled) return;

      // Don't handle shortcuts if user is typing in an input/textarea/contenteditable
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true" ||
        target.getAttribute("role") === "textbox"
      ) {
        return;
      }

      switch (event.key) {
        case " ":
        case "k": {
          event.preventDefault();
          if (playing) {
            handlePause();
          } else {
            handlePlay();
          }
          break;
        }
        case "j": {
          event.preventDefault();
          handlePrevious();
          break;
        }
        case "l": {
          event.preventDefault();
          handleNext();
          break;
        }
        case "m": {
          if (VOLUME_AVAILABLE) {
            event.preventDefault();
            setVolume(0);
          }
          break;
        }
        case "r": {
          event.preventDefault();
          handleLoadRandom();
          break;
        }
        case "n": {
          event.preventDefault();
          handleLoadLatest();
          break;
        }
        case "f": {
          event.preventDefault();
          if (mixIsFavourite) {
            removeFavourite(mcKeyRef.current);
          } else {
            addFavourite(mcKeyRef.current);
          }
          break;
        }
        case "s": {
          event.preventDefault();
          copySharableLink();
          break;
        }
        case "ArrowUp": {
          if (VOLUME_AVAILABLE) {
            event.preventDefault();
            setVolume(Math.min(volume + 0.1, 1));
          }
          break;
        }
        case "ArrowDown": {
          if (VOLUME_AVAILABLE) {
            event.preventDefault();
            setVolume(Math.max(volume - 0.1, 0));
          }
          break;
        }
        default: {
          break;
        }
      }
    },
    [
      keyboardShortcutsEnabled,
      playing,
      handlePlay,
      handlePause,
      handlePrevious,
      handleNext,
      setVolume,
      handleLoadLatest,
      handleLoadRandom,
      mixIsFavourite,
      addFavourite,
      removeFavourite,
      copySharableLink,
      volume,
    ],
  );

  useEffect(() => {
    if (
      globalThis.window !== undefined &&
      !globalThis.location.pathname.startsWith("/admin")
    ) {
      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }

    return undefined;
  }, [handleKeyPress]);
  // #endregion

  // #region Scroll and touch listeners
  useEffect((): (() => void) => {
    const handleScroll = (event: WheelEvent): void => {
      if (event.deltaY > 0 && !isAtBottom) {
        setIsAtBottom(true);
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (event.deltaY < 0 && isAtBottom) {
        setIsAtBottom(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    const handleTouchStart = (event: TouchEvent): void => {
      const startY = event.touches[0].clientY;
      setTouchStartY(startY);
    };

    const handleTouchMove = (event: TouchEvent): void => {
      const touchEndY = event.touches[0].clientY;
      const newSwipeDistance = touchStartY - touchEndY;
      setSwipeDistance(newSwipeDistance);

      const sensitivity = 30; // Adjust sensitivity here

      if (swipeDistance > sensitivity && !isAtBottom) {
        setIsAtBottom(true);
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (swipeDistance < -sensitivity && isAtBottom) {
        setIsAtBottom(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    if (modalOpen) {
      window.removeEventListener("wheel", handleScroll);
      globalThis.removeEventListener("touchstart", handleTouchStart);
      globalThis.removeEventListener("touchmove", handleTouchMove);
    } else {
      window.addEventListener("wheel", handleScroll);
      globalThis.addEventListener("touchstart", handleTouchStart);
      globalThis.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
      globalThis.removeEventListener("touchstart", handleTouchStart);
      globalThis.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isAtBottom, touchStartY, modalOpen]);
  // #endregion

  // #region Return
  return {
    isReady,
    mcKey: mcKeyRef.current,
    testValue: testRef.current,
    tempRouteValue,
    mcUrl,
    setIsReady,
    controls: {
      fetchLatestMcKey,
      fetchRandomMcKey,
      fetchRandomMcKeyByCategory,
      handleLoad,
      setTestValue,
      setTempRouteValueFromRoute,
      handleLoadLatest,
      handleLoadRandom,
      handleLoadRandomFavourite,
      handleNext,
      handlePause,
      handlePlay,
      handlePrevious,
      handleRandom,
      handleSeek,
    },
    favourites: {
      addFavourite,
      favouritesList,
      isFavourite,
      removeFavourite,
      setFavouritesList,
    },
    filters: {
      categories,
      mixes,
      selectedCategory,
      selectedTag,
      setMixes,
      setSelectedCategory,
      setSelectedTag,
      updateSelectedCategory,
    },
    history: {
      latestMcKey,
      latestProgress,
      progress,
      setLatestMcKey,
      setLatestProgress,
      setProgress,
    },
    mix: {
      categoryName,
      copySharableLink,
      duration,
      details: mixDetails,
      favourite: mixIsFavourite,
      progress: mixProgress,
      progressPercent: mixProgressPercent,
      setDetails: setMixDetails,
      setDuration,
      setProgress: setMixProgress,
      setProgressPercent: setMixProgressPercent,
      setShowUnavailable,
      showUnavailable,
    },
    screen: {
      holdingMessage,
      setHoldingMessage,
      setTemporaryMessage,
      temporaryMessage,
    },
    session: {
      background,
      backgroundAutoChange,
      burgerMenuRef,
      displayLength,
      filterBackgroundCategory,
      handleCloseModal,
      isAtBottom,
      isMobile,
      jupiterCaseRef,
      keyboardShortcutsEnabled,
      menuOpen,
      modalContent,
      modalHideChrome,
      modalOpen,
      modalRef,
      modalTitle,
      openModal,
      scale,
      secondsRemaining,
      setBackground,
      setBackgroundAutoChange,
      setDisplayLength,
      setFilterBackgroundCategory,
      setIsAtBottom,
      setIsMobile,
      setKeyboardShortcutsEnabled,
      setMenuOpen,
      setModalContent,
      setModalHideChrome,
      setModalOpen,
      setModalTitle,
      setScale,
      setThemeName,
      setTooltipFading,
      setTooltipMessage,
      setTooltipPosition,
      setTooltipVisible,
      showTooltip,
      tooltipFading,
      tooltipMessage,
      tooltipPosition,
      tooltipVisible,
      theme,
      themeName,
    },
    track: {
      details: trackDetails,
      progress: trackProgress,
      progressPercent: trackProgressPercent,
      sectionNumber: trackSectionNumber,
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
      setSectionNumber: setTrackSectionNumber,
    },
    widget: {
      changeMix,
      endedEventRef,
      iframeRef,
      loaded,
      pauseTimeoutRef,
      player,
      playerUpdated,
      playing,
      scriptLoaded,
      setLoaded,
      setPlayer,
      setPlayerUpdated,
      setPlaying,
      setScriptLoaded,
      setupEventListeners,
      setVolume,
      volume,
      widgetUrl,
    },
  };
  // #endregion
};

export default useMixcloudContextState;
