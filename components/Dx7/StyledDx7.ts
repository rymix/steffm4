import styled from "styled-components";

// No longer need type imports - using specific styled components

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
  }

  /* Mobile landscape: use available width efficiently */
  @media (max-width: 768px) and (orientation: landscape) {
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

// Specific styled row components to replace parameterized StyledDx7CaseRow

// Screen row - centered alignment for screen and controls
export const StyledDx7CaseScreenRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0;
`;

// Controls row - default row layout for volume and controls
export const StyledDx7CaseControlsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0;
`;

// Filter row - default row layout for filter/cartridge and mix display
export const StyledDx7CaseFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0;
`;

// Specific styled components to replace parameterized StyledDx7CaseItem

// Screen container - horizontal layout, centered
export const StyledDx7CaseScreenContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

// Controls container - vertical layout, responsive flex
export const StyledDx7CaseControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 2 1 60%;
`;

// Volume container - vertical layout, with padding and screen controls in portrait
export const StyledDx7CaseVolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 20px 0;
  flex: 1 1 40%;
`;

// Filter/Cartridge container - vertical layout, centered, with padding
export const StyledDx7CaseFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 20px 0;
`;

// Mix display container - vertical layout, centered, with specific padding
export const StyledDx7CaseMixDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 30px 0 20px 0;
`;
