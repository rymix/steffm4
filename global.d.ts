// global.d.ts
export {};

declare global {
  interface Window {
    Mixcloud: any;
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }

  declare class SpeechRecognition extends EventTarget {
    continuous: boolean;

    grammars: SpeechGrammarList;

    interimResults: boolean;

    lang: string;

    maxAlternatives: number;

    serviceURI: string;

    constructor();

    abort(): void;

    start(): void;

    stop(): void;

    onaudioend: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onaudiostart: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onend: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onerror:
      | ((_this: SpeechRecognition, _ev: SpeechRecognitionErrorEvent) => any)
      | null;

    onnomatch:
      | ((_this: SpeechRecognition, _ev: SpeechRecognitionEvent) => any)
      | null;

    onresult:
      | ((_this: SpeechRecognition, _ev: SpeechRecognitionEvent) => any)
      | null;

    onsoundend: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onsoundstart: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onspeechend: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onspeechstart: ((_this: SpeechRecognition, _ev: Event) => any) | null;

    onstart: ((_this: SpeechRecognition, _ev: Event) => any) | null;
  }

  interface SpeechRecognitionEvent extends Event {
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(_index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(_index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
  }

  interface SpeechGrammarList {
    readonly length: number;
    item(_index: number): SpeechGrammar;
    [index: number]: SpeechGrammar;
    addFromString(_string: string, _weight?: number): void;
    addFromURI(_src: string, _weight?: number): void;
  }

  interface SpeechGrammar {
    src: string;
    weight: number;
  }
}
