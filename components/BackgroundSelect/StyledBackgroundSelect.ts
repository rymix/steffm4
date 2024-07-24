import styled from "styled-components";

export const StyledBackgroundSelect = styled.div``;

export const StyledBackgroundButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledBackgroundButton = styled.button`
  background: #e4dbcd;
  border: 1px solid #e4dbcd;
  border-radius: 20px;
  cursor: pointer;
  margin: 8px;
  padding: 8px;
  transition: background 0.2s ease-in-out;
  width: 25%;

  &:hover {
    background: #ddd1be;
  }

  &:active {
    border: 1px solid #a59a88;
    background: #cdc1ae;
  }
`;
