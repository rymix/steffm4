import styled from "styled-components";

export const StyledMixcloudWidget = styled.iframe`
  bottom: 0;
  left: 0;
  height: 60px;
  opacity: 1;
  position: relative;
  ztransform: translateY(60px);
  width: 100%;
  z-index: 1000;
`;

export const StyledHole = styled.div`
  position: absolute;
  left: calc(50% - 160px);
  bottom: calc(50% - 158px);
  width: 320px;
  height: 320px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 0 0 0 9999px rgba(255, 255, 255, 0.3);
`;

export const StyledPlayerWrapper = styled.div`
  height: 340px;
  max-height: 340px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

export const StyledPlayer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const StyledProgressBar = styled.div<{ $position: "top" | "bottom" }>`
  position: absolute;
  height: ${({ theme }) => theme.sizes.controls.progress.height};
  width: ${({ theme }) => theme.sizes.controls.progress.width};
  top: ${(props) => (props.$position === "top" ? "20px" : "auto")};
  bottom: ${(props) => (props.$position === "bottom" ? "-10px" : "auto")};
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
`;

export const StyledAudioControlsWrapper = styled.div`
  background-blend-mode: normal;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: ${({ theme }) => theme.sizes.controls.overall};
  width: ${({ theme }) => theme.sizes.controls.overall};
`;

export const StyledAudioControls = styled.div`
  align-items: center;
  background: ${({ colors, theme }) =>
    colors?.secondary || theme.colors.controls.outerDisc.background};
  background-blend-mode: normal;
  border-radius: 50%;
  color: black;
  display: flex;
  font-size: 48px;
  height: ${({ theme }) => theme.sizes.controls.background};
  justify-content: center;
  position: relative;
  width: ${({ theme }) => theme.sizes.controls.background};
  top: 20px;
`;

export const StyledAudioControlsInner = styled.div`
  align-items: center;
  border-radius: 50%;
  color: black;
  display: flex;
  height: ${({ theme }) => theme.sizes.controls.controls};
  justify-content: center;
  width: ${({ theme }) => theme.sizes.controls.controls};
`;

export const StyledHeadphonesWrapper = styled.div`
  min-height: 200px;
  overflow: visible;
  position: absolute;
  top: 40px;
  left: 10px;
`;

export const StyledSkipPrevious = styled.div`
  align-items: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.controls.buttons.text};
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.sizes.controls.buttons};
  left: 15px;
  position: absolute;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.controls.buttons};
  transition: color 0.3s ease;
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.controls.buttons.textHover};
  }
`;

export const StyledSkipNext = styled.div`
  align-items: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.controls.buttons.text};
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.sizes.controls.buttons};
  justify-content: center;
  position: absolute;
  right: 15px;
  width: ${({ theme }) => theme.sizes.controls.buttons};
  transition: color 0.3s ease;
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.controls.buttons.textHover};
  }
`;

export const StyledPlay = styled.div`
  align-items: center;
  background: ${({ colors, theme }) =>
    colors?.primary || theme.colors.controls.play.background};
  background-blend-mode: normal;
  border-radius: 50%;
  border: ${({ colors, theme }) =>
    `1px solid ${colors?.tertiary || theme.colors.controls.play.background}`};
  color: ${({ theme }) => theme.colors.controls.play.text};
  cursor: pointer;
  display: flex;
  font-size: 72px;
  height: ${({ theme }) => theme.sizes.controls.play};
  justify-content: center;
  width: ${({ theme }) => theme.sizes.controls.play};
  z-index: 8;

  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.controls.play.hover};
    color: ${({ theme }) => theme.colors.controls.play.textHover};
  }
`;
