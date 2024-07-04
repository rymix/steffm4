import styled from "styled-components";

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 16px;
  border: 1px solid red;
  background: yellow;
  padding: 16px;
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
  border: 1px solid black;
`;

export const StyledItem = styled.div`
  border: 1px solid blue;
  padding: 8px;
  flex: 1 0 30%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: 1 0 100%;
  }
`;

export const StyledTitle = styled.div`
  background: orange;
  padding: 8px;
  text-align: center;
  flex: none;
  width: 100%;
  box-sizing: border-box;
`;
