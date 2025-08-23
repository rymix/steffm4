import StefFmDx7Logo from "public/svg/stef-fm-dx7.svg";
import styled from "styled-components";

export const StyledDx7Header = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap; /* keep on one line */
  width: 100%;
  height: 80px;
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
  flex: 0 0 280px; /* fixed 300px column */
  width: 100%; /* SVG fills its column */
  height: auto;
  aspect-ratio: 4.2 / 1;
  display: block;
  fill: rgba(255, 255, 255, 0.8);
  padding: 0 0 10px 0;
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
  font-size: 10px;
  text-transform: uppercase;
  font-family: Microgamma, sans-serif;
  font-weight: 700;
  padding: 0 0 8px 0;
`;

/* takes 100% of remaining space */
export const StyledDx7HeaderSpacer = styled.div`
  flex: 1 1 auto;
  min-width: 0; /* allow it to shrink if needed */
`;
