import styled from "styled-components";

export const StyledMixcloudWidget = styled.iframe`
  bottom: 0;
  left: 0;
  height: 60px;
  opacity: 0;
  position: fixed;
  transform: translateY(60px);
  width: 100%;
  z-index: -1;
`;

export const StyledPlayer = styled.div`
  background: blue;
  bottom: 0;
  display: flex;
  left: 0;
  height: 30vh;
  position: fixed;
  text-align: center;
  width: 100%;
`;

export const StyledNothing = styled.div`
  background: coral;
  width: 20%;
`;

export const StyledAudioControls = styled.div`
  background: grey;
  color: black;
  font-size: 64px;
  width: 60%;

  .control {
    transition: color 0.125s;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }
`;

export const StyledVolumeControls = styled.div`
  background: cyan;
  width: 20%;
`;
