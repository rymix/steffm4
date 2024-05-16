import type { MixcloudContextState } from "contexts/mixcloud/types";
import { useCallback, useEffect, useState } from "react";

const useMixcloudContextState = (): MixcloudContextState => {
  const [collapsed, setCollapsed] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mcKey, setMcKey] = useState("");
  const [mcUrl, setMcUrl] = useState("");
  const [player, setPlayer] = useState<any>();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [volume, setVolume] = useState(8 / 11);
  const [volumeIndex, setVolumeIndex] = useState(8);

  /* Navigation Controls */
  const handlePrevious = useCallback(() => {
    console.log("Previous");
  }, [mcKey, player]);

  const handleNext = useCallback(() => {
    console.log("Next");
  }, [mcKey, player]);

  /* Play / Pause Controls */
  const handlePlayPause = useCallback(() => {
    player.togglePlay();
  }, [player]);

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
  const handleLoad = (localMcKey?: string): void => {
    if (!localMcKey) return;

    const formattedMcKey = localMcKey.startsWith("/rymixxx/")
      ? localMcKey
      : `/rymixxx/${localMcKey}/`;

    setMcKey(formattedMcKey);
  };

  /* Set Mixcloud URL on mcKey change */
  useEffect(() => {
    const mixUrl = `https://www.mixcloud.com${mcKey}`;
    const widgetUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
      mixUrl,
    )}`;

    setMcUrl(widgetUrl);
  }, [mcKey]);

  return {
    collapsed,
    duration,
    handleLoad,
    handleNext,
    handlePlayPause,
    handlePrevious,
    handleVolumeDown,
    handleVolumeUp,
    loaded,
    mcKey,
    mcUrl,
    player,
    playing,
    progress,
    scriptLoaded,
    showUnavailable,
    volume,
    volumeIndex,
    setCollapsed,
    setDuration,
    setLoaded,
    setMcKey,
    setPlayer,
    setPlaying,
    setProgress,
    setScriptLoaded,
    setShowUnavailable,
    setVolume,
    setVolumeIndex,
  };
};

export default useMixcloudContextState;
