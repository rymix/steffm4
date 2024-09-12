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

export const StyledOutRunText = styled.div`
  color: #eebb00;
  font-family: "Determination";
  font-size: 64px;
  position: absolute;
  left: 0;
  top: 0;
  width: 640px;
  height: 112px;
  z-index: 2;
`;

export const StyledOutRunTextShadow = styled.div`
  color: #000000;
  font-family: "Determination";
  font-size: 64px;
  position: absolute;
  left: 4px;
  top: 4px;
  width: 640px;
  height: 112px;
  z-index: 1;
`;

export const StyledOutRunHand = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 640px;
  height: 112px;
`;
