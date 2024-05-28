import {
  StyledRandomTrack,
  StyledRandomTrackLabel,
  StyledRandomTrackWrapper,
} from "components/RandomTrack/StyledRandomTrack";
import { useMixcloud } from "contexts/mixcloud";
import { useState } from "react";

export const RandomTrack: React.FC = () => {
  const {
    controls: { fetchRandomMcKey, handleLoad },
  } = useMixcloud();
  const [showLabel, setShowLabel] = useState(false);
  const [label, setLabel] = useState("Random mix");

  const handleClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKey());
    setLabel("Enjoy!");
    setTimeout(() => {
      setLabel("Random mix");
    }, 2000);
  };

  return (
    <StyledRandomTrackWrapper
      onClick={handleClick}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <StyledRandomTrackLabel $visible={showLabel}>
        {label}
      </StyledRandomTrackLabel>
      <StyledRandomTrack />
    </StyledRandomTrackWrapper>
  );
};
