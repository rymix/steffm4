import type { CatalogueProps } from "components/Catalogue/types";
import { StyledMixCard } from "components/MixCard/StyledMixCard";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const MixInformation: React.FC<CatalogueProps> = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  if (!mixDetails) {
    return <StyledMixCard>Loading...</StyledMixCard>;
  }

  const { coverArtLarge, duration, name, notes, releaseDate } = mixDetails;

  return <p>farts</p>;
};

export default MixInformation;
