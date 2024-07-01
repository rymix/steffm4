import JupiterButton from "components/Jupiter/Button";
import JupiterCase from "components/Jupiter/Case";
import JupiterControlGroup from "components/Jupiter/ControlGroup";
import JupiterHeader from "components/Jupiter/Header";
import JupiterKnob from "components/Jupiter/Knob";
import JupiterPanel from "components/Jupiter/Panel";
import JupiterBackPanel from "components/Jupiter/Panel/BackPanel";
import JupiterFrontPanel from "components/Jupiter/Panel/FrontPanel";
import JupiterScreen from "components/Jupiter/Screen";
import JupiterSlider from "components/Jupiter/Slider";
import JupiterTable from "components/Jupiter/Table";
import Mixcloud from "components/Mixcloud";
import MixInformation from "components/MixInformation";
import Modal from "components/Modal";
import Overlay from "components/Overlay";
import { useMixcloud } from "contexts/mixcloud";
import type { Category } from "db/types";
import { useEffect, useState } from "react";
import { copyToClipboard, mcKeyFormatter } from "utils/functions";

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
    session: { openModal },
    widget: { playing, setVolume, volume },
  } = useMixcloud();
  const [randomMcKey, setRandomMcKey] = useState<string | null>(null);
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
    openModal(<p>Sharable link copied to clipboard</p>, null, 4);
  };

  const handleRandomClick = async (): Promise<void> => {
    const randomKey = await fetchRandomMcKeyByCategory(selectedCategory);
    if (randomKey) {
      handleLoad(randomKey);
    }
  };

  useEffect(() => {
    const fetchKey = async (): Promise<void> => {
      const key = selectedCategory
        ? await fetchRandomMcKeyByCategory(selectedCategory)
        : await fetchRandomMcKey();
      const formattedKey = mcKeyFormatter(key);
      setRandomMcKey(formattedKey);
    };

    if (mcKey) {
      setRandomMcKey(mcKey);
    } else {
      fetchKey();
    }
  }, [mcKey, selectedCategory, fetchRandomMcKey, fetchRandomMcKeyByCategory]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSliderValue(volume * 100);
  }, [volume]);

  return (
    <>
      <Overlay />
      <Modal />
      {randomMcKey && (
        <>
          <Mixcloud defaultMcKey={randomMcKey} />
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
            <JupiterControlGroup>
              <JupiterScreen />
            </JupiterControlGroup>
          </JupiterPanel>
          <JupiterPanel title="Controls" padding="12">
            <JupiterControlGroup pad="rightBig">
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
            </JupiterControlGroup>
            <JupiterControlGroup pad="both">
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
            </JupiterControlGroup>
            <JupiterControlGroup pad="right">
              <JupiterButton
                color="cream"
                label="Prev"
                onClick={handlePrevious}
              />
              <JupiterButton color="cream" label="Next" onClick={handleNext} />
            </JupiterControlGroup>
            <JupiterControlGroup pad="right">
              <JupiterButton
                color="blue"
                label="Rand"
                onClick={handleRandomClick}
              />
            </JupiterControlGroup>
            <JupiterControlGroup pad="right">
              {isMounted && (
                <JupiterSlider
                  label="Volume"
                  volume={sliderValue}
                  onChange={handleSliderChange}
                />
              )}
            </JupiterControlGroup>
            <JupiterControlGroup>
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
            </JupiterControlGroup>
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
