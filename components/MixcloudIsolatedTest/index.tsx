import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useRef } from "react";

export const MixcloudIsolatedTest: React.FC = () => {
  const {
    mcKey,
    controls: { handleLoad, handleNext, handlePlay },
    mix: {
      setProgress: setMixProgress,
      setProgressPercent: setMixProgressPercent,
      setShowUnavailable,
      setDuration,
      duration,
      progress: mixProgress,
    },
    track: {
      setProgress: setTrackProgress,
      setProgressPercent: setTrackProgressPercent,
    },
    widget: {
      iframeRef,
      player,
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

  // Track last known duration and progress values for end detection
  const lastDurationRef = useRef<number>(0);
  const lastProgressRef = useRef<number>(0);

  //  const defaultWidgetUrl = "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=https%3A%2F%2Fwww.mixcloud.com%2Frymixxx%2Fhttps%3A%2F%2Fplayer-widget.mixcloud.com%2Frymixxx%2Fadventures-in-decent-music-volume-1%2F%2F";
  const defaultWidgetUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(`https://player-widget.mixcloud.com/rymixxx/adventures-in-decent-music-volume-1/`)}`;

  // Load script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      console.log("📜 Widget script loaded");
      setScriptLoaded(true);
    });

    return () => {
      script.remove();
    };
  }, []);

  // Create widget once when script loads
  useEffect(() => {
    if (!scriptLoaded || !iframeRef.current || player) return;

    console.log("🎯 Creating widget instance");
    const newWidget = (globalThis as any).Mixcloud.PlayerWidget(
      iframeRef.current,
    );

    newWidget.ready.then(() => {
      console.log("✅ Widget ready - setting up persistent event listeners");
      setPlayer(newWidget);

      // Set up persistent event listeners that just log
      newWidget.events.play.on(() => {
        console.log("▶️ PLAY event fired");
        setPlaying(true);
      });

      newWidget.events.pause.on(() => {
        console.log(
          `⏸️ PAUSE event fired, duration:${duration}, mixProgress:${mixProgress}`,
        );
        setPlaying(false);

        // Smart end detection using last known values (since they get reset to 0 on end)
        const lastDuration = lastDurationRef.current;
        const lastProgress = lastProgressRef.current;

        console.log(
          `📊 Last known values - duration:${lastDuration}, progress:${lastProgress}`,
        );

        // Check if current values are reset (indicating end) but we had valid last values
        const valuesWereReset = duration === 0 && mixProgress === 0;
        const hadValidLastValues = lastDuration > 0 && lastProgress > 0;

        if (valuesWereReset && hadValidLastValues) {
          // Check if we were near the end before reset
          const remainingTime = lastDuration - lastProgress;
          const wasNearEnd = remainingTime <= 3; // Slightly more generous threshold

          console.log(
            `🕐 End detection with last values: ${remainingTime}s remaining (wasNearEnd: ${wasNearEnd})`,
          );

          if (wasNearEnd) {
            console.log(
              "🔚 Mix appears to have ended (values reset) - calling handleNext()",
            );
            handleNext();
            
            // Wait for new mix to load before trying to play
            setTimeout(() => {
              console.log("🎵 Attempting to auto-play next mix");
              handlePlay();
            }, 3000); // Give 3 seconds for new mix to load (increased for reliability)
            
            // Reset the refs to prevent multiple triggers
            lastDurationRef.current = 0;
            lastProgressRef.current = 0;
          }
        } else if (duration > 0 && mixProgress > 0) {
          // Fallback: normal pause detection with current values
          const remainingTime = duration - mixProgress;
          const isNearEnd = remainingTime <= 2;

          console.log(
            `🕐 Normal end detection: ${remainingTime}s remaining (isNearEnd: ${isNearEnd})`,
          );

          if (isNearEnd) {
            console.log("🔚 Mix appears to have ended - calling handleNext()");
            handleNext();
            
            // Wait for new mix to load before trying to play
            setTimeout(() => {
              console.log("🎵 Attempting to auto-play next mix (fallback)");
              handlePlay();
            }, 3000);
          }
        }
      });

      newWidget.events.progress.on((position: number, dur?: number) => {
        console.log(`⏱️ PROGRESS: ${position}s / ${dur}s`);
        setMixProgress(position);

        // Update duration from progress event and calculate percentage
        if (dur && dur > 0) {
          setDuration(dur);
          setMixProgressPercent((position / dur) * 100);

          // Track last known valid values for end detection
          lastDurationRef.current = dur;
          lastProgressRef.current = position;
        }
      });

      newWidget.events.ended.on(() => {
        console.log("⏹️ ENDED event fired (this should trigger automatically)");
        handleNext();
      });

      newWidget.events.error.on((error: any) => {
        console.log("❌ ERROR event:", error);
      });

      // Get initial duration
      newWidget.getDuration().then((dur: number) => {
        console.log(`📏 Initial duration: ${dur}s`);
        setDuration(dur);
      });
    });
  }, [scriptLoaded, player]);

  // Handle mcKey changes with widget.load()
  // useEffect(() => {
  //   if (!player || !mcKey) return;

  //   console.log(`🔄 mcKey changed to: ${mcKey} - calling widget.load()`);
  //   const mixcloudUrl = `https://player-widget.mixcloud.com${mcKey}`;

  //   player
  //     .load(mixcloudUrl, true)
  //     .then(() => {
  //       console.log(`✅ widget.load() completed for: ${mcKey}`);
  //     })
  //     .catch((error: any) => {
  //       console.log(`❌ widget.load() failed:`, error);
  //     });
  // }, [player, mcKey]);

  // const handleLoad = (newMcKey: string): void => {
  //   if (player) {
  //     const url = `https://player-widget.mixcloud.com${newMcKey}`;
  //     player
  //       .load(url, true)
  //       .then(() => {
  //         console.log(`✅ widget.load() completed for: ${url}`);
  //       })
  //       .catch((error: any) => {
  //         console.log(`❌ widget.load() failed:`, error);
  //       });
  //   }
  // };

  const handlePause = (): void => {
    if (!player) return;
    console.log("🎮 Manual pause button clicked");
    player.pause();
  };

  // Test mix options
  const testMixes = [
    "/rymixxx/adventures-in-decent-music-volume-1/",
    "/rymixxx/adventures-in-decent-music-volume-2/",
    "/rymixxx/adventures-in-decent-music-volume-3/",
  ];

  return (
    <div
      style={{
        border: "2px solid red",
        padding: "10px",
        margin: "10px",
        zIndex: "99999",
      }}
    >
      <h3>🧪 Isolated Widget Test</h3>
      <p>Current mcKey: {mcKey}</p>
      <p>
        Progress: {mixProgress}s / {duration}s (
        {((mixProgress / duration) * 100 || 0).toFixed(1)}%)
      </p>
      <p>Playing: {playing ? "Yes" : "No"}</p>
      <p>
        Last Known: {lastProgressRef.current}s / {lastDurationRef.current}s
      </p>

      <iframe
        ref={iframeRef}
        src={defaultWidgetUrl}
        width="100%"
        height="60"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        style={{ border: "1px solid blue" }}
        title="local-mixcloud-iframe"
      />

      <dl>
        <dt>defaultWidgetUrl</dt>
        <dd>{defaultWidgetUrl}</dd>
        <dt>widgetUrl</dt>
        <dd>{widgetUrl}</dd>
      </dl>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePlay} type="button">
          ▶️ Play
        </button>
        <button
          onClick={handlePause}
          style={{ marginLeft: "10px" }}
          type="button"
        >
          ⏸️ Pause
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <h4>Test Mix Loading:</h4>
        {testMixes.map((mix, index) => (
          <button
            key={mix}
            onClick={() => {
              console.log(`🔄 Loading test mix: ${mix}`);
              if (player) {
                handleLoad(mix);
              }
            }}
            style={{
              marginRight: "5px",
              backgroundColor: mcKey === mix ? "#90EE90" : "#f0f0f0",
            }}
            type="button"
          >
            Mix {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MixcloudIsolatedTest;
