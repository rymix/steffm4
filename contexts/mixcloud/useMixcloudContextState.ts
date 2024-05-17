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
  const [collapsed, setCollapsed] = useState(false);
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
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [volume, setVolume] = useState(8 / 11);
  const [volumeIndex, setVolumeIndex] = useState(8);

  const mcUrl = mcKeyUrlFormatter(mcKey);
  const widgetUrl = mcWidgetUrlFormatter(mcKey);

  /* Play / Pause Controls */
  const handlePlayPause = useCallback(() => {
    player?.togglePlay();
    setPlayerUpdated(false);
  }, [player, playerUpdated]);

  /* Volume Controls */
  const handleVolumeChange = useCallback(
    (step: number) => {
      const newVolumeIndex = Math.max(0, Math.min(11, volumeIndex + step));
      const newVolume = newVolumeIndex / 11;
      setVolumeIndex(newVolumeIndex);
      setVolume(newVolume);
      if (player) {
        player.setVolume(newVolume);
      }
    },
    [volumeIndex, player],
  );

  const handleVolumeDown = (): void => handleVolumeChange(-1);
  const handleVolumeUp = (): void => handleVolumeChange(1);

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

  return {
    collapsed,
    duration,
    fetchRandomMcKey,
    handleLoad,
    handleNext,
    handlePlayPause,
    handlePrevious,
    handleVolumeDown,
    handleVolumeUp,
    iframeRef,
    loaded,
    mcKey,
    mcKeyNext,
    mcKeyPrevious,
    mcUrl,
    mixes,
    player,
    playerUpdated,
    playing,
    progress,
    scriptLoaded,
    selectedCategory,
    selectedTag,
    showUnavailable,
    volume,
    volumeIndex,
    setCollapsed,
    setDuration,
    setLoaded,
    setMcKey,
    setMcKeyNext,
    setMcKeyPrevious,
    setMixes,
    setPlayer,
    setPlayerUpdated,
    setPlaying,
    setProgress,
    setScriptLoaded,
    setSelectedCategory,
    setSelectedTag,
    setShowUnavailable,
    setVolume,
    setVolumeIndex,
    widgetUrl,
  };
};

export default useMixcloudContextState;
