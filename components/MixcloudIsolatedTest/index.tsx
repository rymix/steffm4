import { useMixcloud } from "contexts/mixcloud";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

export const MixcloudIsolatedTest: React.FC = () => {
  const {
    mcKey,
    controls: {
      handleNext,
      handlePause,
      handlePlay,
      handlePrevious,
      handleRandom,
    },
    mix: {
      duration,
      progress: mixProgress,
      progressPercent: mixProgressPercent,
    },
    widget: {
      changeMix,
      iframeRef,
      pauseTimeoutRef,
      playing,
      player,
      scriptLoaded,
      setScriptLoaded,
    },
  } = useMixcloud();

  const [currentMix, setCurrentMix] = useState("");
  const [logs, setLogs] = useState<string[]>([]);

  // Test mixes - these are known working Mixcloud URLs
  const testMixes = [
    "/rymixxx/adventures-in-decent-music-volume-1/",
    "/rymixxx/adventures-in-decent-music-volume-2/",
    "/rymixxx/adventures-in-decent-music-volume-3/",
    "/rymixxx/my-pair-of-shoes-volume-18/",
    "/rymixxx/adventures-in-decent-music-volume-5/",
    "/rymixxx/my-pair-of-shoes-volume-19/",
    "/rymixxx/adventures-in-decent-music-volume-7-rod-temperton-special/",
    "/rymixxx/adventures-in-decent-music-volume-8/",
    "/rymixxx/adventures-in-decent-music-volume-9/",
    "/rymixxx/adventures-in-decent-music-volume-10/",
  ];

  // Fix hydration mismatch - use static initial mix, randomize in useEffect
  const staticInitialMix = testMixes[0];
  const [initialMix, setInitialMix] = useState<string>(staticInitialMix);
  const currentMixRef = useRef<string>(staticInitialMix);

  // Get random initial mix
  const getRandomMix = (excludeMix?: string): string => {
    const availableMixes = excludeMix
      ? testMixes.filter((mix) => mix !== excludeMix)
      : testMixes;
    return availableMixes[Math.floor(Math.random() * availableMixes.length)];
  };

  // =============================================================================
  // INITIALIZATION
  // =============================================================================

  // Load Mixcloud widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      setScriptLoaded(true);
      console.log("📜 Mixcloud widget script loaded");
    });

    return () => {
      script.remove();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Set random initial mix after hydration
  useEffect(() => {
    const randomMix = getRandomMix();
    setInitialMix(randomMix);
    currentMixRef.current = randomMix;
    console.log(`🎲 Selected random initial mix: ${randomMix}`);
  }, []);

  // Initialize widget with initial mix
  useEffect(() => {
    if (!scriptLoaded || !iframeRef.current || player) return;

    console.log(`🚀 Initializing widget with mix: ${initialMix}`);
    changeMix(initialMix, false); // Don't autoplay on initial load
  }, [scriptLoaded, player, initialMix]);

  const clearLogs = (): void => {
    setLogs([]);
  };

  const widgetUrl = `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=${encodeURIComponent(`https://www.mixcloud.com${initialMix}`)}`;

  return (
    <>
      <Head>
        <title>Mixcloud Widget Test</title>
      </Head>
      <div style={{ padding: "20px", fontFamily: "monospace" }}>
        <h1>Mixcloud Widget Test - Unified Iframe Recreation</h1>

        <div style={{ marginBottom: "20px" }}>
          <iframe
            ref={iframeRef}
            src={widgetUrl}
            width="100%"
            height="60"
            frameBorder="0"
            allow="autoplay"
            title="Mixcloud Widget Player"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Current Status:</h3>
          <p>
            <strong>Current Mix:</strong> {currentMix || initialMix}
          </p>
          <p>
            <strong>mcKey:</strong> {mcKey}
          </p>
          <p>
            <strong>Playing:</strong> {playing ? "Yes" : "No"}
          </p>
          <p>
            <strong>Progress:</strong> {mixProgress?.toFixed(1) || "0.0"}s /{" "}
            {duration?.toFixed(1) || "0.0"}s (
            {mixProgressPercent?.toFixed(1) || "0.0"}%)
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
                width: `${Math.max(0, mixProgressPercent || 0)}%`,
                height: "100%",
                backgroundColor: "#4caf50",
                transition: "width 0.5s",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Playback Controls:</h3>
          <button
            type="button"
            onClick={handlePlay}
            style={{ marginRight: "10px" }}
          >
            ▶️ Play
          </button>
          <button
            type="button"
            onClick={handlePause}
            style={{ marginRight: "10px" }}
          >
            ⏸️ Pause
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Navigation Controls:</h3>
          <button
            type="button"
            onClick={handlePrevious}
            style={{ marginRight: "10px" }}
          >
            ⏮️ Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            style={{ marginRight: "10px" }}
          >
            ⏭️ Next
          </button>
          <button
            type="button"
            onClick={handleRandom}
            style={{ marginRight: "10px" }}
          >
            🎲 Random
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Direct Mix Loading:</h3>
          {testMixes.map((mix) => {
            const mixNumber = testMixes.indexOf(mix) + 1;
            return (
              <button
                key={mix}
                type="button"
                onClick={() => changeMix(mix, true)}
                style={{
                  marginRight: "10px",
                  marginBottom: "10px",
                  backgroundColor:
                    (currentMix || initialMix) === mix ? "#4caf50" : "#f0f0f0",
                  padding: "5px 10px",
                }}
              >
                Mix {mixNumber}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <button type="button" onClick={clearLogs}>
            🗑️ Clear Logs
          </button>
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
            {logs.map((log) => {
              const logId = `${log}-${Math.random()}`;
              return (
                <div
                  key={logId}
                  style={{ fontSize: "12px", marginBottom: "2px" }}
                >
                  {log}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MixcloudIsolatedTest;
