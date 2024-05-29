import TrackCard from "components/TrackCard";
import {
  StyledAnimationItem,
  StyledCovers,
  StyledTrackFlow,
} from "components/TrackFlow/StyledTrackFlow";
import { useMixcloud } from "contexts/mixcloud";
import type { Track } from "db/types";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const TrackFlow: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);

  const { mcKey, mix, track } = useMixcloud();
  const { sectionNumber } = track;

  useEffect(() => {
    setTracks(mix?.details?.tracks || []);
  }, [mix?.details]);

  const albumArt = "/images/1x1.png";

  const renderCovers = (): JSX.Element => {
    const dummyPreviousItem: Track = {
      artistName: "",
      coverArtDate: "",
      coverArtLarge: albumArt,
      coverArtSmall: albumArt,
      publisher: "",
      remixArtistName: "",
      sectionNumber: -1,
      startTime: "",
      trackName: "",
    };

    const dummyNextItem: Track = dummyPreviousItem;

    const currentTrack =
      tracks.find((t) => t.sectionNumber === sectionNumber) || null;

    const previousTrack =
      tracks.find((t) => t.sectionNumber === sectionNumber - 1) ||
      dummyPreviousItem;

    const nextTrack =
      tracks.find((t) => t.sectionNumber === sectionNumber + 1) ||
      dummyNextItem;

    return (
      <>
        {currentTrack && (
          <AnimatePresence initial={false}>
            <StyledAnimationItem
              key={`${mcKey}${previousTrack.sectionNumber}`}
              initial={{ opacity: 0, x: -100, scale: 0.4 }}
              animate={{ opacity: 0.6, x: -300, scale: 0.6 }}
              exit={{ opacity: 0, x: -400, scale: 0.4 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", zIndex: 1 }}
            >
              <TrackCard
                artistName={previousTrack.artistName}
                coverArt={previousTrack.coverArtLarge}
                publisher={previousTrack.publisher}
                remixArtistName={previousTrack.remixArtistName}
                trackName={previousTrack.trackName}
              />
            </StyledAnimationItem>
            <StyledAnimationItem
              key={`${mcKey}${currentTrack.sectionNumber}`}
              initial={{ opacity: 0, x: 150, scale: 0.4 }}
              animate={{ opacity: 1, x: -50, scale: 1 }}
              exit={{ opacity: 0, x: -200, scale: 0.4 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", zIndex: 2 }}
            >
              <TrackCard
                artistName={currentTrack.artistName}
                coverArt={currentTrack.coverArtLarge}
                publisher={currentTrack.publisher}
                remixArtistName={currentTrack.remixArtistName}
                trackName={currentTrack.trackName}
              />
            </StyledAnimationItem>
            <StyledAnimationItem
              key={`${mcKey}${nextTrack.sectionNumber}`}
              initial={{ opacity: 0, x: 440, scale: 0.4 }}
              animate={{ opacity: 0.6, x: 240, scale: 0.6 }}
              exit={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", zIndex: 1 }}
            >
              <TrackCard
                artistName={nextTrack.artistName}
                coverArt={nextTrack.coverArtLarge}
                publisher={nextTrack.publisher}
                remixArtistName={nextTrack.remixArtistName}
                trackName={nextTrack.trackName}
              />
            </StyledAnimationItem>
          </AnimatePresence>
        )}
      </>
    );
  };

  return (
    <StyledTrackFlow>
      <StyledCovers>
        <AnimatePresence initial={false}>{renderCovers()}</AnimatePresence>
      </StyledCovers>
    </StyledTrackFlow>
  );
};

export default TrackFlow;
