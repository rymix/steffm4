import CircularProgress from "@mui/material/CircularProgress";
import {
  StyledTrackListMini,
  StyledTrackListMiniCoverArt,
  StyledTrackListMiniCoverArtImage,
  StyledTrackListMiniInfoBlock,
  StyledTrackListMiniSectionNumber,
  StyledTrackListMiniTitle,
  StyledTrackListMiniTrackName,
  StyledTrackListMiniTrackPublisher,
  StyledTrackListMiniTrackRemixArtistName,
  StyledTrackListMiniTrackStartTime,
} from "components/MixList/StyledMixList";
import type { TrackListMiniProps } from "components/MixList/types";
import { useMixcloud } from "contexts/mixcloud";
import type { Track } from "db/types";
import React, { useEffect, useState } from "react";
import { convertTimeToHumanReadable } from "utils/functions";

export const TrackListMini: React.FC<TrackListMiniProps> = ({ mix }) => {
  const {
    mcKey,
    setMcKey,
    controls: { handlePause, handlePlay },
    track: { sectionNumber },
    widget: { playing },
  } = useMixcloud();
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async (): Promise<void> => {
      try {
        const tracksResponse = await fetch(`/api/tracks/${mix.mixcloudKey}`);
        if (!tracksResponse.ok) throw new Error("Data fetch failed");
        let tracksData = await tracksResponse.json();
        tracksData = tracksData.sort(
          (a, b) => a.sectionNumber - b.sectionNumber,
        );
        setTracks(tracksData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}

      <StyledTrackListMiniTitle />
      {tracks.map((track: Track) => (
        <StyledTrackListMini
          key={track.sectionNumber}
          $on={
            mcKey.includes(mix.mixcloudKey) &&
            sectionNumber === track.sectionNumber
          }
        >
          <StyledTrackListMiniSectionNumber>
            {track.sectionNumber}
          </StyledTrackListMiniSectionNumber>
          <StyledTrackListMiniCoverArt>
            <StyledTrackListMiniCoverArtImage src={track.coverArtSmall} />
          </StyledTrackListMiniCoverArt>
          <StyledTrackListMiniInfoBlock key={track.sectionNumber}>
            <StyledTrackListMiniTrackName>
              {track.trackName}
            </StyledTrackListMiniTrackName>
            {track.remixArtistName && (
              <StyledTrackListMiniTrackRemixArtistName>
                {track.remixArtistName}
              </StyledTrackListMiniTrackRemixArtistName>
            )}
            {track.publisher && (
              <StyledTrackListMiniTrackPublisher>
                {track.publisher}
              </StyledTrackListMiniTrackPublisher>
            )}
          </StyledTrackListMiniInfoBlock>
          <StyledTrackListMiniTrackStartTime>
            {convertTimeToHumanReadable(track.startTime)}
          </StyledTrackListMiniTrackStartTime>
        </StyledTrackListMini>
      ))}
      <StyledTrackListMiniTitle />
    </>
  );
};

export default TrackListMini;
