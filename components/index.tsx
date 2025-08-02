import ScrollIndicator from "components//ScrollIndicator";
import About from "components/About";
import Background from "components/Background";
import BurgerMenu from "components/BurgerMenu";
import FloppyDiskStack from "components/Floppy/FloppyDiskStack";
import { DiskLabel } from "components/Floppy/types";
import JupiterButton from "components/Jupiter/Button";
import JupiterCase from "components/Jupiter/Case";
import JupiterHeader from "components/Jupiter/Header";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterPanel from "components/Jupiter/Panel";
import JupiterBackPanel from "components/Jupiter/Panel/BackPanel";
import JupiterFrontPanel from "components/Jupiter/Panel/FrontPanel";
import JupiterProgressLeds from "components/Jupiter/ProgressLeds";
import JupiterScreen from "components/Jupiter/Screen";
import JupiterSlider from "components/Jupiter/Slider";
import JupiterTitle from "components/Jupiter/Title";
import JupiterWrapper from "components/Jupiter/Wrapper";
import UserManualCover from "components/Manual/UserManualCover";
import Mixcloud from "components/Mixcloud";
import MixInformation from "components/MixInformation";
import MixList from "components/MixList";
import Modal from "components/Modal";
import Notebook from "components/Notebook";
import OutRun from "components/OutRun";
import Overlay from "components/Overlay";
import {
  StyledBottomGrid,
  StyledBottomPanel,
  StyledChild,
  StyledChildFloppy,
  StyledColumn,
  StyledFixedBackground,
  StyledFixedForeground,
  StyledGridWrapper,
  StyledItem,
  StyledItems,
  StyledScrollContainer,
  StyledTopPanel,
} from "components/Styled";
import Tooltip from "components/Tooltip";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useKonami } from "react-konami-code";
import { GA4, VOLUME_AVAILABLE } from "utils/constants";
import { getCategoryIndex } from "utils/functions";

const Jupiter: React.FC = () => {
  const {
    isReady,
    mcKey,
    controls: {
      handleLoadLatest,
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
    session: { openModal, modalOpen, modalContent },
    track: { details: trackDetails, sectionNumber: trackSectionNumber },
    widget: { playing, setVolume, volume },
  } = useMixcloud();
  const [sliderValue, setSliderValue] = useState<number>(volume * 100);
  const [diskLabel, setDiskLabel] = useState<DiskLabel>();

  // Helper functions to determine if specific modals are open
  const isListModalOpen = modalOpen && modalContent?.type?.name === 'MixList';
  const isInfoModalOpen = modalOpen && modalContent?.type?.name === 'MixInformation';  
  const isAboutModalOpen = modalOpen && modalContent?.type?.name === 'About';

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

  const handleLatestClick = async (): Promise<void> => {
    handleLoadLatest();

    if (GA4) {
      ReactGA.event({
        category: "Option",
        action: "Click",
        label: "Latest Mix",
      });
    }
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

  useEffect(() => {
    setDiskLabel({
      trackName: trackDetails?.trackName,
      artistName: trackDetails?.artistName,
    });
  }, [trackSectionNumber, trackDetails?.trackName]);

  return (
    <>
      <StyledFixedBackground>
        <Background />
        {mcKey && <Mixcloud defaultMcKey={mcKey} />}
      </StyledFixedBackground>

      <StyledFixedForeground>
        <BurgerMenu />
        <Overlay />
        <Modal />
        <Tooltip />
        <ScrollIndicator />
      </StyledFixedForeground>

      <StyledScrollContainer>
        <StyledTopPanel>
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
                          onClick={handlePause}
                          on={playing === false}
                        />
                        <JupiterButton
                          color="green"
                          label="Play"
                          onClick={handlePlay}
                          on={playing === true}
                        />
                        <JupiterButton
                          color="cream"
                          label="Prev"
                          onClick={handlePrevious}
                          momentary
                        />
                        <JupiterButton
                          color="cream"
                          label="Next"
                          onClick={handleNext}
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
                          label="Latest"
                          onClick={handleLatestClick}
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
                          on={isInfoModalOpen}
                        />
                        <JupiterButton
                          color="orange"
                          label="List"
                          onClick={handleListClick}
                          on={isListModalOpen}
                        />
                        <JupiterButton
                          color="orange"
                          label="About"
                          onClick={handleAboutClick}
                          on={isAboutModalOpen}
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
        </StyledTopPanel>
        <StyledBottomPanel>
          <StyledBottomGrid>
            <StyledChild>
              <Notebook />
            </StyledChild>
            <StyledChild>
              <UserManualCover />
            </StyledChild>
            <StyledChildFloppy>
              {trackDetails && <FloppyDiskStack label={diskLabel} />}
            </StyledChildFloppy>
          </StyledBottomGrid>
        </StyledBottomPanel>
      </StyledScrollContainer>
    </>
  );
};

export default Jupiter;
