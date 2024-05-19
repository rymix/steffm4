/* eslint-disable unicorn/consistent-function-scoping */
import type { MixcloudContextState } from "contexts/mixcloud/types";
import type { Mix } from "db/types";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  mcKeyFormatter,
  mcKeyUnformatter,
  mcKeyUrlFormatter,
  mcWidgetUrlFormatter,
} from "utils/functions";

const useMixcloudContextState = (): MixcloudContextState => {
  const [mixDetails, setMixDetails] = useState<Mix | undefined>();
  const [duration, setDuration] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mcKey, setMcKey] = useState("");
  const [mcKeyNext, setMcKeyNext] = useState("");
  const [mcKeyPrevious, setMcKeyPrevious] = useState("");
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [player, setPlayer] = useState<any>();
  const [playerUpdated, setPlayerUpdated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mixProgress, setMixProgress] = useState(0);
  const [mixProgressPercent, setMixProgressPercent] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackProgressPercent, setTrackProgressPercent] = useState(0);
  const [volume, setVolume] = useState(0.7);

  /* Helpers */
  const mcUrl = mcKeyUrlFormatter(mcKey);

  const widgetUrl = mcWidgetUrlFormatter(mcKey);

  const fetchRandomMcKey = async (): Promise<string> => {
    const response = await fetch("/api/random-mix");
    const data = await response.json();
    return data.mcKey;
  };

  const fetchMixDetails = async (
    localMcKey?: string,
  ): Promise<Mix | undefined> => {
    if (!mcKey && !localMcKey) return;

    const lookupMcKey = localMcKey || mcKey;

    const response = await fetch(
      `/api/mix?mixcloudKey=${mcKeyUnformatter(lookupMcKey)}`,
    );
    const data: Mix = await response.json();
    return data;
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

  /* Play / Pause Controls */
  const handlePlayPause = useCallback(() => {
    player?.togglePlay();
    setPlayerUpdated(false);
  }, [player, playerUpdated]);

  /* Volume Controls */
  useEffect(() => {
    if (player) {
      player.setVolume(volume);
    }
  }, [player, volume]);

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
    setMixProgressPercent((mixProgress / duration) * 100);
  }, [duration, mixProgress]);

  useEffect(() => {
    if (!mixDetails || !mixDetails.tracks || mixDetails.tracks.length === 0) {
      setTrackProgress(0);
      setTrackProgressPercent(0);
      return;
    }

    const calculateTrackProgress = () => {
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

      const trackProgressPercent = (trackProgressSeconds / trackDuration) * 100;

      setTrackProgress(trackProgressSeconds);
      setTrackProgressPercent(trackProgressPercent);
    };

    calculateTrackProgress();
  }, [mixProgress, mixDetails, duration]);

  return {
    mcKey,
    mcUrl,
    setMcKey,
    controls: {
      fetchRandomMcKey,
      handleLoad,
      handleNext,
      handlePlayPause,
      handlePrevious,
      mcKeyNext,
      mcKeyPrevious,
      setMcKeyNext,
      setMcKeyPrevious,
    },
    filters: {
      mixes,
      selectedCategory,
      selectedTag,
      setMixes,
      setSelectedCategory,
      setSelectedTag,
    },
    mix: {
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
    track: {
      progress: trackProgress,
      progressPercent: trackProgressPercent,
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
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
