import DrivingMode from "components/DrivingMode";
import Dx7Button from "components/Dx7/Button";
import { StyledDx7Controls } from "components/Dx7/Controls/StyledDx7Controls";
import { StyledDx7Item } from "components/Dx7/Item/StyledDx7Item";
import { useMixcloud } from "contexts/mixcloud";
import ReactGA from "react-ga4";
import { GA4 } from "utils/constants";
import { useAutoplayInteractionTracking } from "utils/mobileAutoplayHelper";

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
    session: { openModal },
    widget: { playing },
  } = useMixcloud();
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

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: "Random Mix",
      });
    }
  };

  const handleDrivingModeClick = (): void => {
    openModal(<DrivingMode />);

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: "Driving Mode",
      });
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
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="green"
          label="Play"
          onClick={handlePlayWithTracking}
          on={playing === true}
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="cream"
          label="Prev"
          onClick={handlePreviousWithTracking}
          momentary
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="cream"
          label="Next"
          onClick={handleNextWithTracking}
          momentary
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="blue"
          label="Rand"
          onClick={handleRandomClick}
          momentary
        />
      </StyledDx7Item>
      <StyledDx7Item>
        <Dx7Button
          color="blue"
          label="Car"
          onClick={handleDrivingModeClick}
          momentary
        />
      </StyledDx7Item>
    </StyledDx7Controls>
  );
};

export default Dx7Controls;
