import styled from "styled-components";

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  padding: 8px;
  flex: 1 0 30%;
  justify-content: center;
  box-sizing: border-box;
`;
