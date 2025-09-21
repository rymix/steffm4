import React, { useState } from "react";

interface VoiceControlProps {
  handleLoadLatest: () => void;
  handleLoadRandom: () => void;
  handleLoadRandomFavourite: () => void;
  handleNext: () => void;
  handlePause: () => void;
  handlePlay: () => void;
  handlePrevious: () => void;
}

const VoiceControlSimple: React.FC<VoiceControlProps> = ({
  handleLoadLatest,
  handleLoadRandom,
  handleLoadRandomFavourite,
  handleNext,
  handlePause,
  handlePlay,
  handlePrevious,
}) => {
  const [status] = useState<
    "idle" | "wake-listening" | "command-listening" | "processing"
  >("idle");

  const getStatusMessage = (): string => {
    switch (status) {
      case "wake-listening":
        return 'Listening for "Hey Stef"...';
      case "command-listening":
        return "Say your command...";
      case "processing":
        return "Processing command...";
      default:
        return "Voice control inactive (placeholder)";
    }
  };

  const getStatusColor = (): string => {
    switch (status) {
      case "wake-listening":
        return "#4ade80"; // green
      case "command-listening":
        return "#f59e0b"; // amber
      case "processing":
        return "#3b82f6"; // blue
      default:
        return "#6b7280"; // gray
    }
  };

  // Development buttons for testing the handlers
  const handleTestCommand = (command: string): void => {
    console.log(`Testing voice command: ${command}`);
    switch (command) {
      case "play":
        handlePlay();
        break;
      case "pause":
        handlePause();
        break;
      case "next":
        handleNext();
        break;
      case "previous":
        handlePrevious();
        break;
      case "latest":
        handleLoadLatest();
        break;
      case "random":
        handleLoadRandom();
        break;
      case "favourite":
        handleLoadRandomFavourite();
        break;
      default:
        console.log("Unknown command");
    }
  };

  return (
    <div
      className="voice-control-widget"
      style={{ position: "fixed", top: "10px", right: "10px", zIndex: 9999 }}
    >
      <div
        className="status-indicator"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.8)",
          border: `2px solid ${getStatusColor()}`,
          color: "white",
          fontSize: "12px",
          minWidth: "200px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: getStatusColor(),
          }}
        />
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          {getStatusMessage()}
        </span>
      </div>

      {/* Development Test Buttons */}
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        {[
          "play",
          "pause",
          "next",
          "previous",
          "latest",
          "random",
          "favourite",
        ].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleTestCommand(cmd)}
            style={{
              padding: "4px 8px",
              fontSize: "10px",
              backgroundColor: "#333",
              color: "white",
              border: "1px solid #555",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VoiceControlSimple;
