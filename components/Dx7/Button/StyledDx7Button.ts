import {
  Dx7ButtonColors,
  StyledDx7ButtonProps,
  StyledDx7ButtonWrapperProps,
  StyledDx7LedProps,
} from "components/Dx7/Button/types";
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
  color: "cream" | "yellow" | "orange" | "red" | "green" | "blue" | "grey",
): Omit<Dx7ButtonColors, "color"> => {
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
        light: "rgba(236, 128, 125, 1)",
        normal: "rgba(235, 105, 101, 1)",
        dark: "rgba(223, 84, 80, 1)",
      };
    }
    case "green": {
      return {
        light: "rgba(131, 222, 207, 1)",
        normal: "rgba(94, 204, 186, 1)",
        dark: "rgba(67, 184, 165, 1)",
      };
    }
    case "blue": {
      return {
        light: "rgba(101, 172, 228, 1)",
        normal: "rgba(76, 156, 219, 1)",
        dark: "rgba(48, 133, 202, 1)",
      };
    }
    case "grey": {
      return {
        light: "rgba(60, 60, 60, 1)",
        normal: "rgba(55, 55, 55, 1)",
        dark: "rgba(50, 50, 50, 1)",
      };
    }
    default: {
      return {
        light: "rgba(189, 145, 113, 1)",
        normal: "rgba(175, 125, 89, 1)",
        dark: "rgba(157, 102, 62, 1)",
      };
    }
  }
};

export const StyledDx7ButtonWrapper = styled.div<StyledDx7ButtonWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.$size === "huge" ? "center" : "flex-start"};
  width: ${(props) =>
    props.$size === "huge"
      ? "100%"
      : props.$size === "large"
        ? "91px"
        : props.$size === "tiny"
          ? "44px"
          : "66px"};

  /* Mobile breakpoint: adjust wrapper for touch targets */
  @media (max-width: 480px) {
    width: ${(props) =>
      props.$size === "huge"
        ? "100%"
        : props.$size === "large"
          ? "80px"
          : props.$size === "tiny"
            ? "40px"
            : "60px"};
    margin: 2px;
  }
`;

export const StyledDx7Button = styled.button<StyledDx7ButtonProps>`
  background: ${(props) => getGradientColors(props.$color || "cream").normal};
  background: linear-gradient(
    180deg,
    ${(props) => getGradientColors(props.$color || "cream").light} 0%,
    ${(props) => getGradientColors(props.$color || "cream").normal} 3%,
    ${(props) => getGradientColors(props.$color || "cream").normal} 50%,
    ${(props) => getGradientColors(props.$color || "cream").dark} 100%
  );
  border: 3px solid rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.7);
  cursor: pointer;
  height: ${(props) =>
    props.$size === "huge"
      ? "66px"
      : props.$size === "large"
        ? "108px"
        : props.$size === "tiny"
          ? "22px"
          : "33px"};
  width: ${(props) =>
    props.$size === "huge"
      ? "132px"
      : props.$size === "large"
        ? "63px"
        : props.$size === "tiny"
          ? "44px"
          : "66px"};
  overflow: hidden;
  position: relative;
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;

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

  /* Touch devices: enhance active state feedback */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      transform: scale(0.95);
      &::before {
        background-color: rgba(0, 0, 0, 0.15);
      }
    }
  }
`;

export const StyledDx7Led = styled.div<StyledDx7LedProps>`
  background: ${(props) =>
    props.$on || props.$down ? "rgba(255, 18, 49, 1)" : "rgba(111, 0, 0, 1)"};
  border: ${(props) =>
    props.$size === "huge"
      ? "2px solid rgba(255, 255, 255, 0.4)"
      : props.$size === "large"
        ? "1.5px solid rgba(255, 255, 255, 0.4)"
        : props.$size === "tiny"
          ? "0.5px solid rgba(255, 255, 255, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.4)"};
  border-radius: 50%;
  height: ${(props) =>
    props.$size === "huge"
      ? "24px"
      : props.$size === "large"
        ? "18px"
        : props.$size === "tiny"
          ? "8px"
          : "12px"};
  right: ${(props) =>
    props.$size === "huge"
      ? "26px"
      : props.$size === "large"
        ? "19px"
        : props.$size === "tiny"
          ? "3px"
          : "4px"};
  position: absolute;
  top: ${(props) =>
    props.$size === "huge"
      ? "8px"
      : props.$size === "large"
        ? "6px"
        : props.$size === "tiny"
          ? "5px"
          : "8px"};
  transform: ${(props) => (props.$down ? "scale(0.9)" : "scale(1)")};
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;
  width: ${(props) =>
    props.$size === "huge"
      ? "24px"
      : props.$size === "large"
        ? "18px"
        : props.$size === "tiny"
          ? "8px"
          : "12px"};

  &::before {
    background-color: ${(props) =>
      props.$on ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"};
    ${(props) =>
      props.$on &&
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

export const StyledDx7ButtonLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 36px;
`;

export const StyledDx7ButtonLabel = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;
