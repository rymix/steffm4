import styled from "styled-components";

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  border: 1px solid red;
  padding: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledColumn = styled.div`
  border: 1px solid green;
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
  border: 1px solid blue;
  display: flex;
  padding: 8px;
  flex: 1 0 30%;
  box-sizing: border-box;
  width: 75px;

  @media (max-width: 768px) {
    zflex: 1 0 100%;
    justify-content: center;
  }
`;

export const StyledTitle = styled.div`
  background: orange;
  padding: 8px;
  text-align: center;
  flex: none;
  width: 100%;
  min-width: 100px;
  box-sizing: border-box;
`;
