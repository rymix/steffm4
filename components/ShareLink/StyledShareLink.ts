import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";

export const StyledShareLink = styled(ShareIcon)`
  color: ${({ theme }) => theme.colors.socials.randomTrack};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.socials.randomTrackHover};
  }
`;
