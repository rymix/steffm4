import styled from "styled-components";
import { StyledOutRunTextProps } from "./types";

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
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : 52)}px;
  z-index: 2;
`;

export const StyledOutRunTextShadow = styled(StyledOutRunText)`
  color: #000000;
  z-index: 1;
`;

export const StyledNotesImage = styled.img<StyledOutRunTextProps>`
  width: ${({ $fontSize }) => ($fontSize ? $fontSize : 52) / 1.5}px;
  height: ${({ $fontSize }) => ($fontSize ? $fontSize : 52) / 1.5}px;
  margin-right: 10px;
  z-index: 2;
`;

export const StyledNotesShadowImage = styled(StyledNotesImage)`
  z-index: 1;
`;

export const StyledOutRunHand = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 640px;
  height: 112px;
`;
