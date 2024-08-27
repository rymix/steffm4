import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "styled-components";

export const StyledScrollIndicator = styled.div`
  cursor: pointer;
  position: fixed;
  height: 50px;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

export const StyledDownIndicator = styled(KeyboardArrowDownIcon)`
  font-size: 100px;
  position: relative;
  margin-top: -20px;
`;

export const StyledUpIndicator = styled(KeyboardArrowUpIcon)`
  font-size: 100px;
  position: relative;
  margin-top: -20px;
`;