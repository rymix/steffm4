import JupiterButton from "components/Jupiter/Button";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledMobilePlayButton } from "./StyledMobilePlayButton";

interface MobilePlayButtonProps {
  mixName?: string;
  onPlay: () => void;
}

const MobilePlayButton: React.FC<MobilePlayButtonProps> = ({
  mixName,
  onPlay,
}) => {
  const {
    widget: { playing },
  } = useMixcloud();

  return (
    <StyledMobilePlayButton>
      <h2 style={{ marginBottom: "30px", fontSize: "24px" }}>
        {mixName || "Continue Playing"}
      </h2>

      <JupiterButton
        color="green"
        label="Play"
        onClick={onPlay}
        on={playing === true}
        size="huge"
        textColor="black"
      />

      <p style={{ marginTop: "20px", opacity: "0.8" }}>
        Tap to resume playback
      </p>
    </StyledMobilePlayButton>
  );
};

export default MobilePlayButton;
