import { usePorcupine } from "@picovoice/porcupine-react";
import { BuiltInKeyword, PorcupineKeyword } from "@picovoice/porcupine-web";
import React, { useCallback, useEffect, useRef, useState } from "react";

import porcupineKeywords from "./lib/porcupineKeywords.js";
import porcupineModel from "./lib/porcupineModel.js";

if (
  porcupineKeywords.length === 0 &&
  porcupineModel.publicPath.endsWith("porcupine_params.pv")
) {
  for (const k in BuiltInKeyword) {
    // @ts-ignore
    porcupineKeywords.push({ builtin: k });
  }
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

  const initEngine = useCallback(async () => {
    if (accessKeyRef.current.length === 0) {
      return;
    }

    await init(accessKeyRef.current, [keyword], porcupineModel);
  }, [init, keyword]);

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
      await initEngine();
    };

    changeKeyword();
  }, [initEngine, release]);

  useEffect(() => {
    if (keywordDetection !== null) {
      setKeywordDetections((oldVal) => [...oldVal, keywordDetection.label]);
    }
  }, [keywordDetection]);

  return (
    <div className="voice-widget">
      <h2>VoiceWidget</h2>
      <h3>
        <label>
          AccessKey obtained from{" "}
          <a href="https://console.picovoice.ai/">Picovoice Console</a>:{" "}
          MxooLir5tEfehnurWbvN+CJt/uxsazpZZfi21s8bQeHfc1Xsg3thnw==
          <input
            type="text"
            name="accessKey"
            onChange={(e) => {
              accessKeyRef.current = e.target.value;
            }}
          />
          <button className="init-button" onClick={() => initEngine()}>
            Init Porcupine
          </button>
        </label>
      </h3>
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
