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
  const [volume, setVolume] = useState(0.75);

  const handlePlayPause = useCallback(() => {
    player.togglePlay();
  }, [player]);

  const handleVolumeChange = useCallback(
    (localVolume: number) => {
      setVolume(localVolume);
      player.setVolume(localVolume);
    },
    [player],
  );

  const handleLoad = (localMcKey?: string): void => {
    if (!localMcKey) return;
    setMcKey(localMcKey);
  };

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
    handlePlayPause,
    handleVolumeChange,
    loaded,
    mcKey,
    mcUrl,
    player,
    playing,
    progress,
    scriptLoaded,
    showUnavailable,
    volume,
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
  };
};

export default useMixcloudContextState;
