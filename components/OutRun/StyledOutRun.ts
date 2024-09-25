import { StyledOutRunTextProps } from "components/OutRun/types";
import styled from "styled-components";

export const StyledOutRunWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledOutRun = styled.div`
  background-image: url("outrun/bg.png");
  background-size: 100%;
  position: relative;
  width: 640px;
  height: 400px;
`;

export const StyledOutRunTextWrapper = styled.div<StyledOutRunTextProps>`
  position: absolute;
  left: 50%;
  top: 112px;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 640px;
  width: 100%;
  z-index: 2; /* Ensure this is on top */
`;

export const StyledOutRunTextShadowWrapper = styled(StyledOutRunTextWrapper)`
  left: calc(50% + 5px); /* Offset the shadow by 5px to the right */
  top: calc(112px + 4px); /* Offset the shadow by 4px down */
  z-index: 1; /* Render this below the main wrapper */
`;

export const StyledOutRunText = styled.div<StyledOutRunTextProps>`
  color: #eebb00;
  font-family: "Determination";
  font-size: ${({ $fontSize }) => $fontSize || 52}px;
  z-index: 2;
`;

export const StyledOutRunTextShadow = styled(StyledOutRunText)`
  color: #000000;
  z-index: 1;
`;

export const StyledNotesImage = styled.img<StyledOutRunTextProps>`
  width: ${({ $fontSize }) => ($fontSize || 52) / 1.5}px;
  height: ${({ $fontSize }) => ($fontSize || 52) / 1.5}px;
  margin-right: 10px;
  z-index: 2;
`;

export const StyledNotesShadowImage = styled(StyledNotesImage)`
  z-index: 1;
`;

export const StyledOutRunTree = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 188px;
  height: 88px;
  z-index: 2;
`;

export const StyledOutRunClouds = styled.div`
  position: absolute;
  left: 0;
  top: 180px;
  width: 100%;
  height: 11px;
  background-image: url("outrun/clouds.png");
  background-repeat: repeat-x;
  background-position: 0 0;
  background-size: contain;
  z-index: 2;
`;

export const StyledOutRunNumber = styled.div`
  position: absolute;
  left: 268px;
  top: 300px;
  width: 80px;
  height: 14px;
  color: #42d6d6;
  font-family: "dseg7";
  font-size: 13px;
`;

export const StyledOutRunAudio = styled.img`
  position: absolute;
  left: 276px;
  top: 328px;
  width: 88px;
  height: 10px;
`;

export const StyledOutRunHand = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 640px;
  height: 112px;
`;
