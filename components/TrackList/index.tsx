import type { CatalogueProps } from "components/Catalogue/types";
import {
  StyledContentWrapper,
  StyledCoverArtWrapper,
  StyledSectionNumberWrapper,
  StyledTrackArtist,
  StyledTrackCoverArt,
  StyledTrackCoverArtImage,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackPublisher,
  StyledTrackSectionNumber,
  StyledTrackStartTime,
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
            <StyledCoverArtWrapper>
              {track.coverArtLarge && (
                <StyledTrackCoverArt>
                  <StyledTrackCoverArtImage
                    src={track.coverArtLarge}
                    alt={track.trackName}
                  />
                </StyledTrackCoverArt>
              )}
            </StyledCoverArtWrapper>
            <StyledContentWrapper>
              <StyledTrackTitle>{track.trackName}</StyledTrackTitle>
              <StyledTrackArtist>{track.artistName}</StyledTrackArtist>
              <StyledTrackPublisher>{track.publisher}</StyledTrackPublisher>
              <StyledTrackStartTime>{track.startTime}</StyledTrackStartTime>
            </StyledContentWrapper>
            <StyledSectionNumberWrapper>
              <StyledTrackSectionNumber>
                {track.sectionNumber}
              </StyledTrackSectionNumber>
            </StyledSectionNumberWrapper>
          </StyledTrackItem>
        ))
      ) : (
        <div>No tracks available.</div>
      )}
    </StyledTrackList>
  );
};

export default TrackList;
