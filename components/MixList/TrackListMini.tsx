import CircularProgress from "@mui/material/CircularProgress";
import {
  StyledTrackListMini,
  StyledTrackListMiniArtistName,
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
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Highlight from "react-highlight-words";
import { convertTimeToHumanReadable } from "utils/functions";

export const TrackListMini: React.FC<TrackListMiniProps> = ({
  mix,
  highlight,
}) => {
  const {
    mcKey,
    track: { sectionNumber },
  } = useMixcloud();
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async (): Promise<void> => {
      try {
        const tracksResponse = await fetch(`/api/tracks/${mix.mixcloudKey}`);
        if (!tracksResponse.ok) throw new Error("Data fetch failed");
        let tracksData = await tracksResponse.json();

        tracksData = _.orderBy(tracksData, ["sectionNumber"], ["asc"]);

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
            <StyledTrackListMiniCoverArtImage src={track.localCoverArtSmall} />
          </StyledTrackListMiniCoverArt>
          <StyledTrackListMiniInfoBlock key={track.sectionNumber}>
            <StyledTrackListMiniTrackName>
              <Highlight
                searchWords={highlight ? [highlight] : []}
                autoEscape
                textToHighlight={track.trackName}
              />
            </StyledTrackListMiniTrackName>
            <StyledTrackListMiniArtistName>
              <Highlight
                searchWords={highlight ? [highlight] : []}
                autoEscape
                textToHighlight={track.artistName}
              />
            </StyledTrackListMiniArtistName>
            {track.remixArtistName && (
              <StyledTrackListMiniTrackRemixArtistName>
                <Highlight
                  searchWords={highlight ? [highlight] : []}
                  autoEscape
                  textToHighlight={track.remixArtistName}
                />
              </StyledTrackListMiniTrackRemixArtistName>
            )}
            {track.publisher && (
              <StyledTrackListMiniTrackPublisher>
                <Highlight
                  searchWords={highlight ? [highlight] : []}
                  autoEscape
                  textToHighlight={track.publisher}
                />
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
