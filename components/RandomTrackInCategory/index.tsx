import { StyledRandomTrackInCategory } from "components/RandomTrackInCategory/StyledRandomTrackInCategory";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";

export const RandomTrackInCategory: React.FC = () => {
  const {
    controls: { fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory },
  } = useMixcloud();
  const { openModal } = useSession();

  const handleClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKeyByCategory(selectedCategory));
    openModal(<p>Playing a random {selectedCategory} track</p>, null, 4);
  };

  return <StyledRandomTrackInCategory onClick={handleClick} />;
};
