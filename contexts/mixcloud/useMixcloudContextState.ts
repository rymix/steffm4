/* eslint-disable unicorn/prefer-at */
/* eslint-disable unicorn/consistent-function-scoping */
import type { Favourite, MixcloudContextState } from "contexts/mixcloud/types";
import type { Category, Mix, Track } from "db/types";
import usePersistedState from "hooks/usePersistedState";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import themes from "styles/themes";
import {
  DEFAULT_MESSAGE,
  DEFAULT_VOLUME,
  DISPLAY_LENGTH,
} from "utils/constants";
import {
  convertTimeToHumanReadable,
  convertTimeToSeconds,
  mcKeyFormatter,
  mcKeyUnformatter,
  mcKeyUrlFormatter,
  mcWidgetUrlFormatter,
} from "utils/functions";

const useMixcloudContextState = (): MixcloudContextState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [lastMixUpdateTime, setLastMixUpdateTime] = useState<number | null>(
    null,
  );
  const [lastTrackUpdateTime, setLastTrackUpdateTime] = useState<number | null>(
    null,
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [mcKey, setMcKey] = useState<string>("");
  const [mixDetails, setMixDetails] = useState<Mix | undefined>();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [mixProgress, setMixProgress] = useState<number>(0);
  const [mixProgressPercent, setMixProgressPercent] = useState<number>(0);
  const [player, setPlayer] = useState<any>();
  const [playerUpdated, setPlayerUpdated] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = usePersistedState<
    string | null
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
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [themeName, setThemeName] = useState<string>("defaultTheme");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

  /* FUNCTIONS -------------------- */

  /* Favourites */
  const addFavourite = (mcKey: string): void => {
    const newFavouritesList = [...favouritesList, { mcKey }];
    setFavouritesList(newFavouritesList);
  };

  const removeFavourite = (mcKey: string): void => {
    const newFavouritesList = favouritesList.filter(
      (fav) => fav.mcKey !== mcKey,
    );
    setFavouritesList(newFavouritesList);
  };

  const isFavourite = (mcKey: string): boolean => {
    return favouritesList.some((fav) => fav.mcKey === mcKey);
  };

  /* Screen */
  useEffect(() => {
    const mixMessage = [
      mixDetails?.name,
      mixDetails?.notes,
      mixDetails?.releaseDate,
      mixDetails?.duration
        ? convertTimeToHumanReadable(mixDetails.duration, "!")
        : undefined,
    ]
      .filter(Boolean)
      .join(" - ");
    setHoldingMessage(mixMessage);
  }, [mixDetails?.name]);

  useEffect(() => {
    const trackMessage = [
      trackDetails?.trackName,
      trackDetails?.artistName,
      trackDetails?.remixArtistName,
      trackDetails?.publisher,
    ]
      .filter(Boolean)
      .join(" - ");
    setTemporaryMessage(trackMessage);
  }, [trackDetails?.trackName]);

  /* Modal */
  const handleCloseModal = (): void => {
    setModalContent(null);
    setModalOpen(false);
  };

  /* Timer for Modal auto-close */
  const startTimer = (timerDuration: number): void => {
    setSecondsRemaining(timerDuration);
    clearTimeout(timerRef.current || 0);
    clearInterval(intervalRef.current || 0);

    timerRef.current = setTimeout(() => {
      handleCloseModal();
      setSecondsRemaining(null);
      clearInterval(intervalRef.current || 0);
      timerRef.current = null;
    }, timerDuration * 1000);

    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current || 0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = (): void => {
    clearTimeout(timerRef.current || 0);
    clearInterval(intervalRef.current || 0);
    timerRef.current = null;
    intervalRef.current = null;
    setSecondsRemaining(null);
    handleCloseModal();
  };

  const openModal = useCallback(
    (content: ReactNode, title?: string | null, seconds?: number): void => {
      setModalContent(content);
      setModalTitle(title ?? null);
      setModalOpen(true);
      if (seconds === undefined) {
        setSecondsRemaining(null);
      } else {
        startTimer(seconds);
      }
    },
    [],
  );

  /* Set isMobile if small screen */
  useEffect(() => {
    const screenLimits = {
      landscape: [
        { width: 320, displayLength: 6 },
        { width: 440, displayLength: 7 },
        { width: 550, displayLength: 12 },
        { width: 768, displayLength: 15 },
        { width: 1024, displayLength: 18 },
        { width: 1300, displayLength: 24 },
      ],
      portrait: [
        { width: 320, displayLength: 6 },
        { width: 440, displayLength: 7 },
        { width: 550, displayLength: 8 },
        { width: 768, displayLength: 12 },
        { width: 1024, displayLength: 14 },
        { width: 1300, displayLength: 18 },
      ],
    };

    const handleResize = (): void => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const isPortrait = windowHeight > windowWidth;
      const limits = isPortrait
        ? screenLimits.portrait
        : screenLimits.landscape;

      setIsMobile(windowWidth <= 768);

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

      if (windowWidth <= limits[0].width) {
        setDisplayLength(limits[0].displayLength);
      } else if (windowWidth >= limits[limits.length - 1].width) {
        setDisplayLength(limits[limits.length - 1].displayLength);
      } else {
        setDisplayLength(
          limit ? limit.displayLength : limits[limits.length - 1].displayLength,
        );
      }

      // Calculate and set the scale factor
      const minScale = 0.4;
      const maxScale = 1;
      const minHeight = 375;
      const maxHeight = 570;

      if (isPortrait) {
        setScale(1);
      } else {
        let localScale;
        if (windowHeight <= minHeight) {
          localScale = minScale;
        } else if (windowHeight >= maxHeight) {
          localScale = maxScale;
        } else {
          localScale =
            minScale +
            ((windowHeight - minHeight) / (maxHeight - minHeight)) *
              (maxScale - minScale);
        }

        setScale(localScale);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the state based on the initial window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Cancel timers and close Modals and Menus */
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

  /* Helpers */
  const mcUrl = mcKeyUrlFormatter(mcKey);

  const widgetUrl = mcWidgetUrlFormatter(mcKey);

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

  const fetchMixDetails = async (
    localMcKey?: string,
  ): Promise<Mix | undefined> => {
    if (!mcKey && !localMcKey) return undefined;

    const lookupMcKey = localMcKey || mcKey;

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
    const fetchDetails = async (): Promise<void> => {
      const fetchedMixDetails = await fetchMixDetails();
      if (fetchedMixDetails) {
        setMixDetails(fetchedMixDetails);
      }
    };

    if (mcKey) {
      fetchDetails();
    }
  }, [mcKey]);

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
  }, [mcKey]);

  /* Play / Pause Controls */
  const handlePlayPause = useCallback(() => {
    player?.togglePlay();
    setPlayerUpdated(false);

    ReactGA.event({
      category: "Control",
      action: "Click",
      label: "Play / Pause",
    });
  }, [player, playerUpdated]);

  const handlePlay = useCallback(() => {
    player?.play();
    setPlayerUpdated(false);

    ReactGA.event({
      category: "Control",
      action: "Click",
      label: "Play",
    });
  }, [player, playerUpdated]);

  const handlePause = useCallback(() => {
    player?.pause();
    setPlayerUpdated(false);

    ReactGA.event({
      category: "Control",
      action: "Click",
      label: "Stop",
    });
  }, [player, playerUpdated]);

  /* Volume Controls */
  useEffect(() => {
    if (player) {
      player.setVolume(volume);
    }
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

  /* Load Controls */
  const handleLoad = async (newMcKey?: string): Promise<void> => {
    console.log("Loading new mix", newMcKey);
    if (!newMcKey) return;
    setMcKey(mcKeyFormatter(newMcKey));
  };

  const handleLoadRandom = async (category?: string): Promise<void> => {
    if (category && category !== "all") {
      console.log("Loading new random mix by category", category);
      handleLoad(await fetchRandomMcKeyByCategory(category));
    } else {
      console.log("Loading new random mix");
      handleLoad(await fetchRandomMcKey());
    }
  };

  /* Navigation */
  const handleNext = useCallback(async () => {
    const mixIndex = mixes.findIndex((thisMix) =>
      mcKey.includes(thisMix.mixcloudKey),
    );

    if (!mixes || mixes.length === 0 || mixIndex === -1) {
      handleLoad(await fetchRandomMcKey());
    } else {
      const nextIndex = (mixIndex + 1) % mixes.length;
      handleLoad(mixes[nextIndex].mixcloudKey);
    }

    ReactGA.event({
      category: "Control",
      action: "Click",
      label: "Next",
    });
  }, [mcKey, mixes]);

  const handlePrevious = useCallback(async () => {
    const mixIndex = mixes.findIndex((thisMix) =>
      mcKey.includes(thisMix.mixcloudKey),
    );

    if (!mixes || mixes.length === 0 || mixIndex === -1) {
      handleLoad(await fetchRandomMcKey());
    } else {
      handleLoad(
        mixes[mixIndex === 0 ? mixes.length - 1 : mixIndex - 1].mixcloudKey,
      );
    }

    ReactGA.event({
      category: "Control",
      action: "Click",
      label: "Previous",
    });
  }, [mcKey, mixes]);

  /* Calculate Progress */
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

  /* Fetch Categories */
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

  return {
    isReady,
    mcKey,
    mcUrl,
    setIsReady,
    controls: {
      fetchRandomMcKey,
      fetchRandomMcKeyByCategory,
      handleLoad,
      handleLoadRandom,
      handleNext,
      handlePause,
      handlePlay,
      handlePlayPause,
      handlePrevious,
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
    mix: {
      categoryName,
      duration,
      details: mixDetails,
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
      burgerMenuRef,
      displayLength,
      handleCloseModal,
      isMobile,
      menuOpen,
      modalContent,
      modalOpen,
      modalRef,
      modalTitle,
      openModal,
      scale,
      secondsRemaining,
      setDisplayLength,
      setIsMobile,
      setMenuOpen,
      setModalContent,
      setModalOpen,
      setModalTitle,
      setScale,
      setThemeName,
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
      iframeRef,
      loaded,
      player,
      playerUpdated,
      playing,
      scriptLoaded,
      setLoaded,
      setPlayer,
      setPlayerUpdated,
      setPlaying,
      setScriptLoaded,
      setVolume,
      volume,
      widgetUrl,
    },
  };
};

export default useMixcloudContextState;
