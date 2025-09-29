import { usePorcupine } from "@picovoice/porcupine-react";
import React, { useEffect, useState } from "react";
import { PICOVOICE_KEY } from "utils/constants";

const porcupineModel = {
  publicPath: "voicemodels/porcupine_params.pv",
  customWritePath: "3.0.0_porcupine_params.pv",
};

// const defaultKeyword = { builtin: "Alexa" } as PorcupineKeyword;

const customKeyword = {
  publicPath: "/voicemodels/Hey-Steph_en_wasm_v3_0_0.ppn",
  label: "Hey Stef",
};

export const Porcupine: React.FC = () => {
  const [keywordDetections, setKeywordDetections] = useState<string[]>([]);

  const { keywordDetection, isLoaded, isListening, error, init, start, stop } =
    usePorcupine();

  useEffect(() => {
    init(PICOVOICE_KEY, [customKeyword], porcupineModel);
  }, []);

  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
    }
  }, [keywordDetection]);

  return (
    <div className="voice-widget">
      <h3>Loaded: {JSON.stringify(isLoaded)}</h3>
      <h3>Listening: {JSON.stringify(isListening)}</h3>
      <h3>Error: {JSON.stringify(error !== null)}</h3>
      {error && <p className="error-message">{error.toString()}</p>}
      <br />
      <button
        onClick={() => start()}
        disabled={error !== null || !isLoaded || isListening}
        type="button"
      >
        Start
      </button>
      <button
        onClick={() => stop()}
        disabled={error !== null || !isLoaded || !isListening}
        type="button"
      >
        Stop
      </button>
      <h3>Keyword Detections:</h3>
      {keywordDetections.length > 0 && (
        <ul>
          {keywordDetections.map((label: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Porcupine;
