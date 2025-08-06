import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

const WidgetTest: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [widget, setWidget] = useState<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentMix, setCurrentMix] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  // Test mixes - these are known working Mixcloud URLs
  const testMixes = [
    "/rymixxx/adventures-in-decent-music-volume-1/", // Mix 1
    "/rymixxx/adventures-in-decent-music-volume-2/", // Mix 2
    "/rymixxx/adventures-in-decent-music-volume-3/", // Mix 3
  ];

  // Race condition handling
  const endedEventRef = useRef<boolean>(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentMixRef = useRef<string>(testMixes[0]); // Track current mix reliably

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-20), `${timestamp}: ${message}`]); // Keep last 20 logs
  };

  // Helper function to set up event listeners on any widget instance
  const setupEventListeners = (widgetInstance: any) => {
    addLog("🔧 Setting up event listeners on widget");

    widgetInstance.events.play.on(() => {
      addLog("▶️ PLAY event fired");
      setPlaying(true);
      endedEventRef.current = false;
    });

    widgetInstance.events.pause.on(() => {
      addLog("⏸️ PAUSE event fired");
      setPlaying(false);

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      pauseTimeoutRef.current = setTimeout(() => {
        if (!endedEventRef.current) {
          addLog("PAUSE: Confirmed as genuine pause (not end-of-mix)");
        }
        pauseTimeoutRef.current = null;
      }, 500);
    });

    widgetInstance.events.progress.on((position: number, dur?: number) => {
      addLog(`PROGRESS event: position=${position}s, duration=${dur}s`);
      setProgress(position);

      if (dur && dur > 0) {
        setDuration(dur);
        setProgressPercent((position / dur) * 100);
      }
    });

    widgetInstance.events.ended.on(() => {
      addLog("🎯 ENDED event fired - PRIORITY EVENT");
      setPlaying(false);

      endedEventRef.current = true;

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }

      addLog("🔄 Widget corrupted after ended - recreating...");
      setTimeout(() => {
        // Use ref instead of state to avoid timing issues
        const mixWhenEnded = currentMixRef.current;
        addLog(`🔍 Debug: currentMixRef.current = "${mixWhenEnded}"`);
        addLog(`🔍 Debug: testMixes = ${JSON.stringify(testMixes)}`);

        // Find current mix index and pick a different one
        const currentIndex = testMixes.findIndex((mix) => mix === mixWhenEnded);
        addLog(`🔍 Debug: currentIndex = ${currentIndex}`);

        let nextIndex = (currentIndex + 1) % testMixes.length;
        addLog(`🔍 Debug: calculated nextIndex = ${nextIndex}`);

        // Safety check - if somehow we're still on the same mix, force a different one
        if (testMixes[nextIndex] === mixWhenEnded) {
          nextIndex = currentIndex === 0 ? 1 : 0;
          addLog(
            `🔍 Debug: safety check triggered, using nextIndex = ${nextIndex}`,
          );
        }

        const nextMix = testMixes[nextIndex];
        addLog(`🎵 Current: "${mixWhenEnded}" → Next: "${nextMix}"`);

        // Double check they're actually different
        if (nextMix === mixWhenEnded) {
          addLog(
            `❌ ERROR: Next mix is same as current! Forcing different mix...`,
          );
          const forcedMix =
            testMixes.find((mix) => mix !== mixWhenEnded) || testMixes[0];
          addLog(`🎵 Forced mix: "${forcedMix}"`);
          recreateWidgetWithMix(forcedMix);
        } else {
          recreateWidgetWithMix(nextMix);
        }
      }, 500);
    });

    widgetInstance.events.error.on((error: any) => {
      addLog(`ERROR event: ${JSON.stringify(error)}`);
    });
  };

  // Load Mixcloud widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      setScriptLoaded(true);
      addLog("Mixcloud widget script loaded");
    });

    return () => {
      document.body.removeChild(script);
      // Cleanup any pending timeouts
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Initialize widget with first mix
  useEffect(() => {
    if (!scriptLoaded || !iframeRef.current || widget) return;

    addLog("Initializing widget with first mix...");
    const newWidget = (globalThis as any).Mixcloud.PlayerWidget(
      iframeRef.current,
    );

    newWidget.ready.then(() => {
      addLog("Initial widget ready - setting up event listeners");
      setWidget(newWidget);
      setCurrentMix(testMixes[0]);
      currentMixRef.current = testMixes[0]; // Initialize ref

      // Use helper function to set up all event listeners
      setupEventListeners(newWidget);

      // Get initial duration
      newWidget.getDuration().then((dur: number) => {
        addLog(`Initial duration: ${dur}s`);
        setDuration(dur);
      });
    });
  }, [scriptLoaded, widget]);

  const handlePlay = async () => {
    if (!widget) return;
    addLog("Calling widget.play()");
    try {
      await widget.play();
      addLog("widget.play() completed");
    } catch (error) {
      addLog(`widget.play() error: ${error}`);
    }
  };

  const handlePause = async () => {
    if (!widget) return;
    addLog("Calling widget.pause()");
    try {
      await widget.pause();
      addLog("widget.pause() completed");
    } catch (error) {
      addLog(`widget.pause() error: ${error}`);
    }
  };

  const handleLoadMix = async (mixKey: string) => {
    addLog("Inside handleLoadMix");
    if (!widget) {
      addLog("Widget not available in state - aborting");
      return;
    }
    addLog("Got past the gate");

    addLog(`Loading new mix: ${mixKey}`);
    setProgress(0);
    setProgressPercent(0);
    setDuration(0);

    try {
      const mixcloudUrl = `https://www.mixcloud.com${mixKey}`;
      await widget.load(mixcloudUrl, true); // true = autoplay
      addLog(`widget.load() completed for: ${mixKey}`);
      setCurrentMix(mixKey);

      // Get new duration
      setTimeout(async () => {
        try {
          const newDuration = await widget.getDuration();
          addLog(`New mix duration: ${newDuration}s`);
          setDuration(newDuration);
        } catch (error) {
          addLog(`getDuration() error: ${error}`);
        }
      }, 1000);
    } catch (error) {
      addLog(`widget.load() error: ${error}`);
    }
  };

  // Recreate widget completely with new mix - most reliable approach
  const recreateWidgetWithMix = (mixKey: string) => {
    if (!iframeRef.current) {
      addLog("No iframe reference - cannot recreate widget");
      return;
    }

    addLog("🔧 Recreating widget completely...");

    // Reset all state and update ref
    setProgress(0);
    setProgressPercent(0);
    setDuration(0);
    setPlaying(false);
    setCurrentMix(mixKey);
    currentMixRef.current = mixKey; // Update ref immediately

    // Create new iframe URL with the new mix
    const newWidgetUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&hide_tracklist=1&mini=1&autoplay=1&feed=${encodeURIComponent(`https://www.mixcloud.com${mixKey}`)}`;

    addLog(`🔧 Setting new iframe src: ${newWidgetUrl}`);

    // Update iframe source - this will recreate the widget
    iframeRef.current.src = newWidgetUrl;

    // Wait for new widget to initialize
    setTimeout(() => {
      addLog("🔧 Initializing new widget instance...");
      const freshWidget = (globalThis as any).Mixcloud.PlayerWidget(
        iframeRef.current,
      );

      freshWidget.ready.then(() => {
        addLog("✅ Fresh widget ready with new mix");
        setWidget(freshWidget);
        setPlaying(true); // Should be auto-playing due to autoplay=1 in URL

        // Set up event listeners on fresh widget
        setupEventListeners(freshWidget);

        // Get duration of new mix
        freshWidget.getDuration().then((dur: number) => {
          addLog(`📏 Fresh widget duration: ${dur}s`);
          setDuration(dur);
        });
      });
    }, 1000);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const widgetUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(`https://www.mixcloud.com${testMixes[0]}`)}`;

  return (
    <>
      <Head>
        <title>Mixcloud Widget Test</title>
      </Head>
      <div style={{ padding: "20px", fontFamily: "monospace" }}>
        <h1>Mixcloud Widget Progress Test</h1>

        <div style={{ marginBottom: "20px" }}>
          <iframe
            ref={iframeRef}
            src={widgetUrl}
            width="100%"
            height="60"
            frameBorder="0"
            allow="autoplay"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Current Status:</h3>
          <p>Current Mix: {currentMix}</p>
          <p>Playing: {playing ? "Yes" : "No"}</p>
          <p>
            Progress: {duration && progress.toFixed(1)}s / {duration.toFixed(1)}
            s ({progressPercent.toFixed(1)}%)
          </p>
          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#ddd",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "#4caf50",
                transition: "width 0.5s",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Controls:</h3>
          <button onClick={handlePlay} style={{ marginRight: "10px" }}>
            Play
          </button>
          <button onClick={handlePause} style={{ marginRight: "10px" }}>
            Pause
          </button>
          <button onClick={clearLogs}>Clear Logs</button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Test Mixes:</h3>
          {testMixes.map((mix, index) => (
            <button
              key={mix}
              onClick={() => handleLoadMix(mix)}
              style={{
                marginRight: "10px",
                marginBottom: "10px",
                backgroundColor: currentMix === mix ? "#4caf50" : "#f0f0f0",
              }}
            >
              Load Mix {index + 1}
            </button>
          ))}
        </div>

        <div>
          <h3>Event Logs:</h3>
          <div
            style={{
              height: "300px",
              overflow: "auto",
              border: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {logs.map((log, index) => (
              <div
                key={index}
                style={{ fontSize: "12px", marginBottom: "2px" }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetTest;
