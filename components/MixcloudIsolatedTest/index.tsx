import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect } from "react";

export const MixcloudIsolatedTest: React.FC = () => {
  const {
    mcKey,
    controls: { handleLoad, handleNext, handlePlay, handlePause },
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

  //  const defaultWidgetUrl = "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=https%3A%2F%2Fwww.mixcloud.com%2Frymixxx%2Fhttps%3A%2F%2Fplayer-widget.mixcloud.com%2Frymixxx%2Fadventures-in-decent-music-volume-1%2F%2F";
  const defaultWidgetUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&hide_tracklist=1&mini=1&autoplay=1&feed=${encodeURIComponent(`https://player-widget.mixcloud.com/rymixxx/adventures-in-decent-music-volume-1/`)}`;

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
        console.log("⏸️ PAUSE event fired");
        setPlaying(false);
      });

      newWidget.events.progress.on(
        async (position: number, duration?: number) => {
          console.log(`⏱️ PROGRESS: ${position}s / ${duration}s`);
          setMixProgress(position);
          setMixProgressPercent((duration || 0 / position) * 100);

          // if (duration && position >= duration - 5) {
          //   handlePause();
          //   handleLoad("/rymixxx/adventures-in-decent-music-volume-3/");
          // }
        },
      );

      newWidget.events.ended.on(async () => {
        console.log("⏹️ ENDED event fired");
        await handleLoad("/rymixxx/adventures-in-decent-music-volume-3/");
        handlePlay();
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

  // const handlePause = (): void => {
  //   if (!player) return;
  //   console.log("🎮 Manual pause button clicked");
  //   player.pause();
  // };

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
          onClick={async () => {
            await handlePause();
          }}
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
