import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const TopBlock = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 30%;

  @media (max-height: 600px) {
    max-height: 20%;
  }
`;

export const MiddleBlock = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: scale(1);
`;

export const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 30%;

  @media (max-height: 600px) {
    max-height: 20%;
  }
`;
