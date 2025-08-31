import styled from "styled-components";
import type {
  StyledDx7CaseProps,
  StyledDx7CaseControlsContainerProps,
  StyledDx7CaseVolumeContainerProps,
  StyledDx7CaseFilterContainerProps,
} from "./types";

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

export const StyledDx7Case = styled.div<StyledDx7CaseProps>`
  width: 90%;
  min-width: ${(props) => (props.$windowWidth && props.$windowWidth <= 900 ? "unset" : "890px")};
  max-width: ${(props) => (props.$windowWidth && props.$windowWidth <= 900 ? "none" : "1220px")};
  display: flex;
  flex-direction: column; /* each direct child = its own row */
  align-items: stretch; /* rows fill full width */
  justify-content: flex-start;

  ${(props) => props.$windowWidth && props.$windowWidth <= 900 && `
    width: 95%;
  `}

  ${(props) => props.$windowWidth && props.$windowWidth <= 480 && `
    min-width: 300px;
    max-width: 400px;
    width: 80%;
  `}
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
export const StyledDx7CaseControlsRow = styled.div<{ $windowWidth?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.$windowWidth && props.$windowWidth <= 800 ? "column" : "row")};
  justify-content: center;
  align-items: stretch;
  gap: 0;
`;

// Filter row - default row layout for filter/cartridge and mix display
export const StyledDx7CaseFilterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
export const StyledDx7CaseControlsContainer = styled.div<StyledDx7CaseControlsContainerProps>`
  display: flex;
  flex-direction: column;
  flex-wrap: none;
  align-items: ${(props) => (props.$windowWidth && props.$windowWidth <= 900 ? "center" : "flex-end")};
  padding: ${(props) => (props.$windowWidth && props.$windowWidth <= 900 ? "0" : "0 20px 20px 0")};
  flex: 1.3;
`;

// Volume container - vertical layout, with padding and screen controls in portrait
export const StyledDx7CaseVolumeContainer = styled.div<StyledDx7CaseVolumeContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.$windowWidth && props.$windowWidth <= 800 ? "center" : "flex-start")};
  align-items: flex-start;
  padding: ${(props) => (props.$windowWidth && props.$windowWidth <= 800 ? "10px 0 0 0" : "0 0 20px 20px")};
  flex: 1;
`;

// Volume container - vertical layout, with padding and screen controls in portrait
export const StyledDx7CaseScreenControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 0 20px 20px;
  flex: 1;
`;

// Filter/Cartridge container - vertical layout, centered, with padding
export const StyledDx7CaseFilterContainer = styled.div<StyledDx7CaseFilterContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$windowWidth && props.$windowWidth <= 900 ? "center" : "flex-end")};
  flex: 0.8;
  padding: 20px 20px 20px 0;
`;

export const StyledDx7CaseFilterContainerContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Mix display container - vertical layout, centered, with specific padding
export const StyledDx7CaseMixDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 30px 0 20px 20px;
`;
