import type { MixcloudContextState } from "contexts/mixcloud/types";
import { useState } from "react";

const useMixcloudContextState = (): MixcloudContextState => {
  const [collapsed, setCollapsed] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mcKey, setMcKey] = useState("");
  const [player, setPlayer] = useState<any>();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [shows, setShows] = useState<string[]>([]);
  const [showIndex, setShowIndex] = useState(0);
  const [showUnavailable, setShowUnavailable] = useState(false);

  return {
    collapsed,
    duration,
    loaded,
    mcKey,
    player,
    playing,
    progress,
    scriptLoaded,
    shows,
    showIndex,
    showUnavailable,
    setCollapsed,
    setDuration,
    setLoaded,
    setMcKey,
    setPlayer,
    setPlaying,
    setProgress,
    setScriptLoaded,
    setShows,
    setShowIndex,
    setShowUnavailable,
  };
};

export default useMixcloudContextState;
