import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";

import { StyledShareMessageProps } from "components/Share/types";

export const StyledShareWrapper = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  transition: color 0.2s ease-in-out;
`;

export const TooltipContainer = styled.div`
  position: absolute;
  top: 0;
  right: -200px;
  transform: translateY(-40px);
  z-index: 101;
`;

export const StyledShareIcon = styled(ShareIcon)`
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const StyledShareMessage = styled.div<StyledShareMessageProps>`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth effect */
  padding: 10px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;

  ${(props) =>
    props.$visible &&
    `
      opacity: 1;
      visibility: visible;
    `};

  ${(props) =>
    props.$fading &&
    !props.$visible &&
    `
      opacity: 0;
      visibility: visible;
      transition: opacity 1s ease-in-out;
    `};
`;
