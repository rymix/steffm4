import { StyledRandomTrackInCategory } from "components/RandomTrackInCategory/StyledRandomTrackInCategory";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";

export const RandomTrackInCategory: React.FC = () => {
  const {
    controls: { fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory },
  } = useMixcloud();
  const { openModal } = useSession();

  const categoryName = async (): Promise<string | undefined> => {
    if (!selectedCategory) return undefined;

    const response = await fetch(`/api/category/${selectedCategory}`);
    const data: string = await response.json();
    return data;
  };

  const handleClick = async (): Promise<void> => {
    const categoryNameValue = await categoryName();
    handleLoad(await fetchRandomMcKeyByCategory(selectedCategory));
    openModal(<p>Playing a random {categoryNameValue} track</p>, null, 4);
  };

  return <StyledRandomTrackInCategory onClick={handleClick} />;
};
