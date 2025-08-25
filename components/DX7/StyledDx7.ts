import styled from "styled-components";

import type { StyledDx7CaseItemProps, StyledDx7CaseRowProps } from "./types";

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
  min-width: 520px;
  display: flex;
  flex-direction: column; /* each direct child = its own row */
  align-items: stretch; /* rows fill full width */
  justify-content: flex-start;
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
`;

export const StyledDx7CaseItem = styled.div<StyledDx7CaseItemProps>`
  sborder: 1px solid grey;
  ${(props) => (props.flex ? `flex: ${props.flex};` : "")}
  ${(props) => (props.alignSelf ? `align-self: ${props.alignSelf};` : "")}

  ${(props) =>
    props.layout
      ? `
    display: flex;
    flex-direction: ${props.layout === "vertical" ? "column" : "row"};
    ${props.justifyContent ? `justify-content: ${props.justifyContent};` : ""}
    ${props.alignItems ? `align-items: ${props.alignItems};` : ""}
    ${props.gap ? `gap: ${props.gap};` : ""}
  `
      : ""}

  ${(props) => props.customFlex ?? ""}
`;
