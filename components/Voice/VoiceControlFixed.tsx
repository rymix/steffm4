import { PorcupineWorker, BuiltInKeyword } from "@picovoice/porcupine-web";
import { WebVoiceProcessor } from "@picovoice/web-voice-processor";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface VoiceControlProps {
  handleLoadLatest: () => void;
  handleLoadRandom: () => void;
  handleLoadRandomFavourite: () => void;
  handleNext: () => void;
  handlePause: () => void;
  handlePlay: () => void;
  handlePrevious: () => void;
  porcupineAccessKey: string;
  wakeWordModelPath: string;
}

interface CommandMapping {
  intent: string;
  keywords: string[];
  synonyms: string[];
  handler: () => void;
}

// Helper function for string similarity calculation
const calculateLevenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = Array.from({ length: str2.length + 1 })
    .fill(0)
    .map(() => Array.from({ length: str1.length + 1 }).fill(0)) as number[][];

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

// Helper function for fuzzy string matching
const isStringSimilar = (
  str1: string,
  str2: string,
  threshold = 0.7,
): boolean => {
  if (str1 === str2) return true;

  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return true;

  const distance = calculateLevenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length >= threshold;
};

const VoiceControl: React.FC<VoiceControlProps> = ({
  handleLoadLatest,
  handleLoadRandom,
  handleLoadRandomFavourite,
  handleNext,
  handlePause,
  handlePlay,
  handlePrevious,
  porcupineAccessKey,
  wakeWordModelPath,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [_isWakeWordActive, setIsWakeWordActive] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "wake-listening" | "command-listening" | "processing"
  >("idle");

  const porcupineWorkerRef = useRef<PorcupineWorker | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const commandTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define command mappings with flexible keyword matching
  const commandMappings: CommandMapping[] = [
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

  // Function to reset command listening state
  const resetCommandListening = useCallback((): void => {
    setIsListening(false);
    setIsWakeWordActive(false);
    setStatus("wake-listening");

    if (commandTimeoutRef.current) {
      clearTimeout(commandTimeoutRef.current);
      commandTimeoutRef.current = null;
    }

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.abort();
      } catch {
        // Ignore errors when aborting
      }
    }
  }, []);

  // Function to start command listening
  const startCommandListening = useCallback((): void => {
    if (!speechRecognitionRef.current) return;

    setIsListening(true);
    setStatus("command-listening");

    try {
      speechRecognitionRef.current.start();

      // Set timeout for command listening
      commandTimeoutRef.current = setTimeout(() => {
        resetCommandListening();
      }, 5000); // 5 second timeout
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      resetCommandListening();
    }
  }, [resetCommandListening]);

  // AI-powered command analysis function
  const analyzeCommand = useCallback(
    (transcript: string): (() => void) | null => {
      const cleanTranscript = transcript.toLowerCase().trim();
      const words = cleanTranscript.split(/\s+/);

      // Find the best matching command by scoring
      const scoredMappings = commandMappings.map((mapping) => {
        let score = 0;

        // Check for primary keywords (higher weight)
        mapping.keywords.forEach((keyword) => {
          if (words.includes(keyword) || cleanTranscript.includes(keyword)) {
            score += 3;
          }
          // Fuzzy matching for slight variations
          words.forEach((word) => {
            if (isStringSimilar(word, keyword)) {
              score += 2;
            }
          });
        });

        // Check for context synonyms (lower weight)
        mapping.synonyms.forEach((synonym) => {
          if (words.includes(synonym) || cleanTranscript.includes(synonym)) {
            score += 1;
          }
        });

        // Bonus for intent-specific patterns
        if (
          mapping.intent === "next" &&
          /\b(play|go|move)\s+(next|forward)\b/.test(cleanTranscript)
        ) {
          score += 2;
        }

        if (
          mapping.intent === "previous" &&
          /\b(go|play|move)\s+(back|previous)\b/.test(cleanTranscript)
        ) {
          score += 2;
        }

        if (
          mapping.intent.includes("load") &&
          /\b(load|play|get|show)\s+(me|some|a)\b/.test(cleanTranscript)
        ) {
          score += 1;
        }

        return { mapping, score };
      });

      // Find the highest scoring mapping
      const bestMatch = scoredMappings.reduce(
        (best, current) => (current.score > best.score ? current : best),
        { mapping: null as CommandMapping | null, score: 0 },
      );

      // Require minimum confidence threshold
      return bestMatch.score >= 2 && bestMatch.mapping
        ? bestMatch.mapping.handler
        : null;
    },
    [commandMappings],
  );

  // Function to process voice commands
  const processVoiceCommand = useCallback(
    (transcript: string): void => {
      setStatus("processing");

      const handler = analyzeCommand(transcript);

      if (handler) {
        console.log(`Executing command for: "${transcript}"`);
        handler();
      } else {
        console.log(`No matching command found for: "${transcript}"`);
      }

      // Reset after processing
      setTimeout(() => {
        resetCommandListening();
      }, 1000);
    },
    [analyzeCommand, resetCommandListening],
  );

  // Initialize Porcupine wake word detection
  useEffect(() => {
    const initializePorcupine = async (): Promise<void> => {
      try {
        console.log("Starting Porcupine initialization...");
        console.log("Access key:", porcupineAccessKey ? "Present" : "Missing");
        console.log("Using built-in model with Computer keyword");
        
        setStatus("wake-listening");

        const porcupineWorker = await PorcupineWorker.create(
          porcupineAccessKey,
          [{ builtin: BuiltInKeyword.Computer, sensitivity: 0.5 }],
          (detection) => {
            console.log(`Wake word detected: ${detection.label}`);
            setIsWakeWordActive(true);
            startCommandListening();
          }
        );

        console.log("Porcupine worker created successfully");

        // Subscribe to WebVoiceProcessor for microphone input
        await WebVoiceProcessor.subscribe(porcupineWorker);

        console.log("WebVoiceProcessor subscribed successfully");
        
        porcupineWorkerRef.current = porcupineWorker;
        
        console.log("Porcupine initialization complete");
      } catch (error) {
        console.error("Failed to initialize Porcupine:", error);
        setStatus("idle");
      }
    };

    initializePorcupine();

    return () => {
      if (porcupineWorkerRef.current) {
        WebVoiceProcessor.unsubscribe(porcupineWorkerRef.current);
        porcupineWorkerRef.current.release();
        porcupineWorkerRef.current.terminate();
      }
    };
  }, [porcupineAccessKey, wakeWordModelPath, startCommandListening]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in globalThis) &&
      !("SpeechRecognition" in globalThis)
    ) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition =
      (globalThis as any).SpeechRecognition ||
      (globalThis as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const { transcript } = event.results[0][0];
      setLastCommand(transcript);
      processVoiceCommand(transcript);
    };

    recognition.addEventListener("error", (event: any) => {
      console.error("Speech recognition error:", event.error);
      resetCommandListening();
    });

    recognition.onend = () => {
      if (isListening) {
        resetCommandListening();
      }
    };

    speechRecognitionRef.current = recognition;

    // eslint-disable-next-line consistent-return
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
    };
  }, [isListening, processVoiceCommand, resetCommandListening]);

  const getStatusMessage = (): string => {
    switch (status) {
      case "wake-listening":
        return 'Listening for "Computer"...';
      case "command-listening":
        return "Wake word detected! Say your command...";
      case "processing":
        return "Processing command...";
      default:
        return "Voice control inactive";
    }
  };

  const getStatusColor = (): string => {
    switch (status) {
      case "wake-listening":
        return "#4ade80"; // green
      case "command-listening":
        return "#f59e0b"; // amber
      case "processing":
        return "#3b82f6"; // blue
      default:
        return "#6b7280"; // gray
    }
  };

  return (
    <div
      className="voice-control-widget"
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
      }}
    >
      <div
        className="status-indicator"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.8)",
          border: `2px solid ${getStatusColor()}`,
          color: "white",
          fontSize: "12px",
          minWidth: "200px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: getStatusColor(),
            animation: status === "idle" ? "none" : "pulse 1.5s infinite",
          }}
        />
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          {getStatusMessage()}
        </span>
      </div>

      {lastCommand && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "#6b7280",
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          Last command: &quot;{lastCommand}&quot;
        </div>
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

export default VoiceControl;
