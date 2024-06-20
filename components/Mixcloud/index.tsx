import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SemiCircularProgress from "components/Controls/SemiCircularProgress";
import {
  StyledAudioControls,
  StyledAudioControlsInner,
  StyledAudioControlsWrapper,
  StyledHeadphonesWrapper,
  StyledMixcloudWidget,
  StyledPlay,
  StyledPlayer,
  StyledPlayerWrapper,
  StyledProgressBar,
  StyledSkipNext,
  StyledSkipPrevious,
} from "components/Mixcloud/StyledMixcloud";
import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import { useEffect, useRef } from "react";

export const Mixcloud: React.FC<MixcloudProps> = (props) => {
  const { autoPlay = true, children, defaultMcKey } = props;

  const {
    mcKey,
    setMcKey,
    controls: { handlePlayPause, handleNext, handlePrevious },
    mix: {
      progressPercent: mixProgressPercent,
      setDuration,
      setProgress: setMixProgress,
      setProgressPercent: setMixProgressPercent,
      setShowUnavailable,
    },
    track: {
      progressPercent: trackProgressPercent,
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
    },
    widget: {
      iframeRef,
      playing,
      scriptLoaded,
      setLoaded,
      setPlayer,
      setPlayerUpdated,
      setPlaying,
      setScriptLoaded,
      widgetUrl,
    },
  } = useMixcloud();

  const { colours } = useSession();

  const timer = useRef<any>(null);

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
                <StyledAudioControls colours={colours}>
                  <StyledHeadphonesWrapper>
                    <svg
                      width="240"
                      height="180"
                      viewBox="0 0 240 180"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="shadow"
                        d="M 120,90 m -90,0 a 90,90 0 1,0 180,0 a 90,90 0 1,0 -180,0
                      M 30,90 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0
                      M 210,90 m -30,0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0"
                        fill={colours?.primary ?? "#fff"}
                        fillOpacity="0.5"
                      />
                    </svg>
                  </StyledHeadphonesWrapper>

                  <StyledAudioControlsInner>
                    <StyledSkipPrevious>
                      <SkipPreviousIcon
                        onClick={handlePrevious}
                        fontSize="inherit"
                        className="control"
                      />
                    </StyledSkipPrevious>

                    <StyledPlay colours={colours}>
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
                $barWidth={3}
              />
            </StyledProgressBar>
            <StyledProgressBar $position="bottom">
              <SemiCircularProgress
                $value={mixProgressPercent}
                $position="bottom"
                $start="left"
                $barWidth={3}
              />
            </StyledProgressBar>
          </StyledPlayerWrapper>

          {/* <Volume /> */}

          {children}
        </>
      )}
    </>
  );
};

export default Mixcloud;
