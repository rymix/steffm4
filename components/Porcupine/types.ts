/* eslint-disable no-unused-vars */
export type VoiceCommandMapping = {
  intent: string;
  keywords: string[];
  synonyms: string[];
  handler: (category?: string) => void;
};

export type VoiceStatus =
  | "idle"
  | "wake-listening"
  | "command-listening"
  | "processing";
