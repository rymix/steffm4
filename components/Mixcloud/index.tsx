import type { MixcloudProps } from "components/Mixcloud/types";
import { useEffect, useRef, useState } from "react";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const {
    autoPlay = true,
    url,
    showsData,
    listIndex = 0,
    withExclusives = false,
    width,
    height,
    showWidget,
    style,
    children,
    onReady,
    onPlay,
    onPause,
    onBuffering,
    onEnded,
    onError,
  } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showsLabel, setShowsLabel] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => setScriptLoaded(true));
  }, []);

  useEffect(() => {
    if (iframeRef.current && scriptLoaded) {
      const widget = (window as any).Mixcloud.PlayerWidget(iframeRef.current);

      actions.setPlayer(null);
      actions.setLoaded(false);
      actions.setShowUnavailable(false);
      actions.setProgress(0);

      widget.ready.then(() => {
        actions.setPlayer(widget);
        widget.pause();
        onReady?.(widget);

        widget.events.pause.on(() => {
          actions.setPlaying(false);
          actions.setLoaded(true);
          onPause?.();
        });

        widget.events.play.on(() => {
          actions.setPlaying(true);
          actions.setLoaded(true);
          timer.current = setTimeout(() => actions.setLoaded(true), 1000);
          onPlay?.();
        });

        widget.events.ended.on(() => {
          incrementShowIndex();
          onEnded?.();
        });

        widget.events.buffering.on(() => {
          actions.setLoaded(false);
          onBuffering?.();
        });

        widget.events.error.on((error: any) => {
          actions.setShowUnavailable(true);
          actions.setPlaying(false);
          onError?.(error);
        });

        widget.getDuration().then(function (duration: number) {
          actions.setLoaded(false);
          if (!duration) {
            console.error("licence issue");
            actions.setShowUnavailable(true);
            actions.setPlaying(false);
            return;
          }
          actions.setLoaded(true);
          actions.setDuration(duration);
          actions.setShowUnavailable(false);
          !props.collapsed && actions.setCollapsed(false);
          timer.current = setTimeout(
            () => autoPlay === true && widget.play(),
            200,
          );
        });
      });
      return () => {
        timer.current && clearTimeout(timer.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shows, showIndex, scriptLoaded]);

  return <p>farts</p>;
};

export default Mixcloud;
