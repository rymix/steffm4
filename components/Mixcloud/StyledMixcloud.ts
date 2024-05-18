import styled from "styled-components";

export const StyledMixcloudWidget = styled.iframe`
  bottom: 0;
  left: 0;
  height: 60px;
  opacity: 1;
  position: fixed;
  // transform: translateY(60px);
  width: 100%;
  z-index: 1;
`;

export const StyledPlayer = styled.div`
  background: blue;
  bottom: 0;
  display: flex;
  left: 0;
  height: 30vh;
  position: relative; //fixed
  text-align: center;
  width: 100%;
`;

export const StyledProgressBar = styled.div`
  background: coral;
  width: 20%;
`;

export const StyledAudioControls = styled.div`
  align-items: center;
  background: grey;
  border-radius: 50%;
  color: black;
  display: flex;
  font-size: 48px;
  height: 300px;
  justify-content: center;
  position: relative;
  width: 300px;

  .control {
    transition: color 0.125s;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }
`;

export const StyledAudioControlsInner = styled.div`
  align-items: center;
  background: lightgrey;
  border-radius: 50%;
  box-shadow: 0px 20px 20px -10px rgba(0, 0, 0, 0.5);
  color: black;
  display: flex;
  height: 220px;
  justify-content: center;
  width: 220px;
`;

export const StyledSkipPrevious = styled.div`
  align-items: center;
  background: lightgrey;
  border-radius: 50%;
  color: black;
  display: flex;
  height: 60px;
  left: 15px;
  position: absolute;
  justify-content: center;
  width: 60px;
`;

export const StyledSkipNext = styled.div`
  align-items: center;
  background: lightgrey;
  border-radius: 50%;
  color: black;
  display: flex;
  height: 60px;
  justify-content: center;
  position: absolute;
  right: 15px;
  width: 60px;
`;

export const StyledPlay = styled.div`
  align-items: center;
  background: white;
  border-radius: 50%;
  color: black;
  display: flex;
  font-size: 72px;
  height: 100px;
  justify-content: center;
  width: 100px;
`;

export const StyledVolumeControls = styled.div`
  background: cyan;
  width: 20%;
`;
