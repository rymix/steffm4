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
import Modal from "components/Modal";
import Overlay from "components/Overlay";
import {
  StyledColumn,
  StyledGridWrapper,
  StyledItem,
  StyledItems,
} from "components/Styled";
import Vignette from "components/Vignette";
import { useMixcloud } from "contexts/mixcloud";
import type { Category } from "db/types";
import { useEffect, useState } from "react";
import { copyToClipboard } from "utils/functions";

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
    mcKey,
    setMcKey,
    controls: {
      handleLoad,
      handlePause,
      handlePlay,
      handleNext,
      handlePrevious,
      fetchRandomMcKey,
      fetchRandomMcKeyByCategory,
    },
    filters: { categories = [], selectedCategory, updateSelectedCategory },
    mix: { details },
    screen: { setTemporaryMessage },
    session: { isMobile, openModal },
    widget: { playing, setVolume, volume },
  } = useMixcloud();
  const [sliderValue, setSliderValue] = useState(volume * 100);
  const [isMounted, setIsMounted] = useState(false);
  const sharableKey = mcKey.replaceAll("/rymixxx/", "").replaceAll("/", "");
  const name = details?.name;
  const initialKnobValue = getCategoryIndex(categories, selectedCategory);

  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
    setVolume(value / 100);
  };

  const handleInfoClick = (): void => {
    openModal(<MixInformation />, name);
  };

  const handleShareClick = (): void => {
    copyToClipboard(`http://localhost:3001/${sharableKey}`);
    setTemporaryMessage("Sharable link copied to clipboard");
  };

  const handleRandomClick = async (): Promise<void> => {
    const randomKey = await fetchRandomMcKeyByCategory(selectedCategory);
    if (randomKey) {
      handleLoad(randomKey);
    }
  };

  useEffect(() => {
    console.log("Jupiter mounted", mcKey);

    if (!mcKey) {
      console.log("Going to load random mix");
      fetchRandomMcKey().then((randomKey) => setMcKey(randomKey));
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSliderValue(volume * 100);
  }, [volume]);

  return (
    <>
      <Vignette />
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
          {isMobile && (
            <>
              <JupiterPanel padding="6">
                <JupiterScreen />
              </JupiterPanel>
              <JupiterPanel padding="0">
                <JupiterProgressLeds />
              </JupiterPanel>
              <JupiterPanel padding="0">
                <StyledGridWrapper>
                  <StyledColumn>
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
                      </StyledItem>
                    </StyledItems>
                  </StyledColumn>
                  <StyledColumn>
                    <StyledItems>
                      <StyledItem>
                        <JupiterButton
                          color="orange"
                          label="Info"
                          onClick={handleInfoClick}
                        />
                        <JupiterButton
                          color="orange"
                          label="Share"
                          onClick={handleShareClick}
                        />
                        <JupiterButton
                          color="blue"
                          label="Rand"
                          onClick={handleRandomClick}
                        />
                        {isMounted && (
                          <JupiterSlider
                            label="Vol"
                            volume={sliderValue}
                            onChange={handleSliderChange}
                          />
                        )}
                      </StyledItem>
                    </StyledItems>
                  </StyledColumn>
                  <StyledColumn>
                    <StyledItems>
                      <StyledItem>
                        <JupiterKnob
                          size={92}
                          degrees={220}
                          min={1}
                          max={5}
                          value={initialKnobValue}
                          steps
                          labelVisible={false}
                          categories={categories}
                          onCategoryChange={updateSelectedCategory}
                          onChange={() => {}}
                        />
                      </StyledItem>
                    </StyledItems>
                  </StyledColumn>
                </StyledGridWrapper>
              </JupiterPanel>
            </>
          )}
          {!isMobile && (
            <>
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
                          max={5}
                          value={initialKnobValue}
                          steps
                          labelVisible={false}
                          categories={categories}
                          onCategoryChange={updateSelectedCategory}
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
                      </StyledItem>
                      <StyledItem>
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
                      </StyledItem>
                    </StyledItems>
                  </StyledColumn>
                  <StyledColumn>
                    <JupiterTitle title="Option" />
                    <StyledItems>
                      <StyledItem>
                        <JupiterButton
                          color="orange"
                          label="Info"
                          onClick={handleInfoClick}
                        />
                        <JupiterButton
                          color="orange"
                          label="Share"
                          onClick={handleShareClick}
                        />
                      </StyledItem>
                      <StyledItem>
                        <JupiterButton
                          color="blue"
                          label="Rand"
                          onClick={handleRandomClick}
                        />
                        {isMounted && (
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
            </>
          )}
          <JupiterPanel padding="0" background="front">
            <JupiterFrontPanel />
          </JupiterPanel>
        </JupiterCase>
      </JupiterTable>
    </>
  );
};

export default Jupiter;
