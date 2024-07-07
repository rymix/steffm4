import type {
  StyledMixRowProps,
  StyledTrackListMiniProps,
} from "components/MixList/types";
import styled from "styled-components";

export const StyledMixList = styled.div``;

export const StyledMixRow = styled.div<StyledMixRowProps>`
  border-left: 12px solid transparent;
  display: grid;
  grid-template-columns: 40px 70px 1fr 40px;
  margin-bottom: 20px;

  ${(props) =>
    props.$on &&
    `
      border-left: 12px solid #3af;
    `}
`;

export const StyledMixPlay = styled.div`
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const StyledMixCoverArt = styled.div`
  cursor: pointer;
`;

export const StyledMixCoverArtImage = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
`;

export const StyledMixInfoBlock = styled.div`
  cursor: pointer;
  text-align: left;
`;

export const StyledMixName = styled.div``;

export const StyledMixDetails = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

export const StyledMixExpand = styled.div`
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const StyledMixNotes = styled.div`
  margin: 0 0 0 122px;
  text-align: left;
`;

export const StyledTrackListMiniTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 12px 24px 28px 24px;
`;

export const StyledTrackListMini = styled.div<StyledTrackListMiniProps>`
  border-left: 12px solid transparent;
  display: grid;
  grid-template-columns: 40px 70px 1fr 80px;
  margin-bottom: 20px;

  ${(props) =>
    props.$on &&
    `
      border-left: 12px solid #3af;
    `}
`;

export const StyledTrackListMiniSectionNumber = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  margin-top: 6px;
  text-align: right;
`;

export const StyledTrackListMiniCoverArt = styled.div``;

export const StyledTrackListMiniCoverArtImage = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
`;

export const StyledTrackListMiniInfoBlock = styled.div`
  text-align: left;
`;

export const StyledTrackListMiniTrackName = styled.div`
  font-weight: 700;
`;

export const StyledTrackListMiniTrackRemixArtistName = styled.div``;

export const StyledTrackListMiniTrackPublisher = styled.div``;

export const StyledTrackListMiniTrackStartTime = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-align: left;
`;
