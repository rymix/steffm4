import TrackCard from "components/TrackCard";
import {
  StyledAnimationItem,
  StyledCovers,
  StyledTrackFlow,
} from "components/TrackFlow/StyledTrackFlow";
import { useMixcloud } from "contexts/mixcloud";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const TrackSingle: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);

  const { mcKey, mix, track } = useMixcloud();
  const { sectionNumber } = track;

  useEffect(() => {
    setTracks(mix?.details?.tracks || []);
  }, [mix?.details]);

  const renderCovers = (): JSX.Element => {
    const currentTrack =
      tracks.find((t) => t.sectionNumber === sectionNumber) || null;

    return (
      <>
        {currentTrack && (
          <AnimatePresence initial={false}>
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

export default TrackSingle;
