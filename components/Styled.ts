import styled from "styled-components";

export const ScrollContainer = styled.div`
  height: 200vh;
  width: 100%;
  overflow: hidden;
`;

export const Panel = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const TopPanel = styled(Panel)`
  background-color: rgba(255, 255, 255, 0.5);
`;

export const BottomPanel = styled(Panel)`
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
  width: 100%;

  @media (max-width: 440px) {
    gap: 0;
    padding: 0;
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

  @media (max-width: 440px) {
    gap: 0;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  flex: 1 0 30%;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 440px) {
    padding: 0;
  }
`;
