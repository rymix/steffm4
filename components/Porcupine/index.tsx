import { usePorcupine } from "@picovoice/porcupine-react";
import { BuiltInKeyword, PorcupineKeyword } from "@picovoice/porcupine-web";
import React, { useEffect, useRef, useState } from "react";
import { PICOVOICE_KEY } from "utils/constants";

const porcupineModel = {
  publicPath: "voicemodels/porcupine_params.pv",
  customWritePath: "3.0.0_porcupine_params.pv",
};

const porcupineKeywords = [];

if (
  porcupineKeywords.length === 0 &&
  porcupineModel.publicPath.endsWith("porcupine_params.pv")
) {
  for (const k in BuiltInKeyword) {
    // @ts-ignore
    console.log("k", k);
    porcupineKeywords.push({ builtin: k });
  }
  console.log(
    "--------------------------------------porcupineKeywords",
    porcupineKeywords,
  );
}

export const Porcupine: React.FC = () => {
  const [keywordDetections, setKeywordDetections] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<PorcupineKeyword>(
    porcupineKeywords[0],
  );

  const accessKeyRef = useRef("");

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

  console.log("farts");

  useEffect(() => {
    console.log("----------------------keyword", keyword);

    init(PICOVOICE_KEY, [keyword], porcupineModel);
  }, []);

  const setSelectedKeyword = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    for (const k of porcupineKeywords) {
      if (k.label === selected || k.builtin === selected) {
        setKeyword(k);
        return;
      }
    }
  };

  useEffect(() => {
    const changeKeyword = async (): Promise<void> => {
      await release();
    };

    changeKeyword();
  }, [release]);

  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
    }
  }, [keywordDetection]);

  return (
    <div className="voice-widget">
      <h2>VoiceWidget</h2>
      <h3>Loaded: {JSON.stringify(isLoaded)}</h3>
      <h3>Listening: {JSON.stringify(isListening)}</h3>
      <h3>Error: {JSON.stringify(error !== null)}</h3>
      {error && <p className="error-message">{error.toString()}</p>}
      <h3>
        <label>Keyword: </label>
        <select
          value={(keyword as any).label ?? (keyword as any).builtin}
          onChange={(e) => setSelectedKeyword(e)}
        >
          {porcupineKeywords.map((k) => (
            <option key={k.label ?? k.builtin} value={k.label ?? k.builtin}>
              {k.label ?? k.builtin}
            </option>
          ))}
        </select>
      </h3>
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
      <button
        onClick={() => release()}
        disabled={error !== null || !isLoaded}
        type="button"
      >
        Release
      </button>
      <h3>Keyword Detections:</h3>
      {keywordDetections.length > 0 && (
        <ul>
          {keywordDetections.map((label: string, index: number) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Porcupine;
