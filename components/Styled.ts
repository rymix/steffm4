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

export const StyledBottomGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2.6em;
  zpadding: 60px 0;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    gap: 1.6em; /* Reduce the gap further on smaller screens */
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledChild = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid red; /* For debugging */
  flex-shrink: 1; /* Allow shrinking when space is tight */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  font-size: 24px;

  /* transition:
    transform 0.3s ease,
    width 0.3s ease,
    height 0.3s ease; */

  @media (max-width: 1024px) {
    font-size: 16px;
    width: 200px;
    height: 300px;
  }
`;

export const StyledFixedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const StyledFixedForeground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
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
