import {
  StyledVoiceControlControls,
  StyledVoiceControlErrorMessage,
  StyledVoiceControlModeIndicator,
  StyledVoiceControlStatus,
  StyledVoiceControlStatusIcon,
  StyledVoiceControlStatusMessage,
} from "components/VoiceControl/StyledVoiceControl";
import { useVoiceControl } from "hooks/useVoiceControl";
import React from "react";
import { DEBUG } from "utils/logger";

const HIDEME = true;

export const Porcupine: React.FC = () => {
  const {
    status,
    isLoaded,
    isListening,
    isCommandListening,
    error,
    lastCommand,
    debugInfo,
    keywordDetections,
    start,
    stop,
    testCommandListening,
    getStatusMessage,
  } = useVoiceControl();

  return (
    <div className="voice-widget">
      <StyledVoiceControlStatus $status={status}>
        <StyledVoiceControlStatusIcon $status={status} />
        <StyledVoiceControlStatusMessage>
          {getStatusMessage()}
        </StyledVoiceControlStatusMessage>
      </StyledVoiceControlStatus>

      <StyledVoiceControlModeIndicator>
        <strong>Loaded:</strong> {JSON.stringify(isLoaded)}
        {" | "}
        <strong>Wake Listening:</strong> {JSON.stringify(isListening)}
        {" | "}
        <strong>Command Listening:</strong> {JSON.stringify(isCommandListening)}
      </StyledVoiceControlModeIndicator>

      {error && (
        <StyledVoiceControlErrorMessage>
          {error.toString()}
        </StyledVoiceControlErrorMessage>
      )}

      <StyledVoiceControlControls style={{ marginBottom: "12px" }}>
        <button
          onClick={() => start()}
          disabled={error !== null || !isLoaded || isListening}
          type="button"
          style={{ marginRight: "8px" }}
        >
          Start Wake Word Detection
        </button>
        <button
          onClick={() => stop()}
          disabled={error !== null || !isLoaded || !isListening}
          type="button"
          style={{ marginRight: "8px" }}
        >
          Stop Wake Word Detection
        </button>
        {DEBUG && (
          <button
            onClick={testCommandListening}
            type="button"
            style={{ backgroundColor: "#fbbf24", padding: "4px 8px" }}
          >
            🧪 Test Command Listen
          </button>
        )}
      </StyledVoiceControlControls>

      {lastCommand && (
        <div
          style={{
            marginTop: "8px",
            padding: "8px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
          }}
        >
          <strong>Last command:</strong> &quot;{lastCommand}&quot;
        </div>
      )}

      {!HIDEME && DEBUG && debugInfo.length > 0 && (
        <div
          style={{
            marginTop: "12px",
            padding: "8px",
            backgroundColor: "#fef3c7",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          <strong>Debug Log:</strong>
          {debugInfo.map((info, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`debug-${index}-${info.slice(0, 10)}`}
              style={{ fontFamily: "monospace", marginTop: "2px" }}
            >
              {info}
            </div>
          ))}
        </div>
      )}

      {keywordDetections.length > 0 && (
        <>
          <h3>Wake Word Detections:</h3>
          <ul>
            {keywordDetections.map((label: string) => (
              <li key={`${label}-${Math.random()}`}>{label}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Porcupine;

// Also export as VoiceControl for consistency
export { Porcupine as VoiceControl };
