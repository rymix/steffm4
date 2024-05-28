import { useMixcloud } from "contexts/mixcloud";

import { StyledRandomTrack } from "./StyledRandomTrack";

export const RandomTrack: React.FC = () => {
  const {
    controls: { fetchRandomMcKey, handleLoad },
  } = useMixcloud();

  const handleClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKey());
  };

  return <StyledRandomTrack onClick={handleClick} />;
};
