import { StyledDx7VoiceLedProps } from "components/Dx7/Voice/types";
import styled from "styled-components";

export const StyledDx7VoiceLed = styled.div<StyledDx7VoiceLedProps>`
  background: ${(props) =>
    props.$on ? "rgba(18, 141, 255, 1)" : "rgba(0, 54, 111, 1)"};
  border: ${(props) =>
    props.$on
      ? "1px solid rgba(255, 255, 255, 0.4)"
      : "1ps xolid rgba(255, 255, 255, 0.4)"};
  border-radius: 50%;
  height: 8px;
  width: 8px;
  left: -10px;
  position: relative;
  top: 25px;
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;

  &::before {
    background-color: ${(props) =>
      props.$on ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"};
    ${(props) =>
      props.$on &&
      `
        box-shadow: 0 0 6px 4px rgba(18, 152, 255, 1);
      `}
    content: "";
    height: 2px;
    left: 1px;
    position: absolute;
    top: 1px;
    width: 2px;
  }
`;
