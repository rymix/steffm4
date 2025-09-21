import { usePorcupine } from "@picovoice/porcupine-react";
import { BuiltInKeyword } from "@picovoice/porcupine-web";
import React, { useEffect } from "react";

const PorcupineTest: React.FC = () => {
  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();

  useEffect(() => {
    // Try with minimal model object
    const porcupineModel = {
      customWritePath: "default_model",
      forceWrite: false,
      version: 1,
    };

    init(
      "MxooLir5tEfehnurWbvN+CJt/uxsazpZZfi21s8bQeHfc1Xsg3thnw==",
      [BuiltInKeyword.Porcupine],
      porcupineModel,
    );
  }, []);

  useEffect(() => {
    if (keywordDetection !== null) {
      console.log("Wake word detected!");
    }
  }, [keywordDetection]);

  return (
    <div>
      <dl>
        <dt>keywordDetection</dt>
        <dd>{keywordDetection?.toString()}</dd>
        <dt>isLoaded</dt>
        <dd>{isLoaded ? "loaded" : "not loaded"}</dd>
        <dt>isListening</dt>
        <dd>{isListening ? "listening" : "not listening"}</dd>
        <dt>error</dt>
        <dd>{error?.toString()}</dd>
      </dl>

      <button onClick={start} disabled={!isLoaded || isListening}>
        Start Listening
      </button>
      <button onClick={stop} disabled={!isListening}>
        Stop Listening
      </button>
    </div>
  );
};

export default PorcupineTest;
