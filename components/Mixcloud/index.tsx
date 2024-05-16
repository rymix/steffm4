import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import {
  StyledAudioControls,
  StyledMixcloudWidget,
  StyledNothing,
  StyledPlayer,
  StyledVolumeControls,
} from "components/Mixcloud/StyledMixcloud";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useCallback, useEffect, useRef, useState } from "react";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const {
    autoPlay = true,
    url,
    children,
    onReady,
    onPlay,
    onPause,
    onProgress,
    onBuffering,
    onEnded,
    onError,
  } = props;

  const {
    collapsed,
    handleNext,
    handlePlayPause,
    handlePrevious,
    handleLoad,
    handleVolumeDown,
    handleVolumeUp,
    loaded,
    mcKey,
    mcUrl,
    player,
    playing,
    scriptLoaded,
    showUnavailable,
    setCollapsed,
    setDuration,
    setLoaded,
    setMcKey,
    setPlayer,
    setPlaying,
    setProgress,
    setScriptLoaded,
    setShowUnavailable,
  } = useMixcloud();

  const [value, setValue] = useState<number>(30);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timer = useRef<any>(null);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const incrementShowIndex = useCallback(() => {
    setMcKey("/rymixxx/adventures-in-decent-music-volume-26/");
  }, [mcKey]);

  useEffect(() => {
    setMcKey("/rymixxx/my-pair-of-shoes-volume-66/");
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

        widget.events.progress.on((prog: number) => {
          setProgress(prog);
          onProgress?.();
        });

        widget.events.error.on((error: any) => {
          setShowUnavailable(true);
          setPlaying(false);
          onError?.(error);
        });

        widget.getDuration().then((dur: number) => {
          setLoaded(false);
          if (!dur) {
            console.error("licence issue");
            setShowUnavailable(true);
            setPlaying(false);
            return;
          }
          setLoaded(true);
          setDuration(dur);
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
          <StyledMixcloudWidget
            title="mixcloud-widget"
            ref={iframeRef}
            key={mcKey}
            className="mixcloud-widget"
            width="100%"
            height="60"
            allow="autoplay"
            src={mcUrl}
            frameBorder="0"
          />

          <StyledPlayer>
            <StyledNothing />

            <StyledAudioControls>
              <button type="button" onClick={handlePrevious}>
                Previous
              </button>

              <button type="button" onClick={handlePlayPause}>
                {playing ? "Pause" : "Play"}
              </button>

              <button type="button" onClick={handleNext}>
                Next
              </button>
            </StyledAudioControls>

            <StyledVolumeControls>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={value}
                  onChange={handleChange}
                />
                <VolumeUp />
              </Stack>
            </StyledVolumeControls>
          </StyledPlayer>

          {children}
        </>
      )}
      {!loaded && !showUnavailable && <p>LOADING</p>}
    </>
  );
};

export default Mixcloud;
