import styled from "styled-components";

export const StyledDx7Controls = styled.div`
  display: flex;
  min-width: 480px;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0;

  /* Medium breakpoint: 900px - allow wrapping */
  @media (max-width: 900px) {
    min-width: unset;
    flex-wrap: wrap;
    max-width: 100%;
  }

  /* Mobile breakpoint: flexible wrapping */
  @media (max-width: 768px) {
    min-width: unset;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
  }

  /* Mobile portrait: stack vertically in 2 columns */
  @media (max-width: 768px) and (orientation: portrait) {
    flex-direction: row;
    justify-content: space-around;
    max-width: 300px;
    margin: 0 auto;
  }

  /* Mobile landscape: single row with smaller buttons */
  @media (max-width: 768px) and (orientation: landscape) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 500px;
  }
`;
