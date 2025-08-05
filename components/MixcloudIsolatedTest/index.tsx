import React, { useEffect, useRef, useState } from "react";

interface IsolatedTestProps {
  mcKey: string;
}

export const MixcloudIsolatedTest: React.FC<IsolatedTestProps> = ({
  mcKey,
}) => {
  // Local state only - no context integration
  const localIframeRef = useRef<HTMLIFrameElement>(null);
  const [widget, setWidget] = useState<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  console.log(`🔄 MixcloudIsolatedTest render - mcKey: ${mcKey}`);

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
    if (!scriptLoaded || !localIframeRef.current || widget) return;

    console.log("🎯 Creating widget instance");
    const newWidget = (globalThis as any).Mixcloud.PlayerWidget(
      localIframeRef.current,
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
  const handlePlay = (): void => {
    if (!widget) return;
    console.log("🎮 Manual play button clicked");
    widget.play();
  };

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

  const widgetUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(`https://www.mixcloud.com${mcKey || testMixes[0]}`)}`;

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
        ref={localIframeRef}
        src={widgetUrl}
        width="100%"
        height="60"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        style={{ border: "1px solid blue" }}
        title="local-mixcloud-iframe"
      />

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
