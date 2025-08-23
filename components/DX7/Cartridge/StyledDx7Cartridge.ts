import StefFmDx7Logo from "public/svg/stef-fm-dx7.svg";
import styled from "styled-components";

export const StyledDx7CartridgeSlot = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.7);
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDx7Cartridge = styled.div`
  background: rgba(55, 55, 55, 1);
  background: linear-gradient(
    180deg,
    rgba(80, 80, 80, 1) 0%,
    rgba(55, 55, 55, 1) 6%,
    rgba(55, 55, 55, 1) 50%,
    rgba(40, 40, 40, 1) 100%
  );
  border-radius: 2px;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDx7CartridgeSticker = styled.div`
  background: rgba(15, 163, 180, 1);
  background: linear-gradient(
    180deg,
    rgba(38, 196, 214, 1) 0%,
    rgba(15, 163, 180, 1) 6%,
    rgba(15, 163, 180, 1) 50%,
    rgba(8, 134, 148, 1) 100%
  );
  border-radius: 1px;
  width: calc(100% - 3px);
  height: calc(100% - 3px);
  display: flex;
`;

export const StyledDx7HeaderLogo = styled(StefFmDx7Logo)`
  height: 50%;
  width: auto;
  aspect-ratio: 4.2 / 1;
  display: flex;
  align-items: center;
  fill: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  padding: 0 26px 0 0;
`;

export const StyledDx7CartridgeTitle = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
`;

export const StyledDx7CartridgeIcons = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledDx7CartridgeRom = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
`;
