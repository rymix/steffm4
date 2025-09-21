import VoiceControlSimple from "components/Voice/VoiceControlSimple";
import { useMixcloud } from "contexts/mixcloud";

const Voice: React.FC = () => {
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

  return (
    <VoiceControlSimple
      handleLoadLatest={handleLoadLatest}
      handleLoadRandom={handleLoadRandom}
      handleLoadRandomFavourite={handleLoadRandomFavourite}
      handleNext={handleNext}
      handlePause={handlePause}
      handlePlay={handlePlay}
      handlePrevious={handlePrevious}
    />
  );
};

export default Voice;
