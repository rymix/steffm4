import StefFmDx7Logo from "public/svg/stef-fm-dx7.svg";
import styled from "styled-components";

export const StyledDx7Header = styled.div`
  background: orange;
  width: 960px;
  display: flex;
  align-items: flex-end;
`;

export const StyledDx7HeaderTitle = styled.div`
  text-transform: uppercase;
  display: inline-block; /* so the transform applies cleanly */
  transform: scaleX(0.7); /* 80% width */
  transform-origin: left center; /* keep left edge anchored */
  white-space: nowrap; /* keep it on one line for logos */
  line-height: 1;
  font-size: 40px;
  font-weight: 700;
  align-content: flex-end;
  margin: 0 -40px -3px 10px;
`;

export const StyledDx7HeaderLogo = styled(StefFmDx7Logo).attrs({
  preserveAspectRatio: "xMidYMid meet",
})`
  display: block;
  width: 300px !important;
  height: auto !important;
  aspect-ratio: 4.2 / 1;
  max-width: 100%;
  fill: rgba(0, 0, 1);
  padding: 10px 0 0 0;
  cursor: pointer;
`;

export const StyledDx7HeaderMotto = styled.div`
  text-transform: uppercase;
  font-family: "Microgamma", sans-serif;
  font-weight: 700;
`;
