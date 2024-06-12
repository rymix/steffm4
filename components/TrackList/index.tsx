import type { CatalogueProps } from "components/Catalogue/types";
import {
  StyledTrackArtist,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackTitle,
} from "components/TrackList/StyledTrackList";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const TrackList: React.FC<CatalogueProps> = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  if (!mixDetails || !mixDetails.tracks) {
    return <StyledTrackList>Loading...</StyledTrackList>;
  }

  return (
    <StyledTrackList>
      {mixDetails.tracks && mixDetails.tracks.length > 0 ? (
        mixDetails.tracks.map((track) => (
          <StyledTrackItem key={track.sectionNumber}>
            <StyledTrackTitle>{track.trackName}</StyledTrackTitle>
            <StyledTrackArtist>{track.artistName}</StyledTrackArtist>
          </StyledTrackItem>
        ))
      ) : (
        <div>No tracks available.</div>
      )}
    </StyledTrackList>
  );
};

export default TrackList;
