import TrackCard from "components/TrackCard";
import { useMixcloud } from "contexts/mixcloud";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ControlPanel, CoverFlowContainer } from "./types";

const CoverFlow = () => {
  const { mix, track } = useMixcloud();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentSectionNumber, setCurrentSectionNumber] = useState(
    track.sectionNumber,
  );

  useEffect(() => {
    console.log("mix details changed");
    setTracks(mix?.details?.tracks || []);
  }, [mix?.details]);

  useEffect(() => {
    console.log("track sectionNumber changed");
    setCurrentSectionNumber(track.sectionNumber);
  }, [track.sectionNumber]);

  const animationSettings = {
    initialX: 300,
    exitX: -300,
  };

  const renderCovers = () => {
    const start = Math.max(0, currentSectionNumber - 2);
    const end = Math.min(tracks.length, currentSectionNumber + 1);
    const coversToRender = tracks.slice(start, end);

    return coversToRender.map((cover, index) => {
      const position = start + index + 1 - currentSectionNumber;
      const isActive = position === 0;
      const uniqueKey = `${cover.artistName}-${cover.trackName}-${
        start + index
      }`; // Ensure a unique key

      return (
        <motion.div
          key={uniqueKey} // Ensure each key is unique
          initial={{
            opacity: position === 1 ? 0.1 : 1,
            x: position === 1 ? animationSettings.initialX : 0,
            scale: 0.4,
          }}
          animate={{
            opacity: isActive ? 1 : 0.6,
            x: position * -100,
            scale: isActive ? 1 : 0.8,
          }}
          exit={{
            opacity: 0.1,
            x: animationSettings.exitX,
            scale: 0.4,
            transition: { duration: 0.5 },
          }}
          transition={{ duration: 0.5 }}
        >
          <TrackCard
            artistName={cover.artistName}
            coverArt={cover.coverArtLarge}
            publisher={cover.publisher}
            remixArtistName={cover.remixArtistName}
            trackName={cover.trackName}
            className={isActive ? "active" : "inactive"}
          />
        </motion.div>
      );
    });
  };

  return (
    <CoverFlowContainer>
      <ControlPanel />
      <AnimatePresence initial={false}>{renderCovers()}</AnimatePresence>
    </CoverFlowContainer>
  );
};

export default CoverFlow;
