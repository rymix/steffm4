/* eslint-disable unicorn/prefer-global-this */
import { usePorcupine } from "@picovoice/porcupine-react";
import { levenshteinDistance } from "components/VoiceControl/lib/levenshteinDistance";
import {
  StyledVoiceControlControls,
  StyledVoiceControlErrorMessage,
  StyledVoiceControlModeIndicator,
  StyledVoiceControlStatus,
  StyledVoiceControlStatusIcon,
  StyledVoiceControlStatusMessage,
} from "components/VoiceControl/StyledVoiceControl";
import {
  VoiceCommandMapping,
  VoiceStatus,
} from "components/VoiceControl/types";
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

const HIDEME = true;

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
    filters: { setSelectedCategory },
  } = useMixcloud();

  const [keywordDetections, setKeywordDetections] = useState<string[]>([]);
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [lastCommand, setLastCommand] = useState<string>("");
  const [isCommandListening, setIsCommandListening] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const lastWakeWordTimeRef = useRef<number>(0);
  const wakeWordCooldownRef = useRef<NodeJS.Timeout | null>(null);
  const justRestartedRef = useRef<boolean>(false);
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
        ...prev.slice(-100),
        `${new Date().toLocaleTimeString()}: ${info}`,
      ]);
    }
  };

  const handleFilterSelectChange = (newFilter: string): void => {
    if (newFilter === "fav") {
      handleLoadRandomFavourite();
    } else {
      handleLoadRandom(newFilter);
    }

    setSelectedCategory(newFilter);
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
    {
      intent: "filter_select_aidm",
      keywords: [
        "adventure",
        "adventures",
        "aidm",
        "adventures in decent music",
      ],
      synonyms: [
        "select",
        "switch to",
        "select category",
        "switch category to",
      ],
      handler: () => handleFilterSelectChange("aidm"),
    },
    {
      intent: "filter_select_mpos",
      keywords: ["shoes", "mpos", "my pair of shoes"],
      synonyms: [
        "select",
        "switch to",
        "select category",
        "switch category to",
      ],
      handler: () => handleFilterSelectChange("shoes"),
    },
    {
      intent: "filter_select_special",
      keywords: ["special", "specials"],
      synonyms: [
        "select",
        "switch to",
        "select category",
        "switch category to",
      ],
      handler: () => handleFilterSelectChange("special"),
    },
    {
      intent: "filter_select_cocksoup",
      keywords: ["cock", "cocksoup", "cock soup"],
      synonyms: [
        "select",
        "switch to",
        "select category",
        "switch category to",
      ],
      handler: () => handleFilterSelectChange("cocksoup"),
    },
    {
      intent: "filter_select_fav",
      keywords: ["fav", "favorite", "favorites"],
      synonyms: [
        "select",
        "switch to",
        "select category",
        "switch category to",
      ],
      handler: () => handleFilterSelectChange("fav"),
    },
    {
      intent: "filter_select_all",
      keywords: ["all", "all mixes"],
      synonyms: [
        "select",
        "switch to",
        "select category",
        "switch category to",
      ],
      handler: () => handleFilterSelectChange("all"),
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

    // Set a 3-second cooldown period before allowing wake word detection
    logger.wake("⏳ Starting 3-second wake word cooldown");
    addDebugInfo("Wake word cooldown started");

    wakeWordCooldownRef.current = setTimeout(() => {
      try {
        logger.wake("✅ Wake word cooldown complete, restarting detection");
        logger.wake(
          `🔍 Restart conditions - isLoaded: ${isLoaded}, error: ${error}`,
        );
        addDebugInfo("Wake word cooldown complete");

        // If Porcupine is still loaded, just set up for next wake word detection
        if (isLoaded && !error) {
          logger.wake(
            "✅ Porcupine still loaded, preparing for next wake word",
          );
          justRestartedRef.current = true; // Flag to ignore immediate detections
          setStatus("wake-listening");
          addDebugInfo("Back to wake listening");

          // Clear the restart flag after a delay to ignore immediate detections
          setTimeout(() => {
            justRestartedRef.current = false;
            logger.wake("🔓 Ready for new wake word detections");
          }, 1000); // 1 second grace period
        } else {
          logger.wake(
            `⚠️ Cannot restart - isLoaded: ${isLoaded}, error: ${error}`,
          );
          addDebugInfo(`Cannot restart - loaded: ${isLoaded}, error: ${error}`);

          // If Porcupine became unloaded, re-initialize it
          if (!isLoaded && !error) {
            logger.wake("🔄 Re-initializing Porcupine (was unloaded)");
            addDebugInfo("Re-initializing Porcupine");

            try {
              init(PICOVOICE_KEY, [customKeyword], porcupineModel);
              logger.wake("📞 init() called successfully");
            } catch (initError) {
              logger.wake(`❌ Error calling init(): ${initError}`);
              setStatus("idle");
              return;
            }

            // Wait longer for initialization then start, with multiple checks
            const checkInitialization = (attempts = 0): void => {
              setTimeout(() => {
                logger.wake(
                  `🔍 Re-init check ${attempts + 1}: isLoaded=${isLoaded}, error=${error}`,
                );

                if (isLoaded) {
                  logger.wake(
                    "✅ Porcupine re-initialized, starting detection",
                  );
                  try {
                    start();
                    setStatus("wake-listening");
                    addDebugInfo("Porcupine restarted after re-init");
                    logger.wake("🎉 Re-initialization complete and listening");
                  } catch (startError) {
                    logger.wake(
                      `❌ Error starting after re-init: ${startError}`,
                    );
                    setStatus("idle");
                  }
                } else if (attempts < 4) {
                  // Retry up to 5 times (5 seconds total)
                  logger.wake(
                    `⏳ Still initializing, will retry (attempt ${attempts + 1}/5)`,
                  );
                  checkInitialization(attempts + 1);
                } else {
                  logger.wake("❌ Re-initialization failed after 5 attempts");
                  addDebugInfo("Re-init failed after retries");
                  setStatus("idle");
                }
              }, 1000); // Check every second
            };

            checkInitialization();
          } else {
            // Fallback: set status to idle if we can't restart
            setStatus("idle");
          }
        }

        wakeWordCooldownRef.current = null;
      } catch (cooldownError) {
        logger.wake(`❌ Error in cooldown completion: ${cooldownError}`);
        addDebugInfo(`Cooldown error: ${cooldownError}`);
        wakeWordCooldownRef.current = null;
      }
    }, 3000); // 3 second cooldown

    setStatus("idle"); // Set to idle during cooldown
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

    // Don't clear wake word cooldown - let it complete naturally

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
  }, [isListening, isLoaded, start]);

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

      // IMMEDIATELY stop command listening to prevent restart
      setIsCommandListening(false);
      isCommandListeningRef.current = false;
      logger.command("🚫 Command listening disabled immediately");

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
        logger.command(
          `🔍 Before handler: isLoaded=${isLoaded}, isListening=${isListening}`,
        );
        addDebugInfo(`Executing command`);
        essentialLogger.widgetReady(`Voice command executed: "${transcript}"`);

        handler();

        // Check Porcupine state immediately after handler execution
        setTimeout(() => {
          logger.command(
            `🔍 After handler: isLoaded=${isLoaded}, isListening=${isListening}`,
          );
          if (!isLoaded) {
            logger.command(
              `❌ CRITICAL: Handler execution caused Porcupine to unload!`,
            );
          }
        }, 10);
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

    // Don't stop Porcupine - just rely on state-based blocking
    logger.wake(
      "⏸️ Keeping Porcupine running, using state-based wake word blocking",
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
    // Don't update status during cooldown period
    if (wakeWordCooldownRef.current !== null) {
      logger.wake("⏸️ Skipping status update during cooldown");
      return;
    }

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
      const now = Date.now();
      const timeSinceLastWakeWord = now - lastWakeWordTimeRef.current;

      // FIRST: Block ALL wake word detections during cooldown period
      if (wakeWordCooldownRef.current !== null) {
        logger.wake(
          `🚫 Ignoring wake word during cooldown: "${keywordDetection.label}"`,
        );
        addDebugInfo(
          `Wake word ignored (cooldown): "${keywordDetection.label}"`,
        );
        return;
      }

      // SECOND: Block wake word detections immediately after restart
      if (justRestartedRef.current) {
        logger.wake(
          `🚫 Ignoring wake word after restart: "${keywordDetection.label}"`,
        );
        addDebugInfo(
          `Wake word ignored (just restarted): "${keywordDetection.label}"`,
        );
        return;
      }

      // Prevent wake word detection during command listening or processing
      if (isCommandListening || isProcessingRef.current) {
        logger.wake(
          `🚫 Ignoring wake word during command session: "${keywordDetection.label}"`,
        );
        addDebugInfo(`Wake word ignored (busy): "${keywordDetection.label}"`);
        return;
      }

      // Debounce rapid wake word detections (ignore if less than 2 seconds since last)
      if (timeSinceLastWakeWord < 2000) {
        logger.wake(
          `🚫 Ignoring rapid wake word detection: "${keywordDetection.label}" (${timeSinceLastWakeWord}ms ago)`,
        );
        addDebugInfo(
          `Wake word debounced: "${keywordDetection.label}" (${timeSinceLastWakeWord}ms)`,
        );
        return;
      }

      lastWakeWordTimeRef.current = now;
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
  }, [keywordDetection, startCommandListening, isCommandListening]);

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
                  logger.command(
                    `🔍 SILENCE: Before processVoiceCommand: isLoaded=${isLoaded}, isListening=${isListening}`,
                  );
                  processVoiceCommand(transcriptRef.current.last);

                  // Check Porcupine state after command processing
                  setTimeout(() => {
                    logger.command(
                      `🔍 SILENCE: After processVoiceCommand: isLoaded=${isLoaded}, isListening=${isListening}`,
                    );
                    if (!isLoaded) {
                      logger.command(
                        `❌ CRITICAL: processVoiceCommand caused Porcupine to unload!`,
                      );
                    }
                  }, 50);
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

        // Check if we should restart (only if actively listening and not processing)
        if (isCommandListeningRef.current && !isProcessingRef.current) {
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
                  !isProcessingRef.current &&
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
          // Reset restart counter when not listening or when processing
          restartAttempts = 0;
          if (isProcessingRef.current) {
            logger.speech("🚫 Not restarting - command is being processed");
            addDebugInfo("Recognition ended during processing");
          }
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

  return (
    <div className="voice-widget">
      <StyledVoiceControlStatus $status={status}>
        <StyledVoiceControlStatusIcon $status={status} />
        <StyledVoiceControlStatusMessage>
          {getStatusMessage()}
        </StyledVoiceControlStatusMessage>
      </StyledVoiceControlStatus>

      <StyledVoiceControlModeIndicator>
        <strong>Loaded:</strong> {JSON.stringify(isLoaded)}
        {" | "}
        <strong>Wake Listening:</strong> {JSON.stringify(isListening)}
        {" | "}
        <strong>Command Listening:</strong> {JSON.stringify(isCommandListening)}
      </StyledVoiceControlModeIndicator>

      {error && (
        <StyledVoiceControlErrorMessage>
          {error.toString()}
        </StyledVoiceControlErrorMessage>
      )}

      <StyledVoiceControlControls style={{ marginBottom: "12px" }}>
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
      </StyledVoiceControlControls>

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

      {!HIDEME && DEBUG && debugInfo.length > 0 && (
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
          {debugInfo.map((info, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`debug-${index}-${info.slice(0, 10)}`}
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
    </div>
  );
};

export default Porcupine;
