import type {
  JupiterButtonColours,
  StyledJupiterButtonProps,
  StyledJupiterLedProps,
} from "components/Jupiter/Button/types";
import styled, { css } from "styled-components";

const overlayStyles = css`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  animation: fadeOverlay 0.1s ease-in-out;
`;

const getGradientColors = (
  color: StyledJupiterButtonProps["colour"],
): JupiterButtonColours => {
  switch (color) {
    case "yellow": {
      return {
        light: "rgba(277, 215, 34, 1)",
        normal: "rgba(254, 191, 23, 1)",
        dark: "rgba(183, 138, 17, 1)",
      };
    }
    case "orange": {
      return {
        light: "rgba(252, 121, 31, 1)",
        normal: "rgba(231, 107, 21, 1)",
        dark: "rgba(167, 78, 16, 1)",
      };
    }
    case "red": {
      return {
        light: "rgba(242, 56, 27, 1)",
        normal: "rgba(222, 50, 18, 1)",
        dark: "rgba(161, 36, 13, 1)",
      };
    }
    case "green": {
      return {
        light: "rgba(97, 187, 105, 1)",
        normal: "rgba(89, 166, 71, 1)",
        dark: "rgba(64, 120, 53, 1)",
      };
    }
    case "blue": {
      return {
        light: "rgba(83, 138, 255, 1)",
        normal: "rgba(76, 123, 221, 1)",
        dark: "rgba(55, 89, 164, 1)",
      };
    }
    default: {
      return {
        light: "rgba(252, 246, 209, 1)",
        normal: "rgba(231, 218, 141, 1)",
        dark: "rgba(167, 158, 105, 1)",
      };
    }
  }
};

export const StyledJupiterButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 100px;
  width: 54px;
`;

export const StyledJupiterButton = styled.button<StyledJupiterButtonProps>`
  background: ${(props) => getGradientColors(props.colour || "cream").normal};
  background: linear-gradient(
    180deg,
    ${(props) => getGradientColors(props.colour || "cream").light} 0%,
    ${(props) => getGradientColors(props.colour || "cream").normal} 3%,
    ${(props) => getGradientColors(props.colour || "cream").normal} 30%,
    ${(props) => getGradientColors(props.colour || "cream").light} 31%,
    ${(props) => getGradientColors(props.colour || "cream").dark} 35%,
    ${(props) => getGradientColors(props.colour || "cream").normal} 72%,
    ${(props) => getGradientColors(props.colour || "cream").normal} 100%
  );
  border: 3px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.7);
  cursor: pointer;
  height: 72px;
  width: 42px;
  overflow: hidden;
  position: relative;
  transition: all 0.1s ease-in-out;

  &:hover {
    &::before {
      ${overlayStyles}
      background-color: rgba(0, 0, 0, 0.02);
    }
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:active {
    &::before {
      ${overlayStyles}
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const StyledJupiterLed = styled.div<StyledJupiterLedProps>`
  background: ${(props) =>
    props.on ? "rgba(255, 18, 49, 1)" : "rgba(111, 0, 0, 1)"};
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  height: 12px;
  left: 12px;
  position: absolute;
  top: 4px;
  width: 12px;

  &::before {
    background: ${(props) =>
      props.on ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"};
    ${(props) =>
      props.on &&
      `
        box-shadow: 0 0 6px 4px rgba(255, 18, 49, 1);
      `}
    content: "";
    height: 2px;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 2px;
  }
`;

export const StyledJupiterButtonLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 36px;
`;

export const StyledJupiterButtonLabel = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;
