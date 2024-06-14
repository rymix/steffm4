import type { CatalogueProps } from "components/Catalogue/types";
import { StyledMixCard } from "components/MixCard/StyledMixCard";
import TrackList from "components/TrackList";
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

  return (
    <>
      <ul>
        <li>{coverArtLarge}</li>
        <li>{duration}</li>
        <li>{name}</li>
        <li>{notes}</li>
        <li>{releaseDate}</li>
      </ul>
      <TrackList />
    </>
  );
};

export default MixInformation;
