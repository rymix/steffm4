import type {
  StyledJupiterProgressLedProps,
  StyledJupiterProgressLedsWrapperProps,
} from "components/Jupiter/ProgressLeds/types";
import styled from "styled-components";

export const StyledJupiterProgressLedsWrapper = styled.div<StyledJupiterProgressLedsWrapperProps>`
  display: flex;
  gap: 10px;
`;

export const StyledJupiterProgressLed = styled.div<StyledJupiterProgressLedProps>`
  background: ${(props) =>
    props.$on ? "rgba(51, 170, 255, 0.8)" : "rgba(0, 34, 68, 1)"};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  height: 10px;
  position: relative;
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;
  width: 10px;

  &::before {
    background-color: ${(props) =>
      props.$on ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)"};
    ${(props) =>
      props.$on &&
      `
        box-shadow: 0 0 6px 4px rgba(51, 170, 255, 0.2);
      `}
    content: "";
    height: 1px;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 1px;
  }
`;
