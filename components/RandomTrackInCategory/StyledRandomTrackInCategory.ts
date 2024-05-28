import ShuffleIcon from "@mui/icons-material/Shuffle";
import styled from "styled-components";

export const StyledRandomTrackInCategory = styled(ShuffleIcon)`
  color: ${({ theme }) => theme.colors.socials.randomTrack};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.socials.randomTrackHover};
  }
`;
