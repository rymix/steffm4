import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const CoverFlowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 400px; /* Adjust this value according to your needs */
  position: relative;
`;

const Cover = styled(motion.div)`
  position: absolute;
  transition:
    transform 0.5s,
    opacity 0.5s;

  &.active {
    transform: scale(1);
    opacity: 1;
  }

  &.inactive {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const CoverFlow = ({
  albumCovers,
  initialTrackIndex = 0,
  precedingTracks = 1,
  followingTracks = 1,
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentTrackIndex((prevIndex) =>
      Math.min(prevIndex + 1, albumCovers.length - 1),
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentTrackIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const renderCovers = () => {
    const start = Math.max(0, currentTrackIndex - precedingTracks);
    const end = Math.min(
      albumCovers.length,
      currentTrackIndex + followingTracks + 1,
    );
    const coversToRender = albumCovers.slice(start, end);

    return coversToRender.map((cover, index) => {
      const position = index + start - currentTrackIndex;
      const isActive = position === 0;
      const initialX = position > 0 ? 200 : -200;
      const exitX = direction === 1 ? -200 : 200;

      return (
        <Cover
          key={cover.id}
          className={isActive ? "active" : "inactive"}
          initial={{
            opacity: 0,
            x: initialX,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            x: position * 100,
            scale: isActive ? 1 : 0.8,
          }}
          exit={{
            opacity: 0,
            x: exitX,
            scale: 0.8,
            transition: { duration: 0.5 },
          }}
          transition={{ duration: 0.5 }}
        >
          {cover.component}
        </Cover>
      );
    });
  };

  return (
    <CoverFlowContainer>
      <ControlPanel>
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
        <p>currentTrackIndex: {currentTrackIndex}</p>
      </ControlPanel>
      <AnimatePresence initial={false}>{renderCovers()}</AnimatePresence>
    </CoverFlowContainer>
  );
};

export default CoverFlow;
