import type { MixcloudContextState } from "contexts/mixcloud/types";
import type { Mix } from "db/types";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  mcKeyFormatter,
  mcKeyUrlFormatter,
  mcWidgetUrlFormatter,
} from "utils/functions";

/* Helpers */
const fetchRandomMcKey = async (): Promise<string> => {
  const response = await fetch("/api/random-mix");
  const data = await response.json();
  return data.mcKey;
};

const useMixcloudContextState = (): MixcloudContextState => {
  const [mixDetails, setMixDetails] = useState("");
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

  const mcUrl = mcKeyUrlFormatter(mcKey);
  const widgetUrl = mcWidgetUrlFormatter(mcKey);

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
    const mixIndex = mixes.findIndex((mix) => mcKey.includes(mix.mixcloudKey));

    if (!mixes || mixes.length === 0 || mixIndex === -1) {
      handleLoad(await fetchRandomMcKey());
    } else {
      const nextIndex = (mixIndex + 1) % mixes.length;
      handleLoad(mixes[nextIndex].mixcloudKey);
    }
  }, [mcKey, mixes]);

  const handlePrevious = useCallback(async () => {
    const mixIndex = mixes.findIndex((mix) => mcKey.includes(mix.mixcloudKey));

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
    setTrackProgressPercent((mixProgress / duration) * 100);
  }, [duration, mixProgress]);

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
      tracks: [],
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
