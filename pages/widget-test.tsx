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

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-20), `${timestamp}: ${message}`]); // Keep last 20 logs
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
      addLog("Widget ready - setting up event listeners");
      setWidget(newWidget);
      setCurrentMix(testMixes[0]);

      // Set up event listeners
      newWidget.events.play.on(() => {
        addLog("PLAY event fired");
        setPlaying(true);
      });

      newWidget.events.pause.on(() => {
        addLog("PAUSE event fired");
        setPlaying(false);
      });

      newWidget.events.progress.on((position: number, dur?: number) => {
        addLog(`PROGRESS event: position=${position}s, duration=${dur}s`);
        setProgress(position);

        if (dur && dur > 0) {
          setDuration(dur);
          setProgressPercent((position / dur) * 100);
        }
      });

      newWidget.events.ended.on(() => {
        addLog("ENDED event fired");
        setPlaying(false);
      });

      newWidget.events.error.on((error: any) => {
        addLog(`ERROR event: ${JSON.stringify(error)}`);
      });

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
    if (!widget) return;

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
            Progress: {progress.toFixed(1)}s / {duration.toFixed(1)}s (
            {progressPercent.toFixed(1)}%)
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
