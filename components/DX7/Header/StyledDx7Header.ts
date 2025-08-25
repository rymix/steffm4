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

  /* Medium breakpoint: 900px - allow wrapping */
  @media (max-width: 900px) {
    flex-wrap: wrap;
    height: auto;
    min-height: 80px;
    padding: 10px 0;
  }

  /* Small breakpoint: 600px - compact header */
  @media (max-width: 600px) {
    height: 60px;
    min-height: 60px;
    padding: 5px 0;
  }
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
  margin: 0 0 20px 40px;
  cursor: pointer;

  /* Medium breakpoint: 900px - smaller logo */
  @media (max-width: 900px) {
    flex: 0 0 200px;
    margin: 0 0 15px 20px;
  }

  /* Small breakpoint: 600px - much smaller logo */
  @media (max-width: 600px) {
    flex: 0 0 150px;
    margin: 0 0 10px 10px;
  }
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

  /* Medium breakpoint: 900px - smaller motto */
  @media (max-width: 900px) {
    flex: 0 0 250px;
    width: 250px;
    padding: 0 0 15px 8px;
    font-size: 8px;
  }

  /* Small breakpoint: 600px - hide motto to save space */
  @media (max-width: 600px) {
    display: none;
  }
`;

/* takes 100% of remaining space */
export const StyledDx7HeaderSpacer = styled.div`
  flex: 1 1 auto;
  min-width: 0; /* allow it to shrink if needed */
  height: 100%;
  background-image: url("dx7/algorithm.png");
  background-size: 600px auto;
  background-repeat: no-repeat;
  background-position: 10px;
  opacity: 0.7;

  /* Medium breakpoint: 900px - smaller algorithm background */
  @media (max-width: 900px) {
    background-size: 400px auto;
    opacity: 0.5;
  }

  /* Small breakpoint: 600px - hide algorithm background */
  @media (max-width: 600px) {
    background-image: none;
  }
`;
