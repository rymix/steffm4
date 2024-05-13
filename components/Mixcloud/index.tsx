import Debug from "components/Mixcloud/Debug";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useCallback, useEffect, useRef } from "react";

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

  const {
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
  } = useMixcloud();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timer = useRef<any>(null);

  const incrementShowIndex = useCallback(() => {
    if (showIndex !== null && showIndex < shows.length - 1) {
      setShowIndex(showIndex + 1);
    } else {
      setShowIndex(0);
    }
  }, [showIndex, shows]);

  const handlePlayPause = useCallback(() => {
    player.togglePlay();
  }, [player]);

  const makeMixcloudUrl = (localMcKey?: string): string => {
    const localUrl = `https://www.mixcloud.com${localMcKey || mcKey}`;
    console.log(localUrl);
    return `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=${autoPlay}&feed=${encodeURIComponent(
      localUrl,
    )}`;
  };

  const makeMixcloudCloudcastKey = (localMcKey?: string): string => {
    return `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=${autoPlay}&feed=${encodeURIComponent(
      `https://www.mixcloud.com/rymixxx/${localMcKey || mcKey}/`,
    )}`;
  };

  const handleLoad = (localMcKey?: string): void => {
    if (!localMcKey) return;
    setMcKey(localMcKey);
  };

  useEffect(() => {
    setMcKey("/rymixxx/my-pair-of-shoes-volume-66/");
    setShows([
      {
        key: "/rymixxx/my-pair-of-shoes-volume-65-deepness/",
        url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-65-deepness/",
      },
      {
        key: "/rymixxx/my-pair-of-shoes-volume-66/",
        url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-66/",
      },
      {
        key: "/rymixxx/my-pair-of-shoes-volume-67-deep/",
        url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-67-deep/",
      },
      {
        key: "/rymixxx/my-pair-of-shoes-volume-68/",
        url: "https://www.mixcloud.com/rymixxx/my-pair-of-shoes-volume-68/",
      },
      {
        key: "/rymixxx/adventures-in-decent-music-volume-26/",
        url: "https://www.mixcloud.com/rymixxx/adventures-in-decent-music-volume-26/",
      },
    ]);
  }, []);

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

      setPlayer(null);
      setLoaded(false);
      setShowUnavailable(false);
      setProgress(0);

      widget.ready.then(() => {
        setPlayer(widget);
        widget.pause();
        onReady?.(widget);

        widget.events.pause.on(() => {
          setPlaying(false);
          setLoaded(true);
          onPause?.();
        });

        widget.events.play.on(() => {
          setPlaying(true);
          setLoaded(true);
          timer.current = setTimeout(() => setLoaded(true), 1000);
          onPlay?.();
        });

        widget.events.ended.on(() => {
          incrementShowIndex();
          onEnded?.();
        });

        widget.events.buffering.on(() => {
          setLoaded(false);
          onBuffering?.();
        });

        widget.events.error.on((error: any) => {
          setShowUnavailable(true);
          setPlaying(false);
          onError?.(error);
        });

        widget.getDuration().then(function (duration: number) {
          setLoaded(false);
          if (!duration) {
            console.error("licence issue");
            setShowUnavailable(true);
            setPlaying(false);
            return;
          }
          setLoaded(true);
          setDuration(duration);
          setShowUnavailable(false);
          if (!collapsed) {
            setCollapsed(false);
          }
          timer.current = setTimeout(
            () => autoPlay === true && widget.play(),
            200,
          );
        });
      });
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mcKey, scriptLoaded]);

  return (
    <>
      {mcKey && (
        <>
          <iframe
            title="mixcloud-widget"
            ref={iframeRef}
            key={mcKey}
            className="mixcloud-widget"
            width="100%"
            height="60"
            allow="autoplay"
            src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=${autoPlay}&feed=${makeMixcloudUrl(
              mcKey,
            )}`}
            frameBorder="0"
          />

          <button type="button" onClick={handlePlayPause}>
            Play/Pause
          </button>

          <button
            type="button"
            onClick={() => {
              handleLoad("/rymixxx/adventures-in-decent-music-volume-26/");
            }}
          >
            Load 1
          </button>

          <button
            type="button"
            onClick={() => {
              handleLoad("/rymixxx/my-pair-of-shoes-volume-68/");
            }}
          >
            Load 2
          </button>

          <Debug />

          {children}
        </>
      )}
      {!loaded && !showUnavailable && <p>LOADING</p>}
    </>
  );
};

export default Mixcloud;
