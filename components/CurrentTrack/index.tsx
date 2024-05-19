import type { CatalogueProps } from "components/Catalogue/types";
import {
  StyledCurrentTrack,
  StyledTrackDetail,
} from "components/CurrentTrack/StyledCurrentTrack";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const CurrentTrack: React.FC<CatalogueProps> = () => {
  const { mix, track } = useMixcloud();
  const currentTrack = mix?.details?.tracks.find(
    (t) => t.sectionNumber === track.sectionNumber,
  );

  if (!currentTrack) {
    return <StyledCurrentTrack>Loading...</StyledCurrentTrack>;
  }

  return (
    <StyledCurrentTrack>
      <StyledTrackDetail>
        <strong>Title:</strong> {currentTrack.trackName}
      </StyledTrackDetail>
      <StyledTrackDetail>
        <strong>Artist:</strong> {currentTrack.artistName}
      </StyledTrackDetail>
      <StyledTrackDetail>
        <strong>Start Time:</strong> {currentTrack.startTime}
      </StyledTrackDetail>
      <StyledTrackDetail>
        <strong>Progress:</strong> {track.progress} seconds
      </StyledTrackDetail>
      <StyledTrackDetail>
        <strong>Progress Percent:</strong> {track.progressPercent}%
      </StyledTrackDetail>
    </StyledCurrentTrack>
  );
};

export default CurrentTrack;
