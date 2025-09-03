import {
  StyledDx7CaseControlsContainerProps,
  StyledDx7CaseFilterContainerProps,
  StyledDx7CaseProps,
  StyledDx7CaseVolumeContainerProps,
} from "components/Dx7/types";
import styled from "styled-components";

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
  display: flex;
  flex-direction: column; /* each direct child = its own row */
  align-items: stretch; /* rows fill full width */
  justify-content: flex-start;

  /* Large screens (>900px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 900 &&
    !props.$isPortrait &&
    `
    min-width: 890px;
    max-width: 1220px;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 900 &&
    props.$isPortrait &&
    `
    min-width: 890px;
    max-width: 1220px;
  `}

  /* Medium screens (≤900px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 900 &&
    props.$windowWidth > 480 &&
    !props.$isPortrait &&
    `
    min-width: unset;
    max-width: none;
    width: 95%;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 900 &&
    props.$windowWidth > 480 &&
    props.$isPortrait &&
    `
    min-width: unset;
    max-width: none;
    width: 95%;
  `}

  /* Small screens (≤480px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 480 &&
    !props.$isPortrait &&
    `
    min-width: 300px;
    max-width: 400px;
    width: 80%;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 480 &&
    props.$isPortrait &&
    `
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
export const StyledDx7CaseControlsRow = styled.div<{
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;

  /* Large screens (>800px) NOT mobile */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 800 &&
    !props.$isPortrait &&
    !props.$isMobile &&
    `
    flex-direction: row;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 800 &&
    props.$isPortrait &&
    !props.$isMobile &&
    `
    flex-direction: row;
  `}

  /* Large screens (>800px) IS mobile */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 800 &&
    !props.$isPortrait &&
    props.$isMobile &&
    `
    scale: 1;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 800 &&
    props.$isPortrait &&
    props.$isMobile &&
    `
    scale: 0.5;
  `}

  /* Small screens (≤800px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 800 &&
    !props.$isPortrait &&
    `
    flex-direction: column;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 800 &&
    props.$isPortrait &&
    `
    flex-direction: column;
  `}
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
  flex-flow: column;
  flex: 1.3;

  /* Large screens (>900px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 900 &&
    !props.$isPortrait &&
    `
    align-items: flex-end;
    padding: 0 20px 20px 0;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 900 &&
    props.$isPortrait &&
    `
    align-items: flex-end;
    padding: 0 20px 20px 0;
  `}

  /* Medium/Small screens (≤900px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 900 &&
    !props.$isPortrait &&
    `
    align-items: center;
    padding: 0;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 900 &&
    props.$isPortrait &&
    `
    align-items: center;
    padding: 0;
  `}
`;

// Volume container - vertical layout, with padding and screen controls in portrait
export const StyledDx7CaseVolumeContainer = styled.div<StyledDx7CaseVolumeContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1;

  /* Large screens (>800px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 800 &&
    !props.$isPortrait &&
    `
    justify-content: flex-start;
    padding: 0 0 20px 20px;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 800 &&
    props.$isPortrait &&
    `
    justify-content: flex-start;
    padding: 0 0 20px 20px;
  `}

  /* Small screens (≤800px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 800 &&
    !props.$isPortrait &&
    `
    justify-content: center;
    padding: 10px 0 0 0;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 800 &&
    props.$isPortrait &&
    `
    justify-content: center;
    padding: 10px 0 0 0;
  `}
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
  flex: 0.8;
  padding: 20px 20px 20px 0;

  /* Large screens (>900px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 900 &&
    !props.$isPortrait &&
    `
    align-items: flex-end;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth > 900 &&
    props.$isPortrait &&
    `
    align-items: flex-end;
  `}

  /* Medium/Small screens (≤900px) */
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 900 &&
    !props.$isPortrait &&
    `
    align-items: center;
  `}
  ${(props) =>
    props.$windowWidth &&
    props.$windowWidth <= 900 &&
    props.$isPortrait &&
    `
    align-items: center;
  `}
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
