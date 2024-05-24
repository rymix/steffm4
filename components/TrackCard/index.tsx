import {
  StyledArtistName,
  StyledCoverArt,
  StyledCoverArtImage,
  StyledCurrentTrack,
  StyledPublisher,
  StyledRemixArtistName,
  StyledTrackContainer,
  StyledTrackName,
} from "components/CurrentTrack/StyledCurrentTrack";
import type { TrackCardProps } from "components/TrackCard/types";
import React from "react";

export const TrackCard: React.FC<TrackCardProps> = (
  artistName: string,
  coverArt: string,
  publisher: string;
  remixArtistName: string,
  trackName: string,
) => {
  return (
    <StyledTrackContainer>
      <StyledCurrentTrack>
        <StyledCoverArt>
          <StyledCoverArtImage src={coverArt} alt={trackName} />
        </StyledCoverArt>
        <StyledTrackName>{trackName}</StyledTrackName>
        {artistName && <StyledArtistName>{artistName}</StyledArtistName>}
        {remixArtistName && (
          <StyledRemixArtistName>{remixArtistName}</StyledRemixArtistName>
        )}
        {publisher && (
          <StyledPublisher>{publisher}</StyledPublisher>
        )}
      </StyledCurrentTrack>
    </StyledTrackContainer>
  );
};

export default TrackCard;
