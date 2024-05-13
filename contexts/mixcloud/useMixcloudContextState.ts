/* eslint-disable unicorn/consistent-function-scoping */
// contexts/mixcloud/useMixcloudContextState.ts

import type {
  MixcloudContextState,
  TimeoutRefs,
} from "contexts/mixcloud/types";
import type { Category, Mix, Track } from "db/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import {
  ALTERNATELOADTYPE,
  ENABLE_3D,
  ENABLE_AUTOSCROLL,
  ENABLE_EQUALIZER,
  ENABLE_MIXLIST,
  ENABLE_TRACKLIST,
  FLAG_PAUSE,
  FLAG_PLAY,
  FLAG_SKIPNEXT,
  FLAG_SKIPPREVIOUS,
  FLAG_VOLUMEDOWN,
  FLAG_VOLUMEUP,
  IFRAMEPREFIX,
  IFRAMESUFFIX,
} from "utils/constants";

let globalIsMixcloudScriptLoaded = false;

const useMixcloudContextState = (): MixcloudContextState => {
  const [mcKey, setMcKey] = useState("");
  const [bufferingEvent, setBufferingEvent] = useState(false);
  const [modalCatalogueOpen, setModalCatalogueOpen] = useState(false);
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const durationRef = useRef(duration);
  const [maskRef, setMaskRef] = useState<HTMLElement | null>(null);
  const [endedEvent, setEndedEvent] = useState(false);
  const [errorEvent, setErrorEvent] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const mixcloudWidgetRef = useRef<HTMLIFrameElement | null>(null);
  const [mixcloudWidgetElement, setMixcloudWidgetElement] =
    useState<HTMLDivElement | null>(null);
  const [mixcloudWidgetIframeElement, setMixcloudWidgetIframeElement] =
    useState<HTMLDivElement | null>(null);
  const mixcloudWidget = useRef<any>(null);
  const percentagePlayedRef = useRef(0);
  const [percentagePlayed, setPercentagePlayed] = useState(0);
  const [pauseEvent, setPauseEvent] = useState(false);
  const [playEvent, setPlayEvent] = useState(false);
  const progressEventRef = useRef(0);
  const [progressEvent, setProgressEvent] = useState(0);
  const [initializeWidget, setInitializeWidget] = useState(false);
  const [iframeInitialized, setIframeInitialized] = useState(false);
  const [currentMix, setCurrentMix] = useState<Mix | null>(null);
  const [currentMixList, setCurrentMixList] = useState<Mix[] | null>(null);
  const [currentTracks, setCurrentTracks] = useState<Track[]>([]);
  const [temporaryTickerTapeMessage, setTemporaryTickerTapeMessage] =
    useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterNotes, setFilterNotes] = useState("");
  const [filterTags, setFilterTags] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [lookupAllTags, setLookupAllTags] = useState<string[]>([]);
  const [lookupCategories, setLookupCategories] = useState<Category[]>([]);
  const [flagVolumeUp, setFlagVolumeUp] = useState(" ");
  const [flagVolumeDown, setFlagVolumeDown] = useState(" ");
  const [flagSkipPrevious, setFlagSkipPrevious] = useState(" ");
  const [flagSkipNext, setFlagSkipNext] = useState(" ");
  const [flagPause, setFlagPause] = useState("PAUSE");
  const [flagPlay, setFlagPlay] = useState(" ");
  const timeoutRefs = useRef<TimeoutRefs>({});
  const [scalingFactorButton, setScalingFactorButton] = useState(1);
  const [scalingFactorDesktop, setScalingFactorDesktop] = useState(1);
  const [scalingFactorFont, setScalingFactorFont] = useState(1);
  const [scalingFactorIcon, setScalingFactorIcon] = useState(1);
  const [scalingFactorVolume, setScalingFactorVolume] = useState(1);
  const searchParams = useSearchParams();

  // Local storage state variables
  const [volume, setVolume] = useLocalStorageState("volume", {
    defaultValue: 0.75,
  });
  const [previousVolume, setPreviousVolume] = useLocalStorageState(
    "previousVolume",
    {
      defaultValue: volume,
    },
  );
  const [backgroundImage, setBackgroundImage] = useLocalStorageState(
    "backgroundImage",
    {
      defaultValue: 6,
    },
  );
  const [enable3D, setEnable3D] = useLocalStorageState("enable3D", {
    defaultValue: ENABLE_3D,
  });
  const [enableAutoscroll, setEnableAutoscroll] = useLocalStorageState(
    "enableAutoscroll",
    {
      defaultValue: ENABLE_AUTOSCROLL,
    },
  );
  const [enableEqualizer, setEnableEqualizer] = useLocalStorageState(
    "enableEqualizer",
    {
      defaultValue: ENABLE_EQUALIZER,
    },
  );
  const [enableMixList, setEnableMixList] = useLocalStorageState(
    "enableMixList",
    {
      defaultValue: ENABLE_MIXLIST,
    },
  );
  const [enableTrackList, setEnableTrackList] = useLocalStorageState(
    "enableTrackList",
    {
      defaultValue: ENABLE_TRACKLIST,
    },
  );

  const setTemporaryFlag = (
    flagName: string,
    setFlagFunction: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    flagDuration = 1000,
  ): void => {
    if (timeoutRefs.current[flagName]) {
      clearTimeout(timeoutRefs.current[flagName]);
    }

    setFlagFunction(value);

    timeoutRefs.current[flagName] = setTimeout(() => {
      setFlagFunction(" ");
    }, flagDuration);
  };

  const fetchMcKey = async (category?: string): Promise<string> => {
    try {
      const queryParam = category
        ? `?category=${encodeURIComponent(category)}`
        : "";
      const response = await fetch(`/api/random-mix${queryParam}`);
      if (!response.ok) {
        throw new Error("Failed to fetch random mix");
      }
      const data = await response.json();
      return data.mcKey;
    } catch (error) {
      console.error("Error fetching random mix:", error);
      return "";
    }
  };

  const setRandomMcKey = async (category?: string): Promise<void> => {
    const randomMcKey = await fetchMcKey(category);
    if (randomMcKey) {
      setMcKey(randomMcKey);
    }
  };

  const fetchCurrentMix = async (): Promise<void> => {
    if (mcKey) {
      try {
        const response = await fetch(`/api/mix?mixcloudKey=${mcKey}`);
        if (!response.ok) throw new Error("Failed to fetch current mix");
        const mixData = await response.json();
        setCurrentMix(mixData);
      } catch (error) {
        console.error("Error fetching current mix:", error);
        setCurrentMix(null);
      }
    }
  };

  const fetchCurrentTracks = async (): Promise<void> => {
    if (mcKey) {
      try {
        const response = await fetch(`/api/tracks?mixcloudKey=${mcKey}`);
        if (!response.ok) throw new Error("Tracks fetch failed");
        const tracksData = await response.json();
        setCurrentTracks(tracksData);
      } catch (error) {
        console.error(error);
        setCurrentTracks([]);
      }
    }
  };

  const hideMask = useCallback((): void => {
    if (
      maskRef &&
      !maskRef.classList.contains("hidden") &&
      !maskRef.classList.contains("hiding")
    ) {
      maskRef.classList.remove("initial");
      maskRef.classList.remove("shown");
      maskRef.classList.add("hiding");

      const onTransitionEnd = (): void => {
        if (maskRef) {
          maskRef.classList.replace("hiding", "hidden");
          maskRef.removeEventListener("transitionend", onTransitionEnd);
        }
      };

      maskRef.addEventListener("transitionend", onTransitionEnd);
    }
  }, [maskRef]);

  const showMask = (className?: string): void => {
    if (maskRef) {
      maskRef.classList.remove("initial");
      maskRef.classList.remove("hidden");
      maskRef.classList.add("showing");

      const onTransitionEnd = (): void => {
        if (maskRef) {
          maskRef.classList.replace("showing", className || "shown");
          maskRef.removeEventListener("transitionend", onTransitionEnd);
        }
      };

      maskRef.addEventListener("transitionend", onTransitionEnd);
    }
  };

  const getDuration = async (): Promise<void> => {
    if (mixcloudWidget.current) {
      try {
        setDuration(await mixcloudWidget.current.getDuration());
      } catch {
        setDuration(0);
      }
    }
  };

  const convertActualToUIVolume = (actualVolume: number): number => {
    return Math.round(actualVolume * 11);
  };

  const convertUIToActualVolume = (uiVolume: number): number => {
    return uiVolume / 11;
  };

  const increaseVolume = (): void => {
    let uiVolume = convertActualToUIVolume(volume);
    uiVolume = Math.min(Math.ceil(uiVolume + 1), 11);
    setVolume(convertUIToActualVolume(uiVolume));
    if (convertUIToActualVolume(uiVolume) === 1) {
      setTemporaryTickerTapeMessage("Up to 11");
    }
    setTemporaryFlag("volumeUp", setFlagVolumeUp, FLAG_VOLUMEUP);
  };

  const decreaseVolume = (): void => {
    let uiVolume = convertActualToUIVolume(volume);
    uiVolume = Math.max(Math.floor(uiVolume - 1), 0);
    setVolume(convertUIToActualVolume(uiVolume));
    if (convertUIToActualVolume(uiVolume) === 0) {
      setTemporaryTickerTapeMessage("It's oh so quiet");
    }
    setTemporaryFlag("volumeDown", setFlagVolumeDown, FLAG_VOLUMEDOWN);
  };

  const setVolumeHandler = (newVolume: number): void => {
    if (mixcloudWidget.current && mixcloudWidget.current.setVolume) {
      mixcloudWidget.current.setVolume(newVolume);
    }
  };

  const muteVolumeToggle = (): void => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  const bufferingListener = (buffering: boolean): void => {
    setBufferingEvent(buffering);
  };

  const endedListener = (): void => {
    setEndedEvent(true);
  };

  const errorListener = (): void => {
    setErrorEvent(true);
  };

  const pauseListener = (): void => {
    setPauseEvent(true);
    setPlayEvent(false);
  };

  const playListener = (): void => {
    setPauseEvent(false);
    setPlayEvent(true);
    hideMask();
  };

  const progressListener = useCallback((progress: number) => {
    // Immediate update refs
    progressEventRef.current = progress;
    const newPercentage =
      durationRef.current > 0
        ? Number.parseFloat(((progress / durationRef.current) * 100).toFixed(2))
        : 0;
    percentagePlayedRef.current = newPercentage;
  }, []);

  const addEventListeners = (): void => {
    if (mixcloudWidget.current) {
      setTimeout(() => {
        mixcloudWidget.current.events.buffering.on(bufferingListener);
        mixcloudWidget.current.events.ended.on(endedListener);
        mixcloudWidget.current.events.error.on(errorListener);
        mixcloudWidget.current.events.pause.on(pauseListener);
        mixcloudWidget.current.events.play.on(playListener);
        mixcloudWidget.current.events.progress.on(progressListener);
        getDuration();
      }, 250);
    }
  };

  const regularLoad = async (key: string): Promise<void> => {
    if (mixcloudWidget.current) {
      setMcKey(key);
      await mixcloudWidget.current.load(`/rymixxx/${key}/`, false);
      await getDuration();
    }
  };

  const alternateLoad = async (key: string): Promise<void> => {
    showMask("initial");
    setMcKey(key);

    if (mixcloudWidgetRef.current && mixcloudWidgetElement) {
      mixcloudWidgetRef.current.remove();
      mixcloudWidgetRef.current = null;
    }

    const newIframe = document.createElement("iframe");
    newIframe.src = `${IFRAMEPREFIX}${key}${IFRAMESUFFIX}`;
    newIframe.allow = "autoplay";

    mixcloudWidgetIframeElement?.appendChild(newIframe);
    mixcloudWidgetRef.current = newIframe;

    await new Promise((resolve) => {
      newIframe.addEventListener("load", () => resolve(true));
    });

    mixcloudWidget.current = new window.Mixcloud.PlayerWidget(newIframe);
    await mixcloudWidget.current.ready;

    addEventListeners();
    setIframeInitialized(true);
    setVolumeHandler(volume);
  };

  const load = async (key: string): Promise<void> => {
    const alternateLoadType = searchParams.get("alternateloadtype");

    if (
      alternateLoadType !== undefined &&
      alternateLoadType !== null &&
      alternateLoadType === "true"
    ) {
      alternateLoad(key);
      return;
    }

    if (
      alternateLoadType !== undefined &&
      alternateLoadType !== null &&
      alternateLoadType === "false"
    ) {
      regularLoad(key);
      return;
    }

    if (ALTERNATELOADTYPE) {
      alternateLoad(key);
      return;
    }

    regularLoad(key);
  };

  const loadRandomMix = async (category?: string): Promise<void> => {
    const randomMcKey = await fetchMcKey(category);
    if (randomMcKey) {
      await load(randomMcKey);
    }
  };

  const pause = async (): Promise<void> => {
    if (mixcloudWidget.current) {
      await mixcloudWidget.current.pause();
    }
  };

  const play = async (): Promise<void> => {
    if (mixcloudWidget.current) {
      await mixcloudWidget.current.play();
    }
  };

  const seek = async (seconds: number): Promise<void> => {
    if (mixcloudWidget.current) {
      await mixcloudWidget.current.seek(seconds);
    }
  };

  const selectNextMix = (): void => {
    if (currentMixList) {
      if (currentMixList.length === 0) return;

      const currentMixIndex = currentMixList.findIndex(
        (mix) => mix.mixcloudKey === mcKey,
      );
      let nextMixIndex = currentMixIndex + 1;

      if (nextMixIndex >= currentMixList.length) {
        nextMixIndex = 0;
      }

      const nextMix = currentMixList[nextMixIndex];
      load(nextMix.mixcloudKey);
      setTemporaryFlag("skipNext", setFlagSkipNext, FLAG_SKIPNEXT);
    }
  };

  const selectPreviousMix = (): void => {
    if (currentMixList) {
      if (currentMixList.length === 0) return;

      const currentMixIndex = currentMixList.findIndex(
        (mix) => mix.mixcloudKey === mcKey,
      );
      let previousMixIndex = currentMixIndex - 1;

      if (previousMixIndex < 0) {
        previousMixIndex = currentMixList.length - 1;
      }

      const previousMix = currentMixList[previousMixIndex];
      load(previousMix.mixcloudKey);
      setTemporaryFlag("skipPrevious", setFlagSkipPrevious, FLAG_SKIPPREVIOUS);
    }
  };

  const calculateScalingFactor = (
    screenWidth: number,
    min = 426,
    max = 826,
    lowerBound = 0.6,
    upperBound = 1,
  ): number => {
    if (screenWidth <= min) return lowerBound;
    if (screenWidth >= max) return upperBound;
    return (
      lowerBound +
      ((screenWidth - min) / (max - min)) * (upperBound - lowerBound)
    );
  };

  const debounce = (
    func: (...args: any[]) => void,
    delay: number,
  ): ((...args: any[]) => void) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const onResize = debounce(() => {
    setScalingFactorButton(
      calculateScalingFactor(window.innerWidth, 426, 826, 0.6, 1),
    );
    setScalingFactorDesktop(
      calculateScalingFactor(window.innerWidth, 426, 826, 0.6, 1),
    );
    setScalingFactorFont(
      calculateScalingFactor(window.innerWidth, 426, 826, 0.5, 1),
    );
    setScalingFactorIcon(
      calculateScalingFactor(window.innerWidth, 426, 826, 0.8, 1),
    );
    setScalingFactorVolume(
      calculateScalingFactor(window.innerWidth, 426, 826, 0.4, 1),
    );
  }, 250);

  const copyShareLink = (): void => {
    if (mcKey) {
      const shareLink = `https://stef.fm/${mcKey}`;
      navigator.clipboard.writeText(shareLink);
      setTemporaryTickerTapeMessage("Sharing link copied to clipboard!");
    }
  };

  // useEffects
  useEffect(() => {
    if (pauseEvent) {
      setFlagPause(FLAG_PAUSE);
      setFlagPlay("");
    }
    if (playEvent) {
      setFlagPlay(FLAG_PLAY);
      setFlagPause("");
    }
  }, [pauseEvent, playEvent]);

  useEffect(() => {
    fetchCurrentMix();
    fetchCurrentTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcKey]);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    setVolumeHandler(volume);
  }, [volume]);

  useEffect(() => {
    const initializeMixcloudWidget = async (): Promise<void> => {
      if (!mixcloudWidgetRef.current || iframeInitialized) return;

      mixcloudWidget.current = new window.Mixcloud.PlayerWidget(
        mixcloudWidgetRef.current,
      );
      await mixcloudWidget.current.ready;

      // Add event listeners
      addEventListeners();
      await getDuration();
      setIframeInitialized(true);
    };

    // Function to load the script
    const loadScript = (): void => {
      const script = document.createElement("script");
      script.src = "//widget.mixcloud.com/media/js/widgetApi.js";
      script.async = true;
      script.id = "mixcloud-script";
      script.addEventListener("load", () => {
        globalIsMixcloudScriptLoaded = true;
        setIsScriptLoaded(true);
        // Only initialize the widget if mcKey is set
        if (mcKey) {
          initializeMixcloudWidget();
        }
      });
      document.body.appendChild(script);
    };

    // Load the script only if it's not already loaded and mcKey is set
    if (
      !globalIsMixcloudScriptLoaded &&
      !window.Mixcloud &&
      !document.querySelector("#mixcloud-script") &&
      mcKey
    ) {
      loadScript();
    } else if (!globalIsMixcloudScriptLoaded && window.Mixcloud && mcKey) {
      globalIsMixcloudScriptLoaded = true;
      setIsScriptLoaded(true);
      initializeMixcloudWidget();
    }

    // Cleanup function
    return () => {
      const existingScript = document.querySelector("#mixcloud-script");
      if (existingScript) existingScript.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcKey]);

  useEffect(() => {
    const fetchMixes = async (): Promise<void> => {
      try {
        // Construct query string based on filter states
        const queryString = new URLSearchParams({
          ...(filterCategory && { category: filterCategory }),
          ...(filterName && { name: filterName }),
          ...(filterNotes && { notes: filterNotes }),
          ...(filterTags && { tags: filterTags }),
          ...(filterDate && { date: filterDate }),
        }).toString();

        const response = await fetch(`/api/mixes?${queryString}`);
        if (!response.ok) throw new Error("Data fetch failed");
        const mixesData = await response.json();
        setCurrentMixList(mixesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMixes();
  }, [filterCategory, filterName, filterNotes, filterTags, filterDate]);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    // Initial calculation
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (endedEvent === true) {
      loadRandomMix();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endedEvent]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update state based on current ref value
      setPercentagePlayed(percentagePlayedRef.current);
    }, 5000); // Adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  // Init
  // useEffect(() => {
  //   setRandomMcKey();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return {
    backgroundImage,
    bufferingEvent,
    copyShareLink,
    currentMix,
    currentMixList,
    currentTracks,
    decreaseVolume,
    duration,
    enable3D,
    enableAutoscroll,
    enableEqualizer,
    enableMixList,
    enableTrackList,
    endedEvent,
    errorEvent,
    fetchCurrentMix,
    fetchCurrentTracks,
    filterCategory,
    filterName,
    filterNotes,
    filterDate,
    filterTags,
    flagPause,
    flagPlay,
    flagSkipNext,
    flagSkipPrevious,
    flagVolumeDown,
    flagVolumeUp,
    getDuration,
    hideMask,
    iframeInitialized,
    increaseVolume,
    initializeWidget,
    isScriptLoaded,
    load,
    loadRandomMix,
    lookupAllTags,
    lookupCategories,
    maskRef,
    mcKey,
    mixcloudWidgetRef,
    mixcloudWidgetElement,
    mixcloudWidgetIframeElement,
    modalCatalogueOpen,
    modalSettingsOpen,
    muteVolumeToggle,
    pause,
    pauseEvent,
    percentagePlayed,
    play,
    playEvent,
    progressEvent,
    scalingFactorButton,
    scalingFactorDesktop,
    scalingFactorFont,
    scalingFactorIcon,
    scalingFactorVolume,
    seek,
    selectNextMix,
    selectPreviousMix,
    setBackgroundImage,
    setBufferingEvent,
    setDuration,
    setEnable3D,
    setEnableAutoscroll,
    setEnableEqualizer,
    setEnableMixList,
    setEnableTrackList,
    setEndedEvent,
    setErrorEvent,
    setFilterCategory,
    setFilterDate,
    setFilterName,
    setFilterNotes,
    setFilterTags,
    setFlagPause,
    setFlagPlay,
    setFlagSkipNext,
    setFlagSkipPrevious,
    setFlagVolumeDown,
    setFlagVolumeUp,
    setIframeInitialized,
    setInitializeWidget,
    setLookupAllTags,
    setLookupCategories,
    setMaskRef,
    setMcKey,
    setMixcloudWidgetElement,
    setMixcloudWidgetIframeElement,
    setModalCatalogueOpen,
    setModalSettingsOpen,
    setPauseEvent,
    setPercentagePlayed,
    setPlayEvent,
    setProgressEvent,
    setRandomMcKey,
    setTemporaryTickerTapeMessage,
    setVolume,
    showMask,
    temporaryTickerTapeMessage,
    uiVolume: convertActualToUIVolume(volume),
    volume,
  };
};

export default useMixcloudContextState;
