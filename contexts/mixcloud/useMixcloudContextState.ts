/* eslint-disable unicorn/consistent-function-scoping */
import type { MixcloudContextState } from "contexts/mixcloud/types";
import type { Category, Mix, Track } from "db/types";
import usePersistedState from "hooks/usePersistedState";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import themes from "styles/themes";
import { DEFAULTVOLUME, DISPLAY_LENGTH } from "utils/constants";
import {
  mcKeyFormatter,
  mcKeyUnformatter,
  mcKeyUrlFormatter,
  mcWidgetUrlFormatter,
} from "utils/functions";

const useMixcloudContextState = (): MixcloudContextState => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [duration, setDuration] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [lastMixUpdateTime, setLastMixUpdateTime] = useState<number | null>(
    null,
  );
  const [lastTrackUpdateTime, setLastTrackUpdateTime] = useState<number | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);
  const [mcKey, setMcKey] = useState("");
  const [mcKeyNext, setMcKeyNext] = useState("");
  const [mcKeyPrevious, setMcKeyPrevious] = useState("");
  const [mixDetails, setMixDetails] = useState<Mix | undefined>();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [mixProgress, setMixProgress] = useState(0);
  const [mixProgressPercent, setMixProgressPercent] = useState(0);
  const [player, setPlayer] = useState<any>();
  const [playerUpdated, setPlayerUpdated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = usePersistedState<
    string | null
  >("selectedCategory", null);
  const [selectedTag, setSelectedTag] = useState("");
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [trackDetails, setTrackDetails] = useState<Track | undefined>();
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackProgressPercent, setTrackProgressPercent] = useState(0);
  const [trackSectionNumber, setTrackSectionNumber] = useState(0);
  const [volume, setVolume] = usePersistedState<number>(
    "volume",
    DEFAULTVOLUME,
  );

  /* Session */
  const defaultMessage = "Stef FM - Funky House Coming In Your Ears";
  const [displayLength, setDisplayLength] = useState(DISPLAY_LENGTH);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const [isMobile, setIsMobile] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const theme = themes[themeName] || themes.defaultTheme;

  /* Screen */
  const [holdingMessage, setHoldingMessage] = useState<string | undefined>(
    defaultMessage,
  );
  const [temporaryMessage, setTemporaryMessage] = useState<
    string | undefined
  >();

  useEffect(() => {
    const formatDuration = (durationString: string): string => {
      return `${durationString.replace(":", "h!").replace(":", "m!")}s`;
    };

    const mixMessage = [
      mixDetails?.name,
      mixDetails?.notes,
      mixDetails?.releaseDate,
      mixDetails?.duration ? formatDuration(mixDetails.duration) : undefined,
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

  /* Timer for Modal auto-close */
  const startTimer = (timerDuration: number): void => {
    setSecondsRemaining(timerDuration);
    clearTimeout(timerRef.current || 0);
    clearInterval(intervalRef.current || 0);

    timerRef.current = setTimeout(() => {
      setModalOpen(false);
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
    setModalOpen(false);
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
    const handleResize = (): void => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= 768);

      if (windowWidth < 610) {
        const reduction = Math.min(
          Math.floor((720 - windowWidth) / 33),
          DISPLAY_LENGTH,
        );
        setDisplayLength(DISPLAY_LENGTH - reduction);
      } else {
        setDisplayLength(DISPLAY_LENGTH);
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
    const fetchRandomMcKeyForCategory = async (): Promise<void> => {
      if (selectedCategory) {
        const randomMcKey = await fetchRandomMcKeyByCategory(selectedCategory);
        setMcKey(randomMcKey);
      }
    };

    fetchRandomMcKeyForCategory();
  }, [selectedCategory]);

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
  }, [player, playerUpdated]);

  const handlePlay = useCallback(() => {
    player?.play();
    setPlayerUpdated(false);
  }, [player, playerUpdated]);

  const handlePause = useCallback(() => {
    player?.pause();
    setPlayerUpdated(false);
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
    if (!newMcKey) return;
    setMcKey(mcKeyFormatter(newMcKey));
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
      return;
    }

    const calculateTrackProgress = (): void => {
      const currentMixProgressSeconds = mixProgress;

      const parseTimeToSeconds = (time: string): number => {
        const parts = time.split(":").map(Number).reverse();
        let seconds = 0;
        if (parts.length > 0) seconds += parts[0]; // seconds
        if (parts.length > 1) seconds += parts[1] * 60; // minutes
        if (parts.length > 2) seconds += parts[2] * 3600; // hours
        return seconds;
      };

      const tracks = mixDetails.tracks.map((track) => ({
        ...track,
        startTimeSeconds: parseTimeToSeconds(track.startTime),
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
    mcKey,
    mcUrl,
    setMcKey,
    controls: {
      fetchRandomMcKey,
      fetchRandomMcKeyByCategory,
      handleLoad,
      handleNext,
      handlePause,
      handlePlay,
      handlePlayPause,
      handlePrevious,
      mcKeyNext,
      mcKeyPrevious,
      setMcKeyNext,
      setMcKeyPrevious,
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
      isMobile,
      menuOpen,
      modalContent,
      modalOpen,
      modalRef,
      modalTitle,
      openModal,
      secondsRemaining,
      setDisplayLength,
      setIsMobile,
      setMenuOpen,
      setModalContent,
      setModalOpen,
      setModalTitle,
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
