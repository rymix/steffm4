import Dx7Slider from "components/Dx7/Slider";
import { useMixcloud } from "contexts/mixcloud";
import { useState } from "react";
import { VOLUME_AVAILABLE } from "utils/constants";

const Dx7Volume: React.FC = () => {
  const {
    isReady,
    widget: { setVolume, volume },
  } = useMixcloud();

  const [sliderValue, setSliderValue] = useState<number>(volume * 100);

  const handleSliderChange = (value: number): void => {
    setSliderValue(value);
    setVolume(value / 100);
  };

  return (
    <>
      {isReady && VOLUME_AVAILABLE && (
        <Dx7Slider
          label="Vol"
          volume={sliderValue}
          onChange={handleSliderChange}
        />
      )}
    </>
  );
};

export default Dx7Volume;
