import styled from "styled-components";

import type { StyledDx7CaseRowProps } from "./types";

export const dx7Border = (
  horizontalPosition = "left",
  verticalPosition = "top",
  height = "100%",
): string => `
  &::${horizontalPosition === "left" ? "before" : "after"} {
    content: "";
    position: absolute;
    ${verticalPosition === "top" ? "top: 0;" : "bottom: 0;"}
    ${horizontalPosition === "left" ? "left: 0;" : "right: 0;"}
    width: 18px;
    height: ${height};
    background:   url("textures/dark-wall.png"),
      linear-gradient(
        ${horizontalPosition === "left" ? "90deg" : "270deg"},
        #1c1814ff 0%,
        white 4%,
        #1c1814ff 8%,
        white 12%,
        #1c1814ff 16%,
        white 20%,
        #1c1814ff 30%,
        #1c1814ff 80%,
        black 100%
    );
  }
`;

export const StyledDx7Case = styled.div`
  width: 90%;
  min-width: 890px;
  max-width: 1220px;
  display: flex;
  flex-direction: column; /* each direct child = its own row */
  align-items: stretch; /* rows fill full width */
  justify-content: flex-start;

  /* Medium breakpoint: 900px - vertical stacking, remove min-width */
  @media (max-width: 900px) {
    min-width: unset;
    max-width: none;
    width: 95%;
  }

  /* Small breakpoint: 480px - compact layout */
  @media (max-width: 480px) {
    min-width: 300px;
    max-width: 400px;
    width: 80%;
  }

  /* Mobile portrait: stack everything vertically */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 95%;
    max-width: 380px;
    min-width: 300px;
    margin: 0 auto;
    padding: 10px;
  }

  /* Mobile landscape: use available width efficiently */
  @media (max-width: 768px) and (orientation: landscape) {
    width: 98%;
    max-width: none;
    min-width: 300px;
    padding: 5px;
  }
`;

export const StyledDx7CaseDark = styled.div`
  position: relative;
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

  ${dx7Border("left", "top", "100%")}
  ${dx7Border("right", "top", "100%")}
`;

export const StyledDx7CaseLight = styled.div`
  position: relative;
  background-image:
    url("textures/dark-wall.png"),
    linear-gradient(
      180deg,
      black 0%,
      #2a2420ff 1%,
      #352e2aff 2%,
      #2a2420ff 4%,
      #241d19 50%,
      #352e2aff 98%,
      black 100%
    );

  ${dx7Border("left", "100%")}
  ${dx7Border("right", "100%")}
`;

export const StyledDx7CaseRow = styled.div<StyledDx7CaseRowProps>`
  display: flex;
  flex-direction: ${(props) => {
    if (props.layout === "vertical") return "column";
    if (props.layout === "horizontal") return "row";
    return "row"; // default
  }};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "stretch"};
  gap: ${(props) => props.gap || "0"};
  ${(props) => props.customFlex ?? ""}

  /* Medium breakpoint: 900px - force all rows to stack vertically */
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10px;
  }

  /* Mobile portrait: optimize for vertical space */
  @media (max-width: 768px) and (orientation: portrait) {
    flex-direction: column;
    gap: 15px;
    padding: 5px;
  }

  /* Mobile landscape: try to maintain some horizontal layout where possible */
  @media (max-width: 768px) and (orientation: landscape) {
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

// Specific styled components to replace parameterized StyledDx7CaseItem

// Screen container - horizontal layout, centered
export const StyledDx7CaseScreenContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;

  /* Mobile breakpoint: ensure items don't overflow */
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 0;
    flex-shrink: 1;
  }
`;

// Controls container - vertical layout, responsive flex
export const StyledDx7CaseControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 2 1 60%;

  /* Mobile portrait: full width, center alignment */
  @media (max-width: 768px) and (orientation: portrait) {
    flex: 1;
    align-items: center;
  }

  /* Mobile landscape: maintain responsive ratio */
  @media (max-width: 768px) and (orientation: landscape) {
    flex: 2 1 60%;
  }
`;

// Volume container - vertical layout, with padding and screen controls in portrait
export const StyledDx7CaseVolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 20px 0;
  flex: 1 1 40%;

  /* Mobile portrait: auto size, center alignment, reduced padding */
  @media (max-width: 768px) and (orientation: portrait) {
    flex: 0 0 auto;
    align-items: center;
    padding: 0 0 14px 0;
  }

  /* Mobile landscape: maintain responsive ratio, reduced padding */
  @media (max-width: 768px) and (orientation: landscape) {
    flex: 1 1 40%;
    padding: 0 0 12px 0;
  }
`;

// Filter/Cartridge container - vertical layout, centered, with padding
export const StyledDx7CaseFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 20px 0;

  /* Mobile portrait: reduced padding */
  @media (max-width: 768px) and (orientation: portrait) {
    padding: 14px 0;
  }

  /* Mobile landscape: reduced padding */
  @media (max-width: 768px) and (orientation: landscape) {
    padding: 12px 0;
  }
`;

// Mix display container - vertical layout, centered, with specific padding
export const StyledDx7CaseMixDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 30px 0 20px 0;

  /* Mobile portrait: reduced padding */
  @media (max-width: 768px) and (orientation: portrait) {
    padding: 21px 0 14px 0;
  }

  /* Mobile landscape: reduced padding */
  @media (max-width: 768px) and (orientation: landscape) {
    padding: 18px 0 12px 0;
  }
`;
