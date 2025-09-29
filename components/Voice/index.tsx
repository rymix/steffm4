import VoiceControl from "components/Voice/VoiceControlFixed";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Voice: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    controls: {
      handleLoadLatest,
      handleLoadRandom,
      handleLoadRandomFavourite,
      handleNext,
      handlePause,
      handlePlay,
      handlePrevious,
    },
  } = useMixcloud();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <VoiceControl
      handleLoadLatest={handleLoadLatest}
      handleLoadRandom={handleLoadRandom}
      handleLoadRandomFavourite={handleLoadRandomFavourite}
      handleNext={handleNext}
      handlePause={handlePause}
      handlePlay={handlePlay}
      handlePrevious={handlePrevious}
      porcupineAccessKey="MxooLir5tEfehnurWbvN+CJt/uxsazpZZfi21s8bQeHfc1Xsg3thnw=="
      wakeWordModelPath="/voicemodels/Hey-Steph_en_wasm_v3_0_0.ppn"
    />
  );
};

export default Voice;
