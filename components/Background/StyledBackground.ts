import styled from "styled-components";

export const StyledBackground = styled.div`
  height: 100vh;
  overflow: hidden;
  position: fixed;
  width: 100%;
  z-index: -1000;
`;

export const FadeDiv = styled.div<{ $isVisible: boolean; $gradient: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 200vw;
  height: 200vh;
  ${(props) => props.$gradient};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  z-index: ${(props) => (props.$isVisible ? 1 : 0)};
`;
