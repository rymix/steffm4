import styled from "styled-components";

export const StyledTrackList = styled.div`
  position: relative;
`;

export const StyledTrackItem = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 2fr 4fr 1fr;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const StyledCoverArtWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-right: 20px;
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 10px;
`;

export const StyledSectionNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StyledTrackTitle = styled.div`
  font-weight: 700;
`;

export const StyledTrackArtist = styled.div``;

export const StyledTrackPublisher = styled.div``;

export const StyledTrackStartTime = styled.div`
  font-size: 14px;
`;

export const StyledTrackSectionNumber = styled.div`
  font-size: 72px;
  font-weight: 700;
  color: #f5f5f5;
`;

export const StyledTrackCoverArt = styled.div`
  width: 120px;
  flex-shrink: 0;
  justify-self: center;

  @media (max-width: 768px) {
    justify-self: center;
  }
`;

export const StyledTrackCoverArtImage = styled.img`
  border-radius: 50%;
  height: 80px;
  width: 80px;
`;
