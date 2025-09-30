/* eslint-disable unicorn/prefer-global-this */
import { usePorcupine } from "@picovoice/porcupine-react";
import { VoiceCommandMapping } from "components/Porcupine/types";
import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PICOVOICE_KEY } from "utils/constants";
import { DEBUG, essentialLogger, logger } from "utils/logger";

const porcupineModel = {
  publicPath: "voicemodels/porcupine_params.pv",
  customWritePath: "3.0.0_porcupine_params.pv",
};

const customKeyword = {
  publicPath: "/voicemodels/Hey-Steph_en_wasm_v3_0_0.ppn",
  label: "Hey Stef",
};

const commandTimeout = 5000;
const silenceTimeout = 1500;

// Levenshtein distance for fuzzy matching
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = Array.from({ length: str2.length + 1 }, () =>
    Array.from({ length: str1.length + 1 }, () => 0),
  );

  for (let i = 0; i <= str1.length; i += 1) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j += 1) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost,
      );
    }
  }

  return matrix[str2.length][str1.length];
};

type VoiceStatus =
  | "idle"
  | "wake-listening"
  | "command-listening"
  | "processing";

export const Porcupine: React.FC = () => {
  const {
    controls: {
      handleLoadLatest,
      handleLoadRandom,
      handleLoadRandomFavourite,
      handleNext,
      handlePause,
      handlePlay,
      handlePrevious,
    },
  } = useMixcloud();

  const [keywordDetections, setKeywordDetections] = useState<string[]>([]);
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [lastCommand, setLastCommand] = useState<string>("");
  const [isCommandListening, setIsCommandListening] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const commandTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionActiveRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);
  const isCommandListeningRef = useRef<boolean>(false); // Add ref for command listening state
  const transcriptRef = useRef<{ final: string; last: string }>({
    final: "",
    last: "",
  });

  const { keywordDetection, isLoaded, isListening, error, init, start, stop } =
    usePorcupine();

  // Helper function to add debug info
  const addDebugInfo = (info: string): void => {
    if (DEBUG) {
      setDebugInfo((prev) => [
        ...prev.slice(-9),
        `${new Date().toLocaleTimeString()}: ${info}`,
      ]);
    }
  };

  // Define command mappings with flexible keyword matching
  const voiceCommandMappings: VoiceCommandMapping[] = [
    {
      intent: "next",
      keywords: ["next", "forward", "skip"],
      synonyms: ["track", "song", "mix", "one", "tune", "piece"],
      handler: handleNext,
    },
    {
      intent: "previous",
      keywords: ["previous", "back", "last", "prev"],
      synonyms: ["track", "song", "mix", "one", "tune", "piece"],
      handler: handlePrevious,
    },
    {
      intent: "play",
      keywords: ["play", "resume", "start", "continue"],
      synonyms: ["music", "audio", "sound", "track"],
      handler: handlePlay,
    },
    {
      intent: "pause",
      keywords: ["pause", "stop", "halt", "freeze"],
      synonyms: ["music", "audio", "sound", "track"],
      handler: handlePause,
    },
    {
      intent: "load_latest",
      keywords: ["latest", "newest", "recent", "new"],
      synonyms: ["load", "play", "get", "fetch", "show"],
      handler: handleLoadLatest,
    },
    {
      intent: "load_random",
      keywords: ["random", "shuffle", "surprise"],
      synonyms: ["load", "play", "get", "pick", "choose"],
      handler: handleLoadRandom,
    },
    {
      intent: "load_random_favourite",
      keywords: ["favourite", "favorite", "liked", "loved"],
      synonyms: ["random", "shuffle", "load", "play", "get"],
      handler: handleLoadRandomFavourite,
    },
  ];

  // Simple string similarity for fuzzy matching
  const isStringSimilar = (
    str1: string,
    str2: string,
    threshold = 0.7,
  ): boolean => {
    if (str1 === str2) return true;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return true;

    const distance = levenshteinDistance(longer, shorter);
    const similarity = (longer.length - distance) / longer.length;

    if (DEBUG && similarity > 0.5) {
      logger.match(
        `Similarity between "${str1}" and "${str2}": ${(similarity * 100).toFixed(1)}%`,
      );
    }

    return similarity >= threshold;
  };

  // Define resetCommandListening first (before other functions that use it)
  const resetCommandListening = useCallback(() => {
    logger.command("🔄 Resetting command listening");
    setIsCommandListening(false);
    isCommandListeningRef.current = false; // Update ref
    isProcessingRef.current = false;
    recognitionActiveRef.current = false;
    setStatus(isListening ? "wake-listening" : "idle");
    addDebugInfo("Reset to wake listening");

    // Clear all timeouts
    if (commandTimeoutRef.current) {
      clearTimeout(commandTimeoutRef.current);
      commandTimeoutRef.current = null;
      logger.command("⏹️ Cleared command timeout");
    }

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
      logger.command("⏹️ Cleared silence timeout");
    }

    // Stop speech recognition more forcefully
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop(); // Use stop() instead of abort()
        logger.speech("🛑 Speech recognition stopped");
      } catch {
        try {
          speechRecognitionRef.current.abort();
          logger.speech("🛑 Speech recognition aborted (fallback)");
        } catch {
          logger.speech("⚠️ Error stopping speech recognition (ignored)");
        }
      }
    }
  }, [isListening]);

  // AI-powered command analysis function
  const analyzeCommand = useCallback(
    (transcript: string): (() => void) | null => {
      const cleanTranscript = transcript.toLowerCase().trim();
      const words = cleanTranscript.split(/\s+/);

      logger.command(`Analyzing transcript: "${transcript}"`);
      logger.command(`Cleaned: "${cleanTranscript}"`);
      logger.command(`Words: [${words.join(", ")}]`);
      addDebugInfo(`Analyzing: "${cleanTranscript}"`);

      let bestMatch: VoiceCommandMapping | null = null;
      let bestScore = 0;
      const scores: { intent: string; score: number; details: string }[] = [];

      voiceCommandMappings.forEach((mapping) => {
        let score = 0;
        const scoreDetails: string[] = [];

        // Check for primary keywords (higher weight)
        mapping.keywords.forEach((keyword) => {
          if (words.includes(keyword)) {
            score += 3;
            scoreDetails.push(`exact match: "${keyword}" (+3)`);
            logger.match(
              `✅ Exact keyword match: "${keyword}" in intent "${mapping.intent}"`,
            );
          } else if (cleanTranscript.includes(keyword)) {
            score += 3;
            scoreDetails.push(`contains: "${keyword}" (+3)`);
            logger.match(
              `✅ Contains keyword: "${keyword}" in intent "${mapping.intent}"`,
            );
          }

          // Fuzzy matching for slight variations
          words.forEach((word) => {
            if (word !== keyword && isStringSimilar(word, keyword)) {
              score += 2;
              scoreDetails.push(`fuzzy: "${word}"~"${keyword}" (+2)`);
              logger.match(
                `🔄 Fuzzy match: "${word}" ~ "${keyword}" in intent "${mapping.intent}"`,
              );
            }
          });
        });

        // Check for context synonyms (lower weight)
        mapping.synonyms.forEach((synonym) => {
          if (words.includes(synonym)) {
            score += 1;
            scoreDetails.push(`synonym: "${synonym}" (+1)`);
            logger.match(
              `📝 Synonym match: "${synonym}" in intent "${mapping.intent}"`,
            );
          } else if (cleanTranscript.includes(synonym)) {
            score += 1;
            scoreDetails.push(`contains synonym: "${synonym}" (+1)`);
            logger.match(
              `📝 Contains synonym: "${synonym}" in intent "${mapping.intent}"`,
            );
          }
        });

        // Bonus for intent-specific patterns
        if (
          mapping.intent === "next" &&
          /\b(play|go|move)\s+(next|forward)\b/.test(cleanTranscript)
        ) {
          score += 2;
          scoreDetails.push(`pattern: "play/go/move next/forward" (+2)`);
          logger.match(`🎯 Pattern match for "next" intent`);
        }

        if (
          mapping.intent === "previous" &&
          /\b(go|play|move)\s+(back|previous)\b/.test(cleanTranscript)
        ) {
          score += 2;
          scoreDetails.push(`pattern: "go/play/move back/previous" (+2)`);
          logger.match(`🎯 Pattern match for "previous" intent`);
        }

        if (
          mapping.intent.includes("load") &&
          /\b(load|play|get|show)\s+(me|some|a)\b/.test(cleanTranscript)
        ) {
          score += 1;
          scoreDetails.push(`pattern: "load/play/get/show me/some/a" (+1)`);
          logger.match(`🎯 Pattern match for "load" intent`);
        }

        scores.push({
          intent: mapping.intent,
          score,
          details: scoreDetails.join(", "),
        });

        if (score > bestScore) {
          bestScore = score;
          bestMatch = mapping;
        }
      });

      // Log all scores
      logger.command("Scoring results:");
      scores
        .sort((a, b) => b.score - a.score)
        .forEach((s) => {
          const prefix = s.score >= 2 ? "✅" : "❌";
          logger.command(
            `  ${prefix} ${s.intent}: ${s.score} ${s.details ? `(${s.details})` : ""}`,
          );
        });

      // Require minimum confidence threshold
      if (bestScore >= 2 && bestMatch !== null) {
        const match = bestMatch as VoiceCommandMapping;
        logger.success(
          `🎉 Best match: "${match.intent}" with score ${bestScore}`,
        );
        addDebugInfo(`Match: ${match.intent} (score: ${bestScore})`);
        return match.handler || null;
      }

      logger.warning(
        `⚠️ No match found (best score: ${bestScore}, threshold: 2)`,
      );
      addDebugInfo(`No match (best score: ${bestScore})`);
      return null;
    },
    [
      handleNext,
      handlePrevious,
      handlePlay,
      handlePause,
      handleLoadLatest,
      handleLoadRandom,
      handleLoadRandomFavourite,
    ],
  );

  const processVoiceCommand = useCallback(
    (transcript: string) => {
      // Prevent double processing
      if (isProcessingRef.current) {
        logger.warning("⚠️ Already processing a command, ignoring");
        return;
      }

      isProcessingRef.current = true;
      logger.command(`🎯 Processing command: "${transcript}"`);
      setStatus("processing");
      addDebugInfo(`Processing: "${transcript}"`);

      // Stop recognition immediately to prevent further input
      if (speechRecognitionRef.current && recognitionActiveRef.current) {
        try {
          speechRecognitionRef.current.stop();
          logger.speech("🛑 Stopped recognition before executing command");
        } catch {
          logger.speech("⚠️ Error stopping recognition (ignored)");
        }
      }

      const handler = analyzeCommand(transcript);

      if (handler) {
        logger.success(`✅ Executing command for: "${transcript}"`);
        addDebugInfo(`Executing command`);
        essentialLogger.widgetReady(`Voice command executed: "${transcript}"`);
        handler();
      } else {
        logger.warning(`❌ No matching command found for: "${transcript}"`);
        addDebugInfo(`No match found`);
      }

      // Clear transcripts after processing
      transcriptRef.current = { final: "", last: "" };

      // Reset immediately after processing
      logger.command("🔄 Command processed, resetting immediately");
      resetCommandListening();
    },
    [analyzeCommand, resetCommandListening],
  );

  const startCommandListening = useCallback(() => {
    if (!speechRecognitionRef.current) {
      essentialLogger.error("Speech recognition not initialized");
      return;
    }

    if (isCommandListening) {
      logger.warning("⚠️ Already listening for commands");
      return;
    }

    logger.command("🎤 Starting command listening");
    logger.command(
      `📊 Setting refs - before: listening=${isCommandListeningRef.current}, processing=${isProcessingRef.current}`,
    );

    setIsCommandListening(true);
    isCommandListeningRef.current = true; // Update ref
    isProcessingRef.current = false; // Reset processing flag

    // Clear transcripts when starting new session
    logger.command(
      `🧹 Clearing transcripts - was: "${transcriptRef.current.final}"`,
    );
    transcriptRef.current = { final: "", last: "" };

    logger.command(
      `📊 Setting refs - after: listening=${isCommandListeningRef.current}, processing=${isProcessingRef.current}`,
    );

    setStatus("command-listening");
    setLastCommand("");
    addDebugInfo("Starting command listening");

    // Set 5-second overall timeout first
    logger.command(
      `⏱️ Setting ${commandTimeout / 1000}-second command timeout`,
    );
    commandTimeoutRef.current = setTimeout(() => {
      if (!isProcessingRef.current) {
        logger.command(
          `⏰ ${commandTimeout / 1000}-second command timeout reached`,
        );
        addDebugInfo("Command timeout reached");
        resetCommandListening();
      }
    }, commandTimeout);

    // Add a small delay to ensure microphone is ready
    setTimeout(() => {
      try {
        if (speechRecognitionRef.current && !recognitionActiveRef.current) {
          speechRecognitionRef.current.start();
          logger.speech("✅ Speech recognition start() called");
        } else if (recognitionActiveRef.current) {
          logger.speech("⚠️ Recognition already active, skipping start()");
        }
      } catch (error_: any) {
        if (error_.message && error_.message.includes("already started")) {
          logger.speech("⚠️ Speech recognition already running");
        } else {
          essentialLogger.error(
            `Failed to start speech recognition: ${error_}`,
          );
          addDebugInfo(`Start error: ${error_}`);
          resetCommandListening();
        }
      }
    }, 100); // 100ms delay
  }, [isCommandListening, resetCommandListening]);

  // Initialize Porcupine
  useEffect(() => {
    logger.voice("🔧 Initializing Porcupine with wake word");
    init(PICOVOICE_KEY, [customKeyword], porcupineModel);
  }, []);

  // Update status when Porcupine state changes
  useEffect(() => {
    if (isListening && !isCommandListening) {
      setStatus("wake-listening");
      logger.wake("👂 Wake word listening active");
    } else if (!isListening && !isCommandListening) {
      setStatus("idle");
      logger.wake("💤 Wake word listening inactive");
    }
  }, [isListening, isCommandListening]);

  // Handle wake word detection
  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
      logger.wake(`🎉 Wake word detected: "${keywordDetection.label}"`);
      addDebugInfo(`Wake word detected: "${keywordDetection.label}"`);
      essentialLogger.widgetReady(
        `Wake word "${keywordDetection.label}" detected!`,
      );

      // Reset transcripts before starting new command listening
      transcriptRef.current = { final: "", last: "" };

      startCommandListening();
    }
  }, [keywordDetection, startCommandListening]);

  // Initialize Speech Recognition (only once on mount)
  useEffect(() => {
    let recognition: any = null;

    if (
      window === undefined ||
      (!("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window))
    ) {
      if (window !== undefined) {
        essentialLogger.error(
          "Speech recognition not supported in this browser",
        );
      }
    } else {
      logger.speech("🔧 Initializing Web Speech API");

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();

      recognition.continuous = true; // Keep listening until we stop it
      recognition.interimResults = true; // Get interim results to detect pauses
      recognition.lang = "en-GB"; // British English
      recognition.maxAlternatives = 3; // Get multiple alternatives for better debugging

      recognition.onstart = () => {
        recognitionActiveRef.current = true;
        logger.speech("🟢 Speech recognition started");
        addDebugInfo("Speech recognition started");
      };

      recognition.onspeechstart = () => {
        logger.speech("🗣️ Speech detected");
        addDebugInfo("Speech detected");
      };

      recognition.onspeechend = () => {
        logger.speech("🔇 Speech ended");
        addDebugInfo("Speech ended");
      };

      recognition.onnomatch = () => {
        logger.speech("❓ No speech match");
        addDebugInfo("No speech match");
      };

      recognition.onresult = (event: any) => {
        // Check refs directly each time the handler is called
        const currentlyListening = isCommandListeningRef.current;
        const currentlyProcessing = isProcessingRef.current;

        logger.speech(
          `📊 State check - processing: ${currentlyProcessing}, listening: ${currentlyListening}`,
        );

        // Don't process results if we're already processing or not listening
        if (currentlyProcessing || !currentlyListening) {
          logger.speech(
            `⏭️ Ignoring result - processing: ${currentlyProcessing}, listening: ${currentlyListening}`,
          );
          // Log what we're ignoring for debugging
          if (event.results.length > 0 && event.results[event.resultIndex]) {
            const ignoredText = event.results[event.resultIndex][0].transcript;
            logger.speech(`   Ignored text: "${ignoredText}"`);
          }
          return;
        }

        logger.speech(
          `📝 Got result event. Results length: ${event.results.length}`,
        );

        // Clear any existing silence timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
          logger.speech("⏱️ Cleared silence timeout");
        }

        // Process results
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const result = event.results[i];
          const { transcript } = result[0];
          const { confidence } = result[0];

          if (result.isFinal) {
            transcriptRef.current.final += `${transcript} `;
            transcriptRef.current.last = transcriptRef.current.final.trim();

            logger.speech(
              `✅ Final result: "${transcript}" (confidence: ${confidence?.toFixed(2) || "N/A"})`,
            );
            addDebugInfo(`Final: "${transcript}"`);

            // Log alternatives if in debug mode
            if (DEBUG && result.length > 1) {
              for (let j = 1; j < Math.min(result.length, 3); j += 1) {
                logger.speech(
                  `  Alternative ${j}: "${result[j].transcript}" (${result[j].confidence?.toFixed(2) || "N/A"})`,
                );
              }
            }

            setLastCommand(transcriptRef.current.last);

            // Start 3-second silence timer after final result
            logger.speech(
              `⏱️ Starting ${silenceTimeout / 1000}-second silence timer`,
            );
            silenceTimeoutRef.current = setTimeout(() => {
              // Check refs again inside the timeout
              if (!isProcessingRef.current && isCommandListeningRef.current) {
                logger.speech("⏰ Silence timeout reached");
                if (transcriptRef.current.last) {
                  logger.command(
                    `🎯 Processing final command: "${transcriptRef.current.last}"`,
                  );
                  processVoiceCommand(transcriptRef.current.last);
                } else {
                  logger.warning("⚠️ No transcript to process");
                  resetCommandListening();
                }
              } else {
                logger.speech(
                  `⏰ Silence timeout reached but skipping - processing: ${isProcessingRef.current}, listening: ${isCommandListeningRef.current}`,
                );
              }
            }, silenceTimeout);
          } else {
            logger.speech(`💭 Interim result: "${transcript}"`);
            addDebugInfo(`Interim: "${transcript}"`);
          }
        }
      };

      recognition.addEventListener("error", (event: any) => {
        switch (event.error) {
          case "no-speech":
            logger.speech("🔇 No speech detected");
            addDebugInfo("No speech detected");
            // Don't reset on no-speech, let it keep trying
            break;
          case "audio-capture":
            essentialLogger.error("🎙️ Microphone error: Cannot capture audio");
            addDebugInfo("Microphone error");
            resetCommandListening();
            break;
          case "not-allowed":
            essentialLogger.error("🚫 Microphone permission denied");
            addDebugInfo("Mic permission denied");
            resetCommandListening();
            break;
          case "aborted":
            logger.speech("🛑 Recognition aborted");
            addDebugInfo("Recognition aborted");
            break;
          default:
            essentialLogger.error(`Speech recognition error: ${event.error}`);
            addDebugInfo(`Error: ${event.error}`);
            if (event.error !== "aborted") {
              resetCommandListening();
            }
            break;
        }
      });

      let restartAttempts = 0;
      const maxRestartAttempts = 3;

      recognition.onend = () => {
        recognitionActiveRef.current = false;
        logger.speech("🔴 Speech recognition ended");
        addDebugInfo("Speech recognition ended");

        if (isCommandListeningRef.current) {
          // Recognition stopped unexpectedly, restart if still within timeout
          if (
            commandTimeoutRef.current &&
            restartAttempts < maxRestartAttempts
          ) {
            restartAttempts += 1;
            logger.speech(
              `🔄 Restarting speech recognition (attempt ${restartAttempts}/${maxRestartAttempts})`,
            );
            addDebugInfo(`Restarting (attempt ${restartAttempts})`);

            // Add a small delay before restarting
            setTimeout(() => {
              try {
                if (
                  speechRecognitionRef.current &&
                  isCommandListeningRef.current &&
                  !recognitionActiveRef.current
                ) {
                  speechRecognitionRef.current.start();
                  logger.speech("✅ Restart successful");
                }
              } catch (error_: any) {
                if (
                  error_.message &&
                  error_.message.includes("already started")
                ) {
                  logger.speech("⚠️ Recognition already running");
                } else {
                  logger.warning(
                    `⚠️ Failed to restart: ${error_.message || error_}`,
                  );
                  if (restartAttempts >= maxRestartAttempts) {
                    resetCommandListening();
                  }
                }
              }
            }, 200); // 200ms delay before restart
          } else {
            if (restartAttempts >= maxRestartAttempts) {
              logger.warning(
                `⚠️ Max restart attempts (${maxRestartAttempts}) reached`,
              );
              addDebugInfo("Max restarts reached");
            } else {
              logger.speech("⏰ Command timeout expired, not restarting");
            }
            resetCommandListening();
          }
        } else {
          // Reset restart counter when not listening
          restartAttempts = 0;
        }
      };

      speechRecognitionRef.current = recognition;
      logger.speech("✅ Speech recognition initialized");
    }

    return () => {
      if (speechRecognitionRef.current && recognitionActiveRef.current) {
        speechRecognitionRef.current.abort();
        logger.speech("🛑 Speech recognition aborted (cleanup)");
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Test function to manually trigger command listening
  const testCommandListening = async (): Promise<void> => {
    logger.voice("🧪 TEST: Manually triggering command listening");

    // Reset transcripts before starting
    transcriptRef.current = { final: "", last: "" };

    // Check microphone permission first
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        logger.voice("🎙️ Microphone permission granted");
        addDebugInfo("Mic permission OK");
        // Stop the stream immediately after checking
        stream.getTracks().forEach((track) => track.stop());
        startCommandListening();
      } catch (error_) {
        essentialLogger.error(
          "🚫 Microphone permission denied or error:",
          error_,
        );
        addDebugInfo("Mic permission failed");
      }
    } else {
      startCommandListening();
    }
  };

  const getStatusMessage = (): string => {
    switch (status) {
      case "idle":
        return "Voice control inactive";
      case "wake-listening":
        return 'Listening for "Hey Stef"...';
      case "command-listening":
        return "Say your command...";
      case "processing":
        return "Processing command...";
      default:
        return "Voice control inactive";
    }
  };

  const getStatusColour = (): string => {
    switch (status) {
      case "wake-listening":
        return "#4ade80"; // green
      case "command-listening":
        return "#f59e0b"; // amber
      case "processing":
        return "#3b82f6"; // blue
      default:
        return "#6b7280"; // grey
    }
  };

  return (
    <div className="voice-widget">
      <div
        className="status-indicator"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.1)",
          border: `2px solid ${getStatusColour()}`,
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: getStatusColour(),
            animation: status === "idle" ? "none" : "pulse 1.5s infinite",
          }}
        />
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          {getStatusMessage()}
        </span>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <strong>Loaded:</strong> {JSON.stringify(isLoaded)}
        {" | "}
        <strong>Wake Listening:</strong> {JSON.stringify(isListening)}
        {" | "}
        <strong>Command Listening:</strong> {JSON.stringify(isCommandListening)}
      </div>

      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error.toString()}
        </p>
      )}

      <div style={{ marginBottom: "12px" }}>
        <button
          onClick={() => start()}
          disabled={error !== null || !isLoaded || isListening}
          type="button"
          style={{ marginRight: "8px" }}
        >
          Start Wake Word Detection
        </button>
        <button
          onClick={() => stop()}
          disabled={error !== null || !isLoaded || !isListening}
          type="button"
          style={{ marginRight: "8px" }}
        >
          Stop Wake Word Detection
        </button>
        {DEBUG && (
          <button
            onClick={testCommandListening}
            type="button"
            style={{ backgroundColor: "#fbbf24", padding: "4px 8px" }}
          >
            🧪 Test Command Listen
          </button>
        )}
      </div>

      {lastCommand && (
        <div
          style={{
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
          }}
        >
          <strong>Last command:</strong> &quot;{lastCommand}&quot;
        </div>
      )}

      {DEBUG && debugInfo.length > 0 && (
        <div
          style={{
            marginTop: "12px",
            padding: "8px",
            backgroundColor: "#fef3c7",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          <strong>Debug Log:</strong>
          {debugInfo.map((info) => (
            <div
              key={info}
              style={{ fontFamily: "monospace", marginTop: "2px" }}
            >
              {info}
            </div>
          ))}
        </div>
      )}

      {keywordDetections.length > 0 && (
        <>
          <h3>Wake Word Detections:</h3>
          <ul>
            {keywordDetections.map((label: string) => (
              <li key={`${label}-${Math.random()}`}>{label}</li>
            ))}
          </ul>
        </>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Porcupine;
