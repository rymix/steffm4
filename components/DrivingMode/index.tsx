import JupiterButton from "components/Jupiter/Button";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import {
  StyledButtonGrid,
  StyledDrivingMode,
  StyledMixTitle,
  StyledSubtitle,
} from "./StyledDrivingMode";

const DrivingMode: React.FC = () => {
  const {
    widget: { playing },
    controls: { handlePlay, handlePause, handleNext, handlePrevious },
    mix: { details: mixDetails },
  } = useMixcloud();

  return (
    <StyledDrivingMode>
      <StyledMixTitle>{mixDetails?.name || "Loading..."}</StyledMixTitle>

      <StyledButtonGrid>
        <JupiterButton
          color="red"
          label="Stop"
          onClick={handlePause}
          on={playing === false}
          size="large"
          textColor="black"
        />

        <JupiterButton
          color="green"
          label="Play"
          onClick={handlePlay}
          on={playing === true}
          size="large"
          textColor="black"
        />

        <JupiterButton
          color="cream"
          label="Prev"
          onClick={handlePrevious}
          momentary
          size="large"
          textColor="black"
        />

        <JupiterButton
          color="cream"
          label="Next"
          onClick={handleNext}
          momentary
          size="large"
          textColor="black"
        />
      </StyledButtonGrid>

      <StyledSubtitle>Simple controls for safe driving</StyledSubtitle>
    </StyledDrivingMode>
  );
};

export default DrivingMode;
