import Mixcloud from "components/Mixcloud";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import { useEffect, useState } from "react";
import { copyToClipboard, mcKeyFormatter } from "utils/functions";

import JupiterButton from "./Jupiter/Button";
import JupiterCase from "./Jupiter/Case";
import JupiterControlGroup from "./Jupiter/ControlGroup";
import JupiterHeader from "./Jupiter/Header";
import JupiterKnob from "./Jupiter/Knob";
import JupiterPanel from "./Jupiter/Panel";
import JupiterBackPanel from "./Jupiter/Panel/BackPanel";
import JupiterFrontPanel from "./Jupiter/Panel/FrontPanel";
import JupiterScreen from "./Jupiter/Screen";
import JupiterSlider from "./Jupiter/Slider";
import JupiterTable from "./Jupiter/Table";
import MixInformation from "./MixInformation";
import Modal from "./Modal";
import Overlay from "./Overlay";

const Jupiter = (): JSX.Element => {
  const {
    mcKey,
    setMcKey,
    controls: {
      handleLoad,
      handlePause,
      handlePlay,
      handlePlayPause,
      handleNext,
      handlePrevious,
      fetchRandomMcKey,
      fetchRandomMcKeyByCategory,
    },
    filters: { selectedCategory },
    mix: { categoryName, details },
  } = useMixcloud();
  const { openModal } = useSession();

  const [randomMcKey, setRandomMcKey] = useState<string | null>(null);
  const { isMobile, modalOpen, menuOpen, setModalOpen } = useSession();

  const sharableKey = mcKey.replaceAll("/rymixxx/", "").replaceAll("/", "");
  const name = details?.name;

  const handleInfoClick = (): void => {
    openModal(<MixInformation />, name);
  };

  const handleShareClick = (): void => {
    copyToClipboard(`http://localhost:3001/${sharableKey}`);
    openModal(<p>Sharable link copied to clipboard</p>, null, 4);
  };

  const handleRandomClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKeyByCategory(selectedCategory));
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
                value={1}
                onChange={(value) => console.log("Knob 1 value:", value)}
                steps
                labelVisible={false}
              />
            </JupiterControlGroup>
            <JupiterControlGroup pad="both">
              <JupiterButton color="red" label="Stop" onClick={handlePause} />
              <JupiterButton color="green" label="Play" onClick={handlePlay} />
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
              <JupiterSlider label="Volume" />
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
