import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import styled from "styled-components";

export const StyledVolumeControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

export const StyledVolumeControls = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  width: 240px;
`;

export const StyledVolumeDown = styled(VolumeDown)`
  color: ${({ theme }) => theme.colors.volume.text};
  cursor: pointer;
  font-size: 24px;
  margin: 2px 0 0 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.volume.textHover};
  }
`;

export const StyledVolumeUp = styled(VolumeUp)`
  color: ${({ theme }) => theme.colors.volume.text};
  cursor: pointer;
  font-size: 24px;
  margin: 2px 0 0 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.volume.textHover};
  }
`;
