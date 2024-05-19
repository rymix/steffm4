import type { CatalogueProps } from "components/Catalogue/types";
import {
  StyledArtistName,
  StyledCoverArt,
  StyledCoverArtImage,
  StyledCurrentTrack,
  StyledPublisher,
  StyledRemixArtistName,
  StyledTrackName,
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
      {currentTrack.coverArtLarge && (
        <StyledCoverArt>
          <StyledCoverArtImage
            src={currentTrack.coverArtLarge}
            alt={currentTrack.trackName}
          />
        </StyledCoverArt>
      )}
      <StyledTrackName>{currentTrack.trackName}</StyledTrackName>

      {currentTrack.artistName && (
        <StyledArtistName>{currentTrack.artistName}</StyledArtistName>
      )}

      {currentTrack.remixArtistName && (
        <StyledRemixArtistName>
          {currentTrack.remixArtistName}
        </StyledRemixArtistName>
      )}

      {currentTrack.publisher && (
        <StyledPublisher>{currentTrack.publisher}</StyledPublisher>
      )}
    </StyledCurrentTrack>
  );
};

export default CurrentTrack;
