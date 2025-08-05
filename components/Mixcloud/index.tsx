import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const { autoPlay = true, children } = props;

  const {
    mcKey,
    controls: { handleNext },
    mix: {
      setProgress: setMixProgress,
      setProgressPercent: setMixProgressPercent,
      setShowUnavailable,
      setDuration,
    },
    track: {
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
    },
    widget: {
      iframeRef,
      player,
      scriptLoaded,
      setLoaded,
      setPlayer,
      setPlayerUpdated,
      setPlaying,
      setScriptLoaded,
      setUseWidgetLoad,
      useWidgetLoad,
      widgetUrl,
    },
  } = useMixcloud();

  return (
    <>
      {mcKey && (
        <>
          <div>MIXCLOUD</div>
          {children}
        </>
      )}
    </>
  );
};

export default Mixcloud;
