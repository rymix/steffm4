import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledTrackFlow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 280px;

  color: black;
  text-shadow:
    0 0 2px rgba(255, 255, 255, 0.2),
    0 0 4px rgba(255, 255, 255, 0.3);
`;

export const StyledCovers = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const StyledAnimationItem = styled(motion.div)`
  height: 200px;
  width: 200px;
`;
