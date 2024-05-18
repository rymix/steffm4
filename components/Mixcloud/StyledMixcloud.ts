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
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const StyledControlPanel = styled.div`
  align-items: center;
  background: yellow;
  display: flex;
  height: 600px;
  justify-content: center;
  position: relative;
  width: 400px;
`;

export const StyledProgressBar = styled.div<{ position: "top" | "bottom" }>`
  min-height: 140px;
  min-width: 340px;
  transform: translateY(-300px);
`;

export const StyledAudioControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  transform: translateY(20px);
  z-index: 10;
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
