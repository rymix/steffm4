import styled from "styled-components";

export const StyledMixCardWrapper = styled.div``;

export const StyledMixCard = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledCoverArt = styled.div`
  width: 180px;
  flex-shrink: 0;
  justify-self: center;

  @media (max-width: 768px) {
    width: 100px;
  }
`;

export const StyledCoverArtImage = styled.img`
  border-radius: 50%;
  height: 140px;
  width: 140px;

  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
  }
`;

export const StyledMixInfo = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
  }
`;

export const StyledMixName = styled.div`
  font-size: 26px;
  font-weight: 700;
`;

export const StyledCategoryName = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

export const StyledDuration = styled.div``;

export const StyledReleaseDate = styled.div``;

export const StyledCategory = styled.div`
  font-size: 16px;
`;

export const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: left;
`;

export const StyledTag = styled.div`
  background: darkgray;
  border-radius: 8px;
  display: inline-block;
  font-size: 14px;
  padding: 4px 8px;
`;

export const StyledNotes = styled.div`
  font-size: 16px;

  @media (max-width: 768px) {
  }
`;

export const StyledCategoryTags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 768px) {
  }
`;

export const StyledSubDetails = styled.div`
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: row;
  font-size: 14px;
  gap: 10px;
  margin: 10px 0;

  @media (max-width: 768px) {
  }
`;
