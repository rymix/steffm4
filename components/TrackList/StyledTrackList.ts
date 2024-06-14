import styled from "styled-components";

export const StyledTrackList = styled.div`
  background: lightblue;
  position: relative;
`;

export const StyledTrackItem = styled.div``;

export const StyledTrackTitle = styled.div``;

export const StyledTrackArtist = styled.div``;

export const StyledTrackPublisher = styled.div``;

export const StyledTrackStartTime = styled.div``;

export const StyledTrackSectionNumber = styled.div``;

export const StyledTrackCoverArt = styled.div`
  width: 180px;
  flex-shrink: 0;
  justify-self: center;

  @media (max-width: 768px) {
    justify-self: center; // Center the image in collapsed mode
  }
`;

export const StyledTrackCoverArtImage = styled.img`
  border-radius: 50%;
  height: 140px;
  width: 140px;
`;
