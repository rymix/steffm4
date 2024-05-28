import {
  StyledRandomTrackInCategory,
  StyledRandomTrackInCategoryLabel,
  StyledRandomTrackInCategoryWrapper,
} from "components/RandomTrackInCategory/StyledRandomTrackInCategory";
import { useMixcloud } from "contexts/mixcloud";
import { useState } from "react";

export const RandomTrackInCategory: React.FC = () => {
  const {
    controls: { fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory },
  } = useMixcloud();
  const [showLabel, setShowLabel] = useState(false);
  const [label, setLabel] = useState(`Random ${selectedCategory} mix`);

  const handleClick = async (): Promise<void> => {
    handleLoad(await fetchRandomMcKeyByCategory(selectedCategory));
    setLabel("Enjoy!");
    setTimeout(() => {
      setLabel(`Random ${selectedCategory} mix`);
    }, 2000);
  };

  return (
    <StyledRandomTrackInCategoryWrapper
      onClick={handleClick}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <StyledRandomTrackInCategoryLabel $visible={showLabel}>
        {label}
      </StyledRandomTrackInCategoryLabel>
      <StyledRandomTrackInCategory />
    </StyledRandomTrackInCategoryWrapper>
  );
};
