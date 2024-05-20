import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Slider } from "@mui/material";
import SemiCircularProgress from "components/Controls/SemiCircularProgress";
import {
  StyledAudioControls,
  StyledAudioControlsInner,
  StyledAudioControlsWrapper,
  StyledMixcloudWidget,
  StyledPlay,
  StyledPlayer,
  StyledPlayerWrapper,
  StyledProgressBar,
  StyledSkipNext,
  StyledSkipPrevious,
  StyledVolumeControls,
  StyledVolumeControlsWrapper,
} from "components/Mixcloud/StyledMixcloud";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef } from "react";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const { autoPlay = true, children, defaultMcKey } = props;

  const {
    mcKey,
    setMcKey,
    controls: { handlePlayPause, handleNext, handlePrevious },
    filters: { setMixes, setSelectedCategory, setSelectedTag },
    mix: {
      duration,
      progress: mixProgress,
      progressPercent: mixProgressPercent,
      setDuration,
      setProgress: setMixProgress,
      setProgressPercent: setMixProgressPercent,
      setShowUnavailable,
      showUnavailable,
    },
    track: {
      progress: trackProgress,
      progressPercent: trackProgressPercent,
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
    },
    widget: {
      iframeRef,
      loaded,
      playing,
      scriptLoaded,
      setLoaded,
      setPlayer,
      setPlayerUpdated,
      setPlaying,
      setScriptLoaded,
      setVolume,
      volume,
      widgetUrl,
    },
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
    setMixProgress(0);
    setMixProgressPercent(0);
    setTrackProgress(0);
    setTrackProgressPercent(0);

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
        setMixProgress(prog);
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

          <StyledPlayerWrapper>
            <StyledPlayer>
              <StyledAudioControlsWrapper>
                <StyledAudioControls>
                  <StyledAudioControlsInner>
                    <StyledSkipPrevious>
                      <SkipPreviousIcon
                        onClick={handlePrevious}
                        fontSize="inherit"
                        className="control"
                      />
                    </StyledSkipPrevious>

                    <StyledPlay>
                      {playing ? (
                        <PauseIcon
                          onClick={handlePlayPause}
                          fontSize="inherit"
                          className="control"
                        />
                      ) : (
                        <PlayArrowIcon
                          onClick={handlePlayPause}
                          fontSize="inherit"
                          className="control"
                        />
                      )}
                    </StyledPlay>

                    <StyledSkipNext>
                      <SkipNextIcon
                        onClick={handleNext}
                        fontSize="inherit"
                        className="control"
                      />
                    </StyledSkipNext>
                  </StyledAudioControlsInner>
                </StyledAudioControls>
              </StyledAudioControlsWrapper>
            </StyledPlayer>

            <StyledProgressBar $position="top">
              <SemiCircularProgress
                $value={trackProgressPercent}
                $position="top"
                $start="left"
                $barWidth={1}
              />
            </StyledProgressBar>
            <StyledProgressBar $position="bottom">
              <SemiCircularProgress
                $value={mixProgressPercent}
                $position="bottom"
                $start="left"
                $barWidth={1}
              />
            </StyledProgressBar>
          </StyledPlayerWrapper>

          <StyledVolumeControlsWrapper>
            <StyledVolumeControls>
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
            </StyledVolumeControls>
          </StyledVolumeControlsWrapper>

          {children}
        </>
      )}
      {!loaded && !showUnavailable && <p>LOADING</p>}
    </>
  );
};

export default Mixcloud;
