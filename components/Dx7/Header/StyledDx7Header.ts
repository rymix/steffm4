import type {
  StyledDx7HeaderLogoProps,
  StyledDx7HeaderMottoProps,
  StyledDx7HeaderSpacerProps,
} from "components/Dx7/Header/types";
import { dx7Border } from "components/Dx7/StyledDx7";
import StefFmDx7Logo from "public/svg/stef-fm-dx7.svg";
import styled from "styled-components";

export const StyledDx7Header = styled.div`
  background-image:
    url("textures/dark-wall.png"),
    linear-gradient(
      180deg,
      transparent 0%,
      white 1%,
      #1c1814ff 3%,
      #0d0b09ff 97%,
      black 100%
    );
  display: flex;
  position: relative;
  align-items: flex-end;
  flex-wrap: nowrap; /* keep on one line */
  width: 100%;
  height: 100px;

  ${dx7Border("left", "bottom", "97%")}
  ${dx7Border("right", "bottom", "97%")}
`;

/* 100px wide */
export const StyledDx7HeaderTitle = styled.div`
  flex: 0 0 100px; /* no grow, no shrink, 100px basis */
  width: 100px; /* ensure fixed box for transformed text */
  overflow: hidden; /* optional: avoid spill if text is long */
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  line-height: 1;
  font-size: 20px;
  font-weight: 700;
  padding: 0 0 8px 10px;
`;

/* 300px wide */
export const StyledDx7HeaderLogo = styled(
  StefFmDx7Logo,
)<StyledDx7HeaderLogoProps>`
  flex: 0 0 240px; /* fixed 300px column */
  width: 100%; /* SVG fills its column */
  height: auto;
  aspect-ratio: 4.2 / 1;
  display: block;
  fill: rgba(255, 255, 255, 0.8);
  cursor: pointer;

  /* Large screens (>520px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 520 &&
    !props.$isPortrait &&
    `
    margin: 0 0 20px 40px;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 520 &&
    props.$isPortrait &&
    `
    margin: 0 0 20px 40px;
  `}

  /* Small screens (≤520px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 520 &&
    !props.$isPortrait &&
    `
    margin: auto auto;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 520 &&
    props.$isPortrait &&
    `
    margin: auto auto;
  `}
`;

/* 300px wide */
export const StyledDx7HeaderMotto = styled.div<StyledDx7HeaderMottoProps>`
  color: rgba(255, 255, 255, 0.8);
  flex: 0 0 300px; /* fixed 300px column */
  width: 300px;
  white-space: nowrap;
  overflow: hidden; /* optional */
  text-overflow: ellipsis;
  font-size: 9px;
  text-transform: uppercase;
  font-family: Microgamma, sans-serif;
  font-weight: 700;
  padding: 0 0 20px 8px;

  /* Large screens (>520px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 520 &&
    !props.$isPortrait &&
    `
    display: block;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 520 &&
    props.$isPortrait &&
    `
    display: block;
  `}

  /* Small screens (≤520px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 520 &&
    !props.$isPortrait &&
    `
    display: none;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 520 &&
    props.$isPortrait &&
    `
    display: none;
  `}
`;

/* takes 100% of remaining space */
export const StyledDx7HeaderSpacer = styled.div<StyledDx7HeaderSpacerProps>`
  flex: 1 1 auto;
  min-width: 0; /* allow it to shrink if needed */
  height: 100%;
  background-image: url("dx7/algorithm.png");
  background-size: 600px auto;
  background-repeat: no-repeat;
  background-position: 10px;
  opacity: 0.7;

  /* Large screens (>520px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 520 &&
    !props.$isPortrait &&
    `
    display: block;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 520 &&
    props.$isPortrait &&
    `
    display: block;
  `}

  /* Small screens (≤520px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 520 &&
    !props.$isPortrait &&
    `
    display: none;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 520 &&
    props.$isPortrait &&
    `
    display: none;
  `}

  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 767 &&
    props.$windowWidth < 1366 &&
    `
    &::after {
      content: "";
      position: absolute;
      top: 14px;
      right: 18px;
      width: 1px;
      height: 73px;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
      z-index: 2;
    }
  `}
`;
