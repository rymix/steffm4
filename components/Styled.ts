import styled from "styled-components";
import Panel from "./Jupiter/Panel";

export const StyledScrollContainer = styled.div`
  height: 200vh;
  width: 100%;
  overflow: hidden;
`;

export const StyledPanel = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
`;

export const StyledTopPanel = styled(Panel)`
  background-color: transparent;
`;

export const StyledBottomPanel = styled(StyledPanel)`
  background-color: transparent;
`;

export const StyledScrollerDebug = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: yellow;
  font-size: 2rem;
  z-index: 1000; /* Ensure it's on top of other content */
  padding: 10px;
`;

export const StyledFixedContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
