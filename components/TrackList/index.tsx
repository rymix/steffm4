import {
  StyledContentWrapper,
  StyledSectionNumberWrapper,
  StyledTrackArtist,
  StyledTrackCoverArt,
  StyledTrackCoverArtImage,
  StyledTrackItem,
  StyledTrackList,
  StyledTrackListWrapper,
  StyledTrackPublisher,
  StyledTrackSectionNumber,
  StyledTrackStartTime,
  StyledTrackTitle,
} from "components/TrackList/StyledTrackList";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { convertTimeToHumanReadable } from "utils/functions";

export const TrackList: React.FC = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  if (!mixDetails || !mixDetails.tracks) {
    return <StyledTrackList>Loading...</StyledTrackList>;
  }

  return (
    <StyledTrackListWrapper>
      <StyledTrackList>
        {mixDetails.tracks && mixDetails.tracks.length > 0 ? (
          mixDetails.tracks.map((track) => (
            <StyledTrackItem key={track.sectionNumber}>
              {track.coverArtLarge && (
                <StyledTrackCoverArt>
                  <StyledTrackCoverArtImage
                    src={track.coverArtLarge}
                    alt={track.trackName}
                  />
                </StyledTrackCoverArt>
              )}
              <StyledContentWrapper>
                <StyledTrackTitle>{track.trackName}</StyledTrackTitle>
                <StyledTrackArtist>{track.artistName}</StyledTrackArtist>
                <StyledTrackPublisher>{track.publisher}</StyledTrackPublisher>
                <StyledTrackStartTime>
                  {convertTimeToHumanReadable(track.startTime)}
                </StyledTrackStartTime>
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
    </StyledTrackListWrapper>
  );
};

export default TrackList;
