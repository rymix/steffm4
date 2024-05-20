import styled from "styled-components";

export const StyledCurrentTrack = styled.div`
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  text-align: left;
`;

export const StyledCoverArt = styled.div`
  width: 140px;
  flex-shrink: 0;
`;

export const StyledCoverArtImage = styled.img`
  border-radius: 50%;
  width: 140px;
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
