import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledMotion = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
`;

export const StyledButtons = styled.div`
  background: yellow;
`;

export const StyledCovers = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 400px;
`;

export const StyledAnimationItem = styled(motion.div)`
  background: grey;
  height: 200px;
  width: 200px;
`;
