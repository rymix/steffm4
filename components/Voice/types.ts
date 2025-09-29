export type VoiceCommandMapping = {
  intent: string;
  keywords: string[];
  synonyms: string[];
  handler: () => void;
};
