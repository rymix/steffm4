import styled from "styled-components";
import { StyledNotebookProps } from "./types";

export const StyledNotebook = styled.div<StyledNotebookProps>`
  cursor: pointer;
  box-shadow: -5px 8px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  width: 320px;
  height: 400px;
  z-index: 1;
  transform: ${(props) => `rotate(${props.$rotation}deg)`};
  transition: transform 0.3s ease;

  &:hover {
    transform: ${(props) => `rotate(0deg) scale(1.2)`};
  }

  /* @media (max-width: 700px) {
    transform: scale(0.6);
  } */
`;

export const StyledNotebookTop = styled.div`
  width: 100%;
  height: 50px;
  background: #333;
  border-radius: 5px 5px 0 0;
`;

export const StyledNotebookPaper = styled.div`
  background-color: #f6f4ef;
  background-image: url("textures/rice-paper-2.png");
  background-size: cover;
  background-blend-mode: overlay;
  width: 100%;
  height: 100%;
  padding: 35px 20px;
  font-family: "ShadowsIntoLight", cursive;
  line-height: 32px;
  outline: 0;
  font-size: 22px;
  position: relative;
  z-index: 0;

  /* Pseudo-element for the lined background */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      transparent,
      transparent 31px,
      #94acd4 31px,
      #94acd4 32px
    );
    border-radius: 0 0 5px 5px;
    z-index: -1; /* Ensure it stays behind the content */
  }

  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 10px 0 -7px #eee,
    0 10px 1px -4px rgba(0, 0, 0, 0.15),
    0 20px 0 -13px #eee,
    0 20px 1px -9px rgba(0, 0, 0, 0.15);
`;
