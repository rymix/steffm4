import type {
  StyledMixListCategoryProps,
  StyledMixRowProps,
  StyledToggleProps,
  StyledTrackListMiniProps,
} from "components/MixList/types";
import styled from "styled-components";

export const StyledMixList = styled.div``;

export const StyledMixRow = styled.div<StyledMixRowProps>`
  border-left: 12px solid transparent;
  display: grid;
  grid-template-columns: 30px 30px 30px 30px 70px 1fr 40px;
  margin-bottom: 20px;

  ${(props) =>
    props.$listenedStatus === "active" &&
    `
      border-left: 12px solid #3af;
    `}

  ${(props) =>
    props.$listenedStatus === "unlistened" &&
    `
      border-left: 12px solid lightgrey;
    `}

  ${(props) =>
    props.$listenedStatus === "listened" &&
    `
      border-left: 12px solid green;
    `}

  ${(props) =>
    props.$listenedStatus === "partial" &&
    `
      border-left: 12px solid orange;
    `}

  @media screen and (orientation: portrait) and (max-width: 440px) {
    grid-template-columns: 20px 20px 20px 20px 50px 1fr 20px;
  }
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

export const StyledMixTags = styled.div`
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  gap: 6px;
  margin-top: 1em;
`;

export const StyledMixTag = styled.span`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 6px;
`;

export const StyledMixUploadedDate = styled.div`
  margin-top: 1em;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

export const StyledMixUploadedDateTitle = styled.div`
  margin: 2em 0 0.5em 172px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-align: left;
`;

export const StyledMixNotes = styled.div`
  margin: 0 0 0 122px;
  text-align: left;

  @media screen and (orientation: portrait) and (max-width: 440px) {
    margin: 0 0 0 80px;
  }
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

  @media screen and (orientation: portrait) and (max-width: 440px) {
    grid-template-columns: 20px 50px 1fr 20px;
  }
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

export const StyledTrackListMiniArtistName = styled.div``;

export const StyledTrackListMiniTrackRemixArtistName = styled.div``;

export const StyledTrackListMiniTrackPublisher = styled.div``;

export const StyledTrackListMiniTrackStartTime = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  text-align: left;
`;

export const StyledControls = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledToggle = styled.div<StyledToggleProps>`
  color: ${(props) =>
    props.$on || props.$default ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.5)"};
  cursor: pointer;
  margin: 0 20px 20px 20px;

  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }

  @media (max-width: 640px) {
    margin: 0 5px 20px 5px;
  }
`;

export const StyledMixListCategories = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 40px 0;
  width: 100%;
`;

export const StyledMixListCategory = styled.li<StyledMixListCategoryProps>`
  background: #e4dbcd;
  border: 1px solid #e4dbcd;
  border-radius: 20px;
  cursor: pointer;
  margin: 8px;
  padding: 8px;
  transition: background 0.2s ease-in-out;
  width: 50%;

  ${(props) =>
    props.$on &&
    `
      border: 1px solid #a59a88;
      background: #cdc1ae;
    `}

  &:hover {
    background: #ddd1be;
  }
`;

export const StyledSearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
`;

export const StyledSearchBox = styled.input`
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  width: 300px;
`;

export const StyledSearchButton = styled.button`
  background: #e4dbcd;
  border: 1px solid #e4dbcd;
  border-radius: 20px;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  width: 60px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #ddd1be;
    border: 1px solid #a59a88;
  }
`;

export const StyledNoResults = styled.div`
  margin: 20px 0;
`;

export const StyledUnknownTracksContainer = styled.div`
  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;
