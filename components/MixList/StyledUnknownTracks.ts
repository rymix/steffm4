import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styled from "styled-components";

export const StyledUnknownTracks = styled.div`
  margin: 20px;
`;

export const StyledUnknownTrack = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr 30px;
  place-items: center center;
  margin-bottom: 10px;

  img {
    border-radius: 50%;
    width: 100px;
  }
`;

export const StyledUnknownTrackMix = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  place-items: center center;
  margin-bottom: 60px;

  img {
    border-radius: 50%;
    width: 50px;
  }

  div {
    display: flex;
    justify-self: start;
    width: 100%;
  }
`;

export const StyledUnknownTrackDetails = styled.div`
  justify-items: start;
  width: 100%;
  display: grid;
  grid-template-columns: 120px 1fr;
`;

export const StyledTrackPlay = styled(PlayArrowIcon)`
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const StyledTrackPause = styled(PauseIcon)`
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;
