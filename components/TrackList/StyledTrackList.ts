import type { StyledTrackItemProps } from "components/TrackList/types";
import styled from "styled-components";

export const StyledTrackListWrapper = styled.div`
  position: relative;
`;

export const StyledTrackList = styled.div``;

export const StyledTrackItem = styled.div<StyledTrackItemProps>`
  border-left: 12px solid transparent;
  display: flex;
  flex-direction: row;
  margin: 24px 0;

  ${(props) =>
    props.$on &&
    `
      border-left: 12px solid #3af;
    `}
`;

export const StyledTrackCoverArt = styled.div`
  width: 180px;
  flex-shrink: 0;
  justify-self: center;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const StyledTrackCoverArtImage = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;

  @media (max-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: left;
`;

export const StyledSectionNumberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100px;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

export const StyledTrackTitle = styled.div`
  font-weight: 700;
`;

export const StyledTrackArtist = styled.div``;

export const StyledTrackPublisher = styled.div``;

export const StyledTrackStartTime = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  margin: 10px 0;
`;

export const StyledTrackSectionNumber = styled.div`
  font-size: 72px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.05);
  text-align: right;
`;
