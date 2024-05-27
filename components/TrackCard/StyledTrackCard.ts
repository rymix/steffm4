import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledTrackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  gap: 20px;
  max-width: 300px;
  min-width: 300px;
`;

export const StyledTrack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.3s,
    opacity 0.3s;
`;

export const StyledCurrentTrack = styled(StyledTrack)`
  transform: scale(1);
  opacity: 1;
`;

export const StyledCoverArt = styled.div`
  width: 140px;
  flex-shrink: 0;
`;

export const StyledCoverArtImage = styled.img`
  border-radius: 50%;
  width: 140px;
  height: 140px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;

export const StyledTrackName = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const StyledArtistName = styled.div`
  font-size: 16px;
`;

export const StyledRemixArtistName = styled.div`
  font-size: 16px;
`;

export const StyledPublisher = styled.div`
  font-size: 16px;
`;
