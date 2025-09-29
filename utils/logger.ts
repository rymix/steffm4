/**
 * Logging utility with DEBUG controls and emoji categorization
 */

// Check for debug query parameter override
const getDebugMode = (): boolean => {
  if (globalThis.window !== undefined) {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const debugParam = urlParams.get("debug");
    if (debugParam !== null) {
      return debugParam === "true" || debugParam === "1";
    }
  }
  // Fallback to environment/build-time constant
  return process.env.NODE_ENV === "development";
};

export const DEBUG = getDebugMode();

// Emoji categories for consistent logging
export const LogEmoji = {
  // Player/Widget operations
  WIDGET: "🎵", // Widget initialization, loading, ready states
  PLAY: "▶️", // Play actions
  PAUSE: "⏸️", // Pause actions
  SEEK: "🎯", // Seeking operations
  ENDED: "🔚", // Track/mix ended

  // Navigation/Control
  NEXT: "⏭️", // Next track/mix
  PREVIOUS: "⏮️", // Previous track/mix
  RANDOM: "🎲", // Random selection

  // System/Technical
  SUCCESS: "✅", // Successful operations
  ERROR: "❌", // Errors and failures
  WARNING: "⚠️", // Warnings
  INFO: "📝", // General information
  SETUP: "🔧", // Setup/initialization
  LOAD: "📏", // Loading operations
  SEARCH: "🔍", // Search operations

  // User actions
  SHARE: "🔗", // Sharing functionality
  FAVOURITE: "⭐", // Favourite operations

  // Voice operations
  VOICE: "🎤", // Voice control operations
  WAKE: "👂", // Wake word detection
  COMMAND: "💬", // Command recognition
  SPEECH: "🗣️", // Speech API events
  MATCH: "🎯", // Command matching
} as const;

type LogLevel = "log" | "warn" | "error" | "info";

/**
 * Main logging function with emoji categorization
 */
const createLogger = (emoji: string, level: LogLevel = "log") => {
  return (message: string, ...args: any[]) => {
    if (DEBUG) {
      console[level](`${emoji} ${message}`, ...args);
    }
  };
};

/**
 * Essential logging that always shows (even when DEBUG is false)
 */
const createEssentialLogger = (emoji: string, level: LogLevel = "log") => {
  return (message: string, ...args: any[]) => {
    console[level](`${emoji} ${message}`, ...args);
  };
};

// Debug-only loggers (respect DEBUG flag)
export const logger = {
  widget: createLogger(LogEmoji.WIDGET),
  play: createLogger(LogEmoji.PLAY),
  pause: createLogger(LogEmoji.PAUSE),
  seek: createLogger(LogEmoji.SEEK),
  ended: createLogger(LogEmoji.ENDED),
  next: createLogger(LogEmoji.NEXT),
  previous: createLogger(LogEmoji.PREVIOUS),
  random: createLogger(LogEmoji.RANDOM),
  success: createLogger(LogEmoji.SUCCESS),
  warning: createLogger(LogEmoji.WARNING, "warn"),
  info: createLogger(LogEmoji.INFO),
  setup: createLogger(LogEmoji.SETUP),
  load: createLogger(LogEmoji.LOAD),
  search: createLogger(LogEmoji.SEARCH),
  share: createLogger(LogEmoji.SHARE),
  favourite: createLogger(LogEmoji.FAVOURITE),
  voice: createLogger(LogEmoji.VOICE),
  wake: createLogger(LogEmoji.WAKE),
  command: createLogger(LogEmoji.COMMAND),
  speech: createLogger(LogEmoji.SPEECH),
  match: createLogger(LogEmoji.MATCH),
};

// Essential loggers (always show, even when DEBUG is false)
export const essentialLogger = {
  error: createEssentialLogger(LogEmoji.ERROR, "error"),
  widgetReady: createEssentialLogger(LogEmoji.SUCCESS),
  scriptLoaded: createEssentialLogger(LogEmoji.SETUP),
};

// Legacy support - gradually replace these with the new loggers
export const log = {
  debug: (message: string, ...args: any[]) =>
    DEBUG && console.log(`${LogEmoji.INFO} ${message}`, ...args),
  warn: (message: string, ...args: any[]) =>
    DEBUG && console.warn(`${LogEmoji.WARNING} ${message}`, ...args),
  error: (message: string, ...args: any[]) =>
    console.error(`${LogEmoji.ERROR} ${message}`, ...args),
};
