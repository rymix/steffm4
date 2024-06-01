import styled from "styled-components";

export const StyledMixCardWrapper = styled.div`
  /* background: linear-gradient(
    180deg,
    transparent 0%,
    transparent calc(100% - 200px),
    rgba(0, 0, 0, 0.6) 100%
  ); */
  margin-top: 30px;
  min-height: 200px;

  color: black;
  text-shadow:
    0 0 2px rgba(255, 255, 255, 0.2),
    0 0 4px rgba(255, 255, 255, 0.3);
`;

export const StyledMixCard = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
  gap: 20px;
  margin: auto;
  max-width: 768px;
  padding: 20px;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center; // Center text in collapsed mode
    align-items: center; // Center all items vertically
  }
`;

export const StyledCoverArt = styled.div`
  width: 180px;
  flex-shrink: 0;
  justify-self: center;

  @media (max-width: 768px) {
    justify-self: center; // Center the image in collapsed mode
  }
`;

export const StyledCoverArtImage = styled.img`
  border-radius: 50%;
  box-shadow: 0px 20px 20px -10px rgba(0, 0, 0, 0.5);
  height: 140px;
  width: 140px;
`;

export const StyledMixInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 768px) {
    align-items: center; // Center mix info in collapsed mode
  }
`;

export const StyledMixName = styled.div`
  font-size: 20px;
  font-weight: 700;
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
  justify-content: center; // Center tags in collapsed mode
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
    text-align: center; // Center notes text in collapsed mode
  }
`;

export const StyledCategoryTags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 768px) {
    align-items: center; // Center category and tags in collapsed mode
  }
`;

export const StyledSubDetails = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center; // Center sub details in collapsed mode
  }
`;

export const StyledSocials = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-end;
`;
