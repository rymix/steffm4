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

export type StyledVoiceControlStatusProps = {
  $status?:
    | "idle"
    | "wake-listening"
    | "command-listening"
    | "processing"
    | undefined;
};

export type transcriptRefProps = { final: string; last: string };
