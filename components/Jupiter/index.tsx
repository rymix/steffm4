import About from "components/About";
import DrivingMode from "components/DrivingMode";
import MixInformation from "components/MixInformation";
import MixList from "components/MixList";
import OutRun from "components/OutRun";
import {
  StyledColumn,
  StyledGridWrapper,
  StyledItem,
  StyledItems,
} from "components/Styled";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useKonami } from "react-konami-code";
import { GA4, VOLUME_AVAILABLE } from "utils/constants";
import { getCategoryIndex } from "utils/functions";
import { useAutoplayInteractionTracking } from "utils/mobileAutoplayHelper";

import JupiterButton from "./Button";
import JupiterCase from "./Case";
import JupiterHeader from "./Header";
import JupiterKnob from "./Knob";
import JupiterPanel from "./Panel";
import JupiterBackPanel from "./Panel/BackPanel";
import JupiterFrontPanel from "./Panel/FrontPanel";
import JupiterProgressLeds from "./ProgressLeds";
import JupiterScreen from "./Screen";
import JupiterSlider from "./Slider";
import JupiterTitle from "./Title";
import JupiterWrapper from "./Wrapper";

export const Jupiter: React.FC = () => {
  const {
    isReady,
    mcKey,
    controls: {
      handleLoadRandom,
      handleLoadRandomFavourite,
      handlePause,
      handlePlay,
      handleNext,
      handlePrevious,
    },
    favourites: { addFavourite, isFavourite, removeFavourite },
    filters: { categories = [], selectedCategory, setSelectedCategory },
    mix: { copySharableLink, favourite },
    session: { openModal },
    widget: { playing, setVolume, volume },
  } = useMixcloud();

  const { trackInteraction } = useAutoplayInteractionTracking();
  const [sliderValue, setSliderValue] = useState<number>(volume * 100);

  const easterEgg = (): void => {
    openModal(<OutRun />, undefined, undefined, true);
  };

  useKonami(easterEgg);

  const initialKnobValue = selectedCategory
    ? getCategoryIndex(categories, selectedCategory)
    : 6;

  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
    setVolume(value / 100);

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Slide",
        label: "Change Volume",
      });
    }
  };

  const handleKnobChange = (index: number): void => {
    // Track user interaction for autoplay purposes
    trackInteraction("knob-change");

    const categoryLookup =
      categories.find((cat) => cat.index === index)?.code || "all";

    if (categoryLookup === "fav") {
      handleLoadRandomFavourite();
    } else {
      handleLoadRandom(categoryLookup);
    }

    setSelectedCategory(categoryLookup);

    if (GA4) {
      ReactGA.event({
        category: "Select",
        action: "Knob",
        label: `Change Category ${categoryLookup}`,
      });
    }
  };

  const handleAboutClick = (): void => {
    openModal(<About />);

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: "About",
      });
    }
  };

  const handleListClick = (): void => {
    openModal(<MixList />, undefined, undefined, undefined, true); // Disable shortcuts for search functionality

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: "Mix List",
      });
    }
  };

  const handleInfoClick = (): void => {
    openModal(<MixInformation />);

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: "Mix Information",
      });
    }
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

  const handleFavouriteClick = async (): Promise<void> => {
    if (isFavourite(mcKey)) {
      removeFavourite(mcKey);

      if (GA4) {
        ReactGA.event({
          category: "Option",
          action: "Click",
          label: `Favourite Remove ${mcKey}`,
        });
      }
    } else {
      addFavourite(mcKey);

      if (GA4) {
        ReactGA.event({
          category: "Option",
          action: "Click",
          label: `Favourite Add ${mcKey}`,
        });
      }
    }
  };

  const handleShareClick = (): void => {
    copySharableLink();
  };

  useEffect(() => {
    setSliderValue(volume * 100);
  }, [volume]);

  return (
    <JupiterWrapper>
      <JupiterCase>
        <JupiterPanel padding="0" background="rear">
          <JupiterBackPanel />
        </JupiterPanel>
        <JupiterPanel align="right" padding="12">
          <JupiterHeader />
        </JupiterPanel>
        <JupiterPanel padding="24">
          <JupiterScreen />
        </JupiterPanel>
        <JupiterPanel padding="0">
          <JupiterProgressLeds />
        </JupiterPanel>
        <JupiterPanel padding="12">
          <StyledGridWrapper>
            <StyledColumn>
              <JupiterTitle title="Select" />
              <StyledItems>
                <StyledItem>
                  <JupiterKnob
                    size={92}
                    degrees={220}
                    min={1}
                    max={6}
                    value={initialKnobValue}
                    steps
                    labelVisible={false}
                    categories={categories}
                    onCategoryChange={handleKnobChange}
                    onChange={() => {}}
                  />
                </StyledItem>
              </StyledItems>
            </StyledColumn>
            <StyledColumn>
              <JupiterTitle title="Control" />
              <StyledItems>
                <StyledItem>
                  <JupiterButton
                    color="red"
                    label="Stop"
                    onClick={handlePauseWithTracking}
                    on={playing === false}
                  />
                  <JupiterButton
                    color="green"
                    label="Play"
                    onClick={handlePlayWithTracking}
                    on={playing === true}
                  />
                  <JupiterButton
                    color="cream"
                    label="Prev"
                    onClick={handlePreviousWithTracking}
                    momentary
                  />
                  <JupiterButton
                    color="cream"
                    label="Next"
                    onClick={handleNextWithTracking}
                    momentary
                  />
                  <JupiterButton
                    color="blue"
                    label="Rand"
                    onClick={handleRandomClick}
                    momentary
                  />
                  <JupiterButton
                    color="blue"
                    label="Car"
                    onClick={handleDrivingModeClick}
                    momentary
                  />
                </StyledItem>
              </StyledItems>
            </StyledColumn>
            <StyledColumn>
              <JupiterTitle title="Option" />
              <StyledItems>
                <StyledItem>
                  <JupiterButton
                    color="yellow"
                    label="Fav"
                    onClick={handleFavouriteClick}
                    on={favourite}
                  />
                  <JupiterButton
                    color="yellow"
                    label="Share"
                    onClick={handleShareClick}
                    momentary
                  />
                  <JupiterButton
                    color="orange"
                    label="Info"
                    onClick={handleInfoClick}
                  />
                  <JupiterButton
                    color="orange"
                    label="List"
                    onClick={handleListClick}
                  />
                  <JupiterButton
                    color="orange"
                    label="About"
                    onClick={handleAboutClick}
                  />
                  {isReady && VOLUME_AVAILABLE && (
                    <JupiterSlider
                      label="Vol"
                      volume={sliderValue}
                      onChange={handleSliderChange}
                    />
                  )}
                </StyledItem>
              </StyledItems>
            </StyledColumn>
          </StyledGridWrapper>
        </JupiterPanel>
        <JupiterPanel padding="0" background="front">
          <JupiterFrontPanel />
        </JupiterPanel>
      </JupiterCase>
    </JupiterWrapper>
  );
};

export default Jupiter;
