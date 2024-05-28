import { StyledRandomTrackInCategory } from "components/RandomTrackInCategory/StyledRandomTrackInCategory";
import { useMixcloud } from "contexts/mixcloud";

export const RandomTrackInCategory: React.FC = () => {
  const {
    controls: { fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory },
  } = useMixcloud();

  const handleClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKeyByCategory(selectedCategory));
  };

  return <StyledRandomTrackInCategory onClick={handleClick} />;
};
