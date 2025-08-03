import { StyledNotebookProps } from "components/Notebook/types";
import styled from "styled-components";

export const StyledNotebook = styled.div<StyledNotebookProps>`
  cursor: pointer;
  box-shadow: -5px 8px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform: ${(props) => `rotate(${props.$rotation}deg)`};
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.2);
  }
`;

export const StyledNotebookTop = styled.div`
  width: 100%;
  height: 15%;
  background: #333;
  border-radius: 5px 5px 0 0;
  font-family: "Sforzando";
  color: rgba(255, 255, 255, 0.8);

  &::after {
    content: "fM";
    position: relative;
    top: 10px;
    left: 20px;
  }
`;

export const StyledNotebookPaper = styled.div`
  background-color: #f6f4ef;
  background-image: url("textures/rice-paper-2.png");
  background-size: cover;
  background-blend-mode: overlay;
  padding: 1.4em 1em;
  font-family: "ShadowsIntoLight", cursive;
  outline: 0;
  position: relative;
  overflow: hidden;
  z-index: 0;

  width: 100%;
  height: 85%;
  font-size: 1em;
  line-height: 1.2em;

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
      transparent 1.2em,
      #94acd4 1.2em,
      #94acd4 1.22em
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
