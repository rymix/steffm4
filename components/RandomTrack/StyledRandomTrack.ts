import ShuffleIcon from "@mui/icons-material/Shuffle";
import styled from "styled-components";

export const StyledRandomTrackWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
`;

export const StyledRandomTrackLabel = styled.span<{ $visible: boolean }>`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

export const StyledRandomTrack = styled(ShuffleIcon)`
  color: ${({ theme }) => theme.colors.socials.randomTrack};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.socials.randomTrackHover};
  }
`;
