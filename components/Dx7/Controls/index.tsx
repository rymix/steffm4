import Dx7Button from "components/Dx7/Button";
import { StyledDx7Controls } from "components/Dx7/Controls/StyledDx7Controls";
import { StyledDx7Item } from "components/Dx7/Item/StyledDx7Item";
import { useMixcloud } from "contexts/mixcloud";
import { useAutoplayInteractionTracking } from "utils/mobileAutoplayHelper";
import { useDeviceOrientation } from "../useDeviceOrientation";

const Dx7Controls: React.FC = () => {
  const {
    controls: {
      handleLoadRandom,
      handleLoadRandomFavourite,
      handlePause,
      handlePlay,
      handleNext,
      handlePrevious,
    },
    filters: { selectedCategory },
    widget: { playing },
  } = useMixcloud();

  const { isMobile, windowWidth } = useDeviceOrientation();

  const { trackInteraction } = useAutoplayInteractionTracking();

  // Enhanced media control handlers with interaction tracking
  const handlePlayWithTracking = (): void => {
    trackInteraction("play-button");
    handlePlay();
  };

  const handlePauseWithTracking = (): void => {
    trackInteraction("pause-button");
    handlePause();
  };

  const handleNextWithTracking = (): void => {
    trackInteraction("next-button");
    handleNext();
  };

  const handlePreviousWithTracking = (): void => {
    trackInteraction("previous-button");
    handlePrevious();
  };

  const handleRandomClick = async (): Promise<void> => {
    // Track user interaction for autoplay purposes
    trackInteraction("random-button");

    if (selectedCategory === "fav") {
      handleLoadRandomFavourite();
    } else if (selectedCategory) {
      handleLoadRandom(selectedCategory);
    } else {
      handleLoadRandom();
    }
  };

  return (
    <StyledDx7Controls>
      <StyledDx7Item>
        <Dx7Button
          color="red"
          label="Stop"
          onClick={handlePauseWithTracking}
          on={playing === false}
          size={windowWidth <= 480 ? "tiny" : "normal"}
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="green"
          label="Play"
          onClick={handlePlayWithTracking}
          on={playing === true}
          size={windowWidth <= 480 ? "tiny" : "normal"}
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="cream"
          label={windowWidth <= 480 ? "Prev" : "Previous"}
          onClick={handlePreviousWithTracking}
          momentary
          size={windowWidth <= 480 ? "tiny" : "normal"}
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="cream"
          label="Next"
          onClick={handleNextWithTracking}
          momentary
          size={windowWidth <= 480 ? "tiny" : "normal"}
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="blue"
          label={windowWidth <= 480 ? "Rand" : "Random"}
          onClick={handleRandomClick}
          momentary
          size={windowWidth <= 480 ? "tiny" : "normal"}
        />
      </StyledDx7Item>
    </StyledDx7Controls>
  );
};

export default Dx7Controls;
