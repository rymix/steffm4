import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: -1000;
`;

export const FadeDiv = styled.div<{ $isVisible: boolean; $gradient: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${(props) => props.$gradient};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  z-index: ${(props) => (props.$isVisible ? 1 : 0)};
`;
