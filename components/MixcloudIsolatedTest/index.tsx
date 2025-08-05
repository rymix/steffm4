import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useState } from "react";
import { DEBUG } from "utils/constants";

interface IsolatedTestProps {
  localMcKey: string;
}

export const MixcloudIsolatedTest: React.FC<IsolatedTestProps> = ({
  localMcKey,
}) => {
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
      playing,
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

  // Local state only - no context integration
  const [widget, setWidget] = useState<any>(null);

  console.log(`🔄 MixcloudIsolatedTest render - localMcKey: ${localMcKey}`);

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
    if (!scriptLoaded || !iframeRef.current || widget) return;

    console.log("🎯 Creating widget instance");
    const newWidget = (globalThis as any).Mixcloud.PlayerWidget(
      iframeRef.current,
    );

    newWidget.ready.then(() => {
      console.log("✅ Widget ready - setting up persistent event listeners");
      setWidget(newWidget);

      // Set up persistent event listeners that just log
      newWidget.events.play.on(() => {
        console.log("▶️ PLAY event fired");
      });

      newWidget.events.pause.on(() => {
        console.log("⏸️ PAUSE event fired");
      });

      newWidget.events.progress.on((position: number, duration?: number) => {
        console.log(`⏱️ PROGRESS: ${position}s / ${duration}s`);
      });

      newWidget.events.ended.on(() => {
        console.log("⏹️ ENDED event fired");
      });

      newWidget.events.error.on((error: any) => {
        console.log("❌ ERROR event:", error);
      });

      // Get initial duration
      newWidget.getDuration().then((dur: number) => {
        console.log(`📏 Initial duration: ${dur}s`);
      });
    });
  }, [scriptLoaded, widget]);

  // Handle mcKey changes with widget.load()
  useEffect(() => {
    if (!widget || !mcKey) return;

    console.log(`🔄 mcKey changed to: ${mcKey} - calling widget.load()`);
    const mixcloudUrl = `https://www.mixcloud.com${mcKey}`;

    widget
      .load(mixcloudUrl, true)
      .then(() => {
        console.log(`✅ widget.load() completed for: ${mcKey}`);
      })
      .catch((error: any) => {
        console.log(`❌ widget.load() failed:`, error);
      });
  }, [widget, mcKey]);

  // Manual controls for testing
  // const handlePlay = (): void => {
  //   if (!widget) return;
  //   console.log("🎮 Manual play button clicked");
  //   widget.play();
  // };

  const handlePlay = useCallback(async () => {
    if (!widget) return;

    try {
      await widget.play();
      if (DEBUG) console.log("player.play() completed successfully");
      setPlayerUpdated(false);
      // Playing state will be set by the play event listener
      // But if event doesn't fire, we need to handle it manually
      setTimeout(async () => {
        try {
          const isPaused = await widget.getIsPaused();
          if (DEBUG)
            console.log(
              `Post-play check: widget paused = ${isPaused}, UI playing = ${playing}`,
            );
          if (!isPaused && !playing) {
            if (DEBUG)
              console.log("Play event didn't fire - setting UI state manually");
            setPlaying(true);
          }
        } catch (error) {
          console.error("Error checking play state:", error);
        }
      }, 100);
    } catch (error) {
      console.error("Error in play:", error);
      setPlaying(false);
    }
  }, [widget, playing]);

  const handlePause = (): void => {
    if (!widget) return;
    console.log("🎮 Manual pause button clicked");
    widget.pause();
  };

  // Test mix options
  const testMixes = [
    "/rymixxx/adventures-in-decent-music-volume-1/",
    "/rymixxx/adventures-in-decent-music-volume-2/",
    "/rymixxx/adventures-in-decent-music-volume-3/",
  ];

  const localWidgetUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(`https://www.mixcloud.com${mcKey || testMixes[0]}`)}`;

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

      {/* Render iframe directly in component */}
      <iframe
        ref={iframeRef}
        src={widgetUrl}
        width="100%"
        height="60"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        style={{ border: "1px solid blue" }}
        title="local-mixcloud-iframe"
      />

      <dl>
        <dt>widgetUrl</dt>
        <dd>{widgetUrl}</dd>
        <dt>localWidgetUrl</dt>
        <dd>{localWidgetUrl}</dd>
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
              if (widget) {
                const url = `https://www.mixcloud.com${mix}`;
                widget.load(url, true);
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

      <div style={{ marginTop: "10px", fontSize: "12px" }}>
        <strong>Watch console for:</strong>
        <ul>
          <li>▶️ PLAY events</li>
          <li>⏸️ PAUSE events</li>
          <li>⏱️ PROGRESS events</li>
          <li>Widget ready messages</li>
        </ul>
      </div>
    </div>
  );
};

export default MixcloudIsolatedTest;
