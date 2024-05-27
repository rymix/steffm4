import {
  StyledAnimationItem,
  StyledCovers,
  StyledMotion,
} from "components/Motion/StyledMotion";
import { useMixcloud } from "contexts/mixcloud";
import type { Track } from "db/types";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const Motion: React.FC = () => {
  const [tracks, setTracks] = useState<any[]>([]);

  const { mcKey, mix, track } = useMixcloud();
  const { sectionNumber } = track;

  useEffect(() => {
    console.log("mix details changed");
    console.log("mix", mix);
    setTracks(mix?.details?.tracks || []);
    console.log("tracks", tracks);
  }, [mix?.details]);

  const renderCovers = () => {
    const dummyPreviousItem: Track = {
      artistName: "dummyArtistName",
      coverArtDate: "2023-12-23T22:50:22.000Z",
      coverArtLarge:
        "https://fastly.picsum.photos/id/450/200/300.jpg?hmac=EAnz3Z3i5qXfaz54l0aegp_-5oN4HTwiZG828ZGD7GM",
      coverArtSmall:
        "https://fastly.picsum.photos/id/450/200/300.jpg?hmac=EAnz3Z3i5qXfaz54l0aegp_-5oN4HTwiZG828ZGD7GM",
      publisher: "dummyPublisher",
      remixArtistName: "dummyRemixArtistName",
      sectionNumber: -1,
      startTime: "00:00",
      trackName: "dummyTrackName",
    };

    const dummyNextItem: Track = {
      artistName: "dummyArtistName",
      coverArtDate: "2023-12-23T22:50:22.000Z",
      coverArtLarge:
        "https://fastly.picsum.photos/id/450/200/300.jpg?hmac=EAnz3Z3i5qXfaz54l0aegp_-5oN4HTwiZG828ZGD7GM",
      coverArtSmall:
        "https://fastly.picsum.photos/id/450/200/300.jpg?hmac=EAnz3Z3i5qXfaz54l0aegp_-5oN4HTwiZG828ZGD7GM",
      publisher: "dummyPublisher",
      remixArtistName: "dummyRemixArtistName",
      sectionNumber: 9999,
      startTime: "00:00",
      trackName: "dummyTrackName",
    };

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
              initial={{ opacity: 0, x: 0, scale: 0.4 }}
              animate={{ opacity: 0.6, x: -200, scale: 0.6 }}
              exit={{ opacity: 0, x: -400, scale: 0.4 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute" }}
            >
              {previousTrack.artistName}
            </StyledAnimationItem>
            <StyledAnimationItem
              key={`${mcKey}${currentTrack.sectionNumber}`}
              initial={{ opacity: 0, x: 200, scale: 0.4 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -200, scale: 0.4 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute" }}
            >
              {currentTrack.artistName}
            </StyledAnimationItem>
            <StyledAnimationItem
              key={`${mcKey}${nextTrack.sectionNumber}`}
              initial={{ opacity: 0, x: 400, scale: 0.4 }}
              animate={{ opacity: 0.6, x: 200, scale: 0.6 }}
              exit={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute" }}
            >
              {nextTrack.artistName}
            </StyledAnimationItem>
          </AnimatePresence>
        )}
      </>
    );
  };

  return (
    <StyledMotion>
      <StyledCovers>
        <AnimatePresence initial={false}>{renderCovers()}</AnimatePresence>
      </StyledCovers>
    </StyledMotion>
  );
};

export default Motion;
