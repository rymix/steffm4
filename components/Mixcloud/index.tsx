import { StyledMixcloudWidget } from "components/Mixcloud/StyledMixcloud";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef } from "react";
import { DEBUG } from "utils/constants";

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

    // If widget.load() mode is enabled, don't recreate the iframe
    if (useWidgetLoad && player) {
      if (DEBUG)
        console.log(`Widget.load() mode enabled - skipping iframe recreation for mcKey: ${mcKey}`);
      return;
    }

    const widget = (globalThis as any).Mixcloud.PlayerWidget(iframeRef.current);

    setPlayer(null);
    setPlaying(false); // Reset playing state when new mix loads
    setLoaded(false);
    setShowUnavailable(false);
    setMixProgress(0);
    setMixProgressPercent(0);
    setTrackProgress(0);
    setTrackProgressPercent(0);

    widget.ready.then(() => {
      if (DEBUG) console.log("Widget ready");
      setPlayer(widget);
      setPlayerUpdated(true);
      widget.pause();

      widget.events.pause.on(() => {
        if (DEBUG) console.log("PAUSE event fired");
        setPlaying(false);
        setLoaded(true);
      });

      widget.events.play.on(() => {
        if (DEBUG) console.log("PLAY event fired");
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

      widget.events.progress.on((position: number, duration?: number) => {
        if (DEBUG) {
          console.log(`PROGRESS event: position=${position}s, duration=${duration}s`);
        }
        setMixProgress(position);
        // Update duration from progress event if provided (more reliable for widget.load)
        if (duration && duration > 0) {
          setDuration(duration);
        }
      });

      widget.events.error.on((error: any) => {
        console.error("Mixcloud widget error:", error);
        setShowUnavailable(true);
        setPlaying(false);
      });

      widget.getDuration().then(() => {
        setLoaded(false);
        setLoaded(true);
        setShowUnavailable(false);

        // Enable widget.load() mode after first successful initialization
        if (DEBUG)
          console.log("Enabling widget.load() mode for future mix changes");
        setUseWidgetLoad(true);

        timer.current = setTimeout(async () => {
          if (autoPlay === true) {
            try {
              await widget.play();
              // Playing state will be set by the play event listener
            } catch (error) {
              if (DEBUG) console.warn("Autoplay blocked by browser:", error);
              // Don't set playing state if autoplay failed
              setPlaying(false);
            }
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
  }, [mcKey, scriptLoaded, useWidgetLoad, player]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <>
      {mcKey && (
        <>
          <StyledMixcloudWidget
            title="mixcloud-widget"
            ref={iframeRef}
            key={useWidgetLoad ? "widget-persistent" : mcKey}
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
