import type {
  StyledJupiterProgressLedProps,
  StyledJupiterProgressLedsItemsWrapperProps,
} from "components/Jupiter/ProgressLeds/types";
import styled from "styled-components";

export const StyledJupiterProgressLedsWrapper = styled.div``;

export const StyledJupiterProgressLedsItemsWrapper = styled.div<StyledJupiterProgressLedsItemsWrapperProps>`
  display: flex;
  gap: 10px;
`;

export const StyledJupiterProgressLed = styled.div<StyledJupiterProgressLedProps>`
  background: ${(props) =>
    props.$on ? "rgba(51, 170, 255, 0.8)" : "rgba(0, 34, 68, 1)"};
  border: 2px solid rgba(0, 0, 0, 0.3);
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

export const StyledJupiterProgressLedsLabels = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;

  div {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
  }

  div:nth-child(1) {
    left: 0%;
  }

  div:nth-child(2) {
    left: 25%;
  }

  div:nth-child(3) {
    left: 50%;
  }

  div:nth-child(4) {
    left: 75%;
  }

  div:nth-child(5) {
    left: 100%;
  }
`;
