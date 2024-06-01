import {
  StyledArtistName,
  StyledCoverArt,
  StyledCoverArtImage,
  StyledCurrentTrack,
  StyledPublisher,
  StyledRemixArtistName,
  StyledTrack,
  StyledTrackContainer,
  StyledTrackName,
} from "components/TrackCard/StyledTrackCard";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const CurrentTrack: React.FC = () => {
  const { mix, track } = useMixcloud();
  const tracks = mix?.details?.tracks || [];
  const currentIndex = tracks.findIndex(
    (t) => t.sectionNumber === track.sectionNumber,
  );

  if (currentIndex === -1) {
    return <StyledCurrentTrack>Loading...</StyledCurrentTrack>;
  }

  const previousTrack = currentIndex > 0 ? tracks[currentIndex - 1] : null;
  const nextTrack =
    currentIndex < tracks.length - 1 ? tracks[currentIndex + 1] : null;

  return (
    <StyledTrackContainer>
      {previousTrack && (
        <StyledTrack style={{ transform: "scale(0.8)", opacity: 0.5 }}>
          <StyledCoverArt>
            <StyledCoverArtImage
              src={previousTrack.coverArtLarge}
              alt={previousTrack.trackName}
            />
          </StyledCoverArt>
          <StyledTrackName>{previousTrack.trackName}</StyledTrackName>
          {previousTrack.artistName && (
            <StyledArtistName>{previousTrack.artistName}</StyledArtistName>
          )}
          {previousTrack.remixArtistName && (
            <StyledRemixArtistName>
              {previousTrack.remixArtistName}
            </StyledRemixArtistName>
          )}
          {previousTrack.publisher && (
            <StyledPublisher>{previousTrack.publisher}</StyledPublisher>
          )}
        </StyledTrack>
      )}

      <StyledCurrentTrack>
        {tracks[currentIndex].coverArtLarge && (
          <StyledCoverArt>
            <StyledCoverArtImage
              src={tracks[currentIndex].coverArtLarge}
              alt={tracks[currentIndex].trackName}
            />
          </StyledCoverArt>
        )}
        <StyledTrackName>{tracks[currentIndex].trackName}</StyledTrackName>
        {tracks[currentIndex].artistName && (
          <StyledArtistName>{tracks[currentIndex].artistName}</StyledArtistName>
        )}
        {tracks[currentIndex].remixArtistName && (
          <StyledRemixArtistName>
            {tracks[currentIndex].remixArtistName}
          </StyledRemixArtistName>
        )}
        {tracks[currentIndex].publisher && (
          <StyledPublisher>{tracks[currentIndex].publisher}</StyledPublisher>
        )}
      </StyledCurrentTrack>

      {nextTrack && (
        <StyledTrack style={{ transform: "scale(0.8)", opacity: 0.5 }}>
          <StyledCoverArt>
            <StyledCoverArtImage
              src={nextTrack.coverArtLarge}
              alt={nextTrack.trackName}
            />
          </StyledCoverArt>
          <StyledTrackName>{nextTrack.trackName}</StyledTrackName>
          {nextTrack.artistName && (
            <StyledArtistName>{nextTrack.artistName}</StyledArtistName>
          )}
          {nextTrack.remixArtistName && (
            <StyledRemixArtistName>
              {nextTrack.remixArtistName}
            </StyledRemixArtistName>
          )}
          {nextTrack.publisher && (
            <StyledPublisher>{nextTrack.publisher}</StyledPublisher>
          )}
        </StyledTrack>
      )}
    </StyledTrackContainer>
  );
};

export default CurrentTrack;
