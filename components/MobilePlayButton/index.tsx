import React from "react";

interface MobilePlayButtonProps {
  mixName?: string;
  onPlay: () => void;
}

const MobilePlayButton: React.FC<MobilePlayButtonProps> = ({
  mixName,
  onPlay,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        color: "white",
        height: "100%",
      }}
    >
      <h2 style={{ marginBottom: "30px", fontSize: "24px" }}>
        {mixName || "Continue Playing"}
      </h2>

      <button
        type="button"
        onClick={onPlay}
        style={{
          background: "linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%)",
          border: "3px solid #ff6b35",
          borderRadius: "50%",
          width: "140px",
          height: "140px",
          color: "white",
          fontSize: "36px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        ▶
      </button>

      <p style={{ marginTop: "20px", opacity: "0.8" }}>
        Tap to resume playback
      </p>
    </div>
  );
};

export default MobilePlayButton;
