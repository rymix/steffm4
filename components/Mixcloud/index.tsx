import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Debug from "components/Mixcloud/Debug";
import {
  StyledAudioControls,
  StyledMixcloudWidget,
  StyledNothing,
  StyledPlayer,
  StyledVolumeControls,
} from "components/Mixcloud/StyledMixcloud";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef } from "react";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const { autoPlay = true, children, defaultMcKey } = props;

  const {
    collapsed,
    handlePlayPause,
    handleNext,
    handlePrevious,
    iframeRef,
    loaded,
    mcKey,
    playing,
    scriptLoaded,
    showUnavailable,
    setCollapsed,
    setDuration,
    setLoaded,
    setMcKey,
    setPlayer,
    setPlayerUpdated,
    setPlaying,
    setProgress,
    setScriptLoaded,
    setShowUnavailable,
    setVolume,
    volume,
    widgetUrl,
  } = useMixcloud();

  const timer = useRef<any>(null);

  const handleVolumeChange = (
    event: Event,
    newValue: number | number[],
  ): void => {
    setVolume((newValue as number) / 100);
  };

  useEffect(() => {
    if (defaultMcKey) setMcKey(defaultMcKey);
  }, []);

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
    setProgress(0);

    widget.ready.then(() => {
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
        setProgress(prog);
      });

      widget.events.error.on((error: any) => {
        console.log("error", error);
        setShowUnavailable(true);
        setPlaying(false);
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

          <StyledPlayer>
            <StyledNothing />

            <StyledAudioControls>
              <SkipPreviousIcon
                onClick={handlePrevious}
                fontSize="inherit"
                className="control"
              />

              {playing ? (
                <PauseCircleOutlineIcon
                  onClick={handlePlayPause}
                  fontSize="inherit"
                  className="control"
                />
              ) : (
                <PlayCircleOutlineIcon
                  onClick={handlePlayPause}
                  fontSize="inherit"
                  className="control"
                />
              )}

              <SkipNextIcon
                onClick={handleNext}
                fontSize="inherit"
                className="control"
              />
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
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  defaultValue={70}
                  min={0}
                  max={100}
                />
                <VolumeUp />
              </Stack>
            </StyledVolumeControls>
          </StyledPlayer>

          <Debug />
          {children}
        </>
      )}
      {!loaded && !showUnavailable && <p>LOADING</p>}
    </>
  );
};

export default Mixcloud;
