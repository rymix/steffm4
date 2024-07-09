import { StyledMixcloudWidget } from "components/Mixcloud/StyledMixcloud";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef } from "react";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const { autoPlay = true, children } = props;

  const {
    mcKey,
    controls: { handleNext },
    mix: {
      setProgress: setMixProgress,
      setProgressPercent: setMixProgressPercent,
      setShowUnavailable,
    },
    track: {
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
    },
    widget: {
      iframeRef,
      scriptLoaded,
      setLoaded,
      setPlayer,
      setPlayerUpdated,
      setPlaying,
      setScriptLoaded,
      widgetUrl,
    },
  } = useMixcloud();

  const timer = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => setScriptLoaded(true));
  }, []);

  useEffect(() => {
    if (!iframeRef.current || !scriptLoaded || !mcKey) return;

    const widget = (window as any).Mixcloud.PlayerWidget(iframeRef.current);

    setPlayer(null);
    setLoaded(false);
    setShowUnavailable(false);
    setMixProgress(0);
    setMixProgressPercent(0);
    setTrackProgress(0);
    setTrackProgressPercent(0);

    widget.ready.then(() => {
      console.log("widget ready");
      setPlayer(widget);
      setPlayerUpdated(true);
      widget.pause();

      widget.events.pause.on(() => {
        setPlaying(false);
        setLoaded(true);
      });

      widget.events.play.on(() => {
        setPlaying(true);
        setLoaded(true);
        timer.current = setTimeout(() => setLoaded(true), 1000);
      });

      widget.events.ended.on(() => {
        handleNext();
      });

      widget.events.buffering.on(() => {
        setLoaded(false);
      });

      widget.events.progress.on((prog: number) => {
        setMixProgress(prog);
      });

      widget.events.error.on((error: any) => {
        console.log("error", error);
        setShowUnavailable(true);
        setPlaying(false);
      });

      widget.getDuration().then(() => {
        setLoaded(false);
        setLoaded(true);
        setShowUnavailable(false);
        timer.current = setTimeout(() => {
          if (autoPlay === true) {
            widget.play();
          }
        }, 200);
      });
    });
    // eslint-disable-next-line consistent-return
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcKey, scriptLoaded]);

  return (
    <>
      {mcKey && (
        <>
          <StyledMixcloudWidget
            title="mixcloud-widget"
            ref={iframeRef}
            key={mcKey}
            className="mixcloud-widget"
            width="100%"
            height="60"
            allow="autoplay"
            src={widgetUrl}
            frameBorder="0"
          />
          {children}
        </>
      )}
    </>
  );
};

export default Mixcloud;
