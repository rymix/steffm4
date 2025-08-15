import styled from "styled-components";

export const StyledMixTitle = styled.h2`
  margin-bottom: 40px;
  font-size: 24px;
  text-align: center;
  line-height: 1.2;

  @media screen and (orientation: landscape) and (max-height: 500px) {
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

export const StyledSubtitle = styled.p`
  margin-top: 20px;
  opacity: 0.8;
  text-align: center;
  font-size: 14px;

  @media screen and (orientation: landscape) and (max-height: 500px) {
    margin-top: 10px;
    font-size: 12px;
  }
`;

export const StyledDrivingMode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  height: 100%;
  position: relative;

  /* Landscape mode adjustments */
  @media screen and (orientation: landscape) and (max-height: 500px) {
    padding: 20px 20px;
    justify-content: space-evenly;
  }
`;

export const StyledButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  place-items: center center;

  /* Landscape mode - 4 buttons in a row */
  @media screen and (orientation: landscape) and (max-height: 500px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 600px;
  }

  @media screen and (max-width: 480px) {
    gap: 20px;
  }

  /* Portrait mode on mobile keeps 2x2 grid */
  @media screen and (orientation: portrait) and (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;
