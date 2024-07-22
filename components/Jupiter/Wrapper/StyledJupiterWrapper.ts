import styled from "styled-components";

export const StyledJupiterWrapper = styled.div`
  background: orange;
  background-image: url("windows/3.1/zigzag.png");
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  left: 0;
  margin: 0;
  padding: 0;
  position: static;
  top: 0;
  width: 100%;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle,
      transparent 70%,
      rgba(0, 0, 0, 0.8) 120%
    );
    pointer-events: none;
    z-index: 2;
  }

  &::after {
    background-color: rgba(255, 255, 255, 0);
    background-image: radial-gradient(
      circle farthest-side at 50% 70%,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
`;
