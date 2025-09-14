import {
  StyledButtonGrid,
  StyledDrivingMode,
  StyledMixTitle,
  StyledSubtitle,
  StyledTrackTitle,
} from "components/DrivingMode/StyledDrivingMode";
import Dx7Button from "components/Dx7/Button";
import JupiterButton from "components/Jupiter/Button";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

const DrivingMode: React.FC = () => {
  const {
    widget: { playing },
    controls: { handlePlay, handlePause, handleNext, handlePrevious },
    mix: { details: mixDetails },
    track: { details: trackDetails },
    themes: { playerTheme },
  } = useMixcloud();

  const isDx7Theme = playerTheme === "Dx7";
  const ButtonComponent = isDx7Theme ? Dx7Button : JupiterButton;
  const buttonSize = isDx7Theme ? "huge" : "large";

  return (
    <StyledDrivingMode>
      <StyledMixTitle>{mixDetails?.name || "Loading..."}</StyledMixTitle>
      <StyledTrackTitle>
        {trackDetails?.trackName
          ? `${trackDetails?.trackName} - ${trackDetails?.artistName}`
          : "Loading..."}
      </StyledTrackTitle>

      <StyledButtonGrid>
        <ButtonComponent
          color="red"
          label="Stop"
          onClick={handlePause}
          on={playing === false}
          size={buttonSize}
          textColor="black"
        />

        <ButtonComponent
          color="green"
          label="Play"
          onClick={handlePlay}
          on={playing === true}
          size={buttonSize}
          textColor="black"
        />

        <ButtonComponent
          color="cream"
          label="Prev"
          onClick={handlePrevious}
          momentary
          size={buttonSize}
          textColor="black"
        />

        <ButtonComponent
          color="cream"
          label="Next"
          onClick={handleNext}
          momentary
          size={buttonSize}
          textColor="black"
        />
      </StyledButtonGrid>

      <StyledSubtitle>Simple controls for safe driving</StyledSubtitle>
    </StyledDrivingMode>
  );
};

export default DrivingMode;
