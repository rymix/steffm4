import MixCard from "components/MixCard";
import { StyledMixCard } from "components/MixCard/StyledMixCard";
import TrackList from "components/TrackList";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

import { StyledTrackListTitle } from "./StyledMixInformation";

export const MixInformation: React.FC = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  if (!mixDetails) {
    return <StyledMixCard>Loading...</StyledMixCard>;
  }

  return (
    <>
      <MixCard category />
      <StyledTrackListTitle />
      <TrackList />
    </>
  );
};

export default MixInformation;
