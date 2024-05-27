import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledTrackFlow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
`;

export const StyledCovers = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 240px;
`;

export const StyledAnimationItem = styled(motion.div)`
  height: 200px;
  width: 200px;
`;
