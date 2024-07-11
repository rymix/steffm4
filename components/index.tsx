import About from "components/About";
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
import JupiterTable from "components/Jupiter/Table";
import JupiterTitle from "components/Jupiter/Title";
import Mixcloud from "components/Mixcloud";
import MixInformation from "components/MixInformation";
import MixList from "components/MixList";
import Modal from "components/Modal";
import Overlay from "components/Overlay";
import {
  StyledColumn,
  StyledGridWrapper,
  StyledItem,
  StyledItems,
} from "components/Styled";
import { useMixcloud } from "contexts/mixcloud";
import type { Category } from "db/types";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const getCategoryIndex = (
  categories: Category[],
  selectedCategory: string | null,
): number => {
  const category = categories.find(
    (cat: Category) => cat.code === selectedCategory,
  );
  return category ? category.index : 1; // Default to 1 if not found
};

const Jupiter = (): JSX.Element => {
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
  const [sliderValue, setSliderValue] = useState<number>(volume * 100);

  const initialKnobValue = selectedCategory
    ? getCategoryIndex(categories, selectedCategory)
    : 6;

  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
    setVolume(value / 100);

    ReactGA.event({
      category: "Option",
      action: "Slide",
      label: "Change Volume",
    });
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

    ReactGA.event({
      category: "Select",
      action: "Knob",
      label: `Change Category ${categoryLookup}`,
    });
  };

  const handleAboutClick = (): void => {
    openModal(<About />, null);

    ReactGA.event({
      category: "Option",
      action: "Click",
      label: "About",
    });
  };

  const handleListClick = (): void => {
    openModal(<MixList />, null);

    ReactGA.event({
      category: "Option",
      action: "Click",
      label: "Mix List",
    });
  };

  const handleInfoClick = (): void => {
    openModal(<MixInformation />, null);

    ReactGA.event({
      category: "Option",
      action: "Click",
      label: "Mix Information",
    });
  };

  const handleRandomClick = async (): Promise<void> => {
    if (selectedCategory === "fav") {
      handleLoadRandomFavourite();
    } else if (selectedCategory) {
      handleLoadRandom(selectedCategory);
    } else {
      handleLoadRandom();
    }

    ReactGA.event({
      category: "Option",
      action: "Click",
      label: "Random Mix",
    });
  };

  const handleFavouriteClick = async (): Promise<void> => {
    if (isFavourite(mcKey)) {
      removeFavourite(mcKey);

      ReactGA.event({
        category: "Option",
        action: "Click",
        label: `Favourite Remove ${mcKey}`,
      });
    } else {
      addFavourite(mcKey);

      ReactGA.event({
        category: "Option",
        action: "Click",
        label: `Favourite Add ${mcKey}`,
      });
    }
  };

  useEffect(() => {
    setSliderValue(volume * 100);
  }, [volume]);

  return (
    <>
      <Overlay />
      <Modal />
      {mcKey && (
        <>
          <Mixcloud defaultMcKey={mcKey} />
        </>
      )}
      <JupiterTable>
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
                    />
                    <JupiterButton
                      color="cream"
                      label="Next"
                      onClick={handleNext}
                    />
                    <JupiterButton
                      color="blue"
                      label="Rand"
                      onClick={handleRandomClick}
                    />
                    <JupiterButton
                      color="yellow"
                      label="Fav"
                      onClick={handleFavouriteClick}
                      on={favourite}
                    />
                  </StyledItem>
                </StyledItems>
              </StyledColumn>
              <StyledColumn>
                <JupiterTitle title="Option" />
                <StyledItems>
                  <StyledItem>
                    <JupiterButton
                      color="orange"
                      label="Share"
                      onClick={copySharableLink}
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
                    {isReady && (
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
      </JupiterTable>
    </>
  );
};

export default Jupiter;
