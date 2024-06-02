import { StyledRandomTrackInCategory } from "components/RandomTrackInCategory/StyledRandomTrackInCategory";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import { setTimeout } from "timers";

export const RandomTrackInCategory: React.FC = () => {
  const {
    controls: { fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory },
  } = useMixcloud();
  const { openModal, setModalOpen } = useSession();

  const handleClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKeyByCategory(selectedCategory));
    openModal(<p>Playing a random {selectedCategory} track</p>);
    setTimeout(() => {
      setModalOpen(false);
    }, 5000);
  };

  return <StyledRandomTrackInCategory onClick={handleClick} />;
};
