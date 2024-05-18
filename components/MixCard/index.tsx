/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import type { CatalogueProps } from "components/Catalogue/types";
import { StyledMixCard } from "components/MixCard/StyledMixCard";
import { useMixcloud } from "contexts/mixcloud";

export const MixCard: React.FC<CatalogueProps> = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  return <StyledMixCard>{mixDetails?.name}</StyledMixCard>;
};

export default MixCard;
