import { dx7Border } from "components/Dx7/StyledDx7";
import StefFmDx7Logo from "public/svg/stef-fm-dx7.svg";
import styled from "styled-components";

export const StyledDx7Header = styled.div`
  background-image:
    url("textures/dark-wall.png"),
    linear-gradient(
      180deg,
      black 0%,
      black 1%,
      white 2%,
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
export const StyledDx7HeaderLogo = styled(StefFmDx7Logo)`
  flex: 0 0 240px; /* fixed 300px column */
  width: 100%; /* SVG fills its column */
  height: auto;
  aspect-ratio: 4.2 / 1;
  display: block;
  fill: rgba(255, 255, 255, 0.8);
  margin: 0 0 20px 30px;
  cursor: pointer;
`;

/* 300px wide */
export const StyledDx7HeaderMotto = styled.div`
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
`;

/* takes 100% of remaining space */
export const StyledDx7HeaderSpacer = styled.div`
  flex: 1 1 auto;
  min-width: 0; /* allow it to shrink if needed */
`;
