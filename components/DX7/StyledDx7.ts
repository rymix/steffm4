import styled from "styled-components";

import type { StyledDx7CaseItemProps, StyledDx7CaseRowProps } from "./types";

export const StyledDx7Case = styled.div`
  /* background: #241d19; */
  width: 90%;
  min-width: 520px;
  display: flex;
  flex-direction: column; /* each direct child = its own row */
  align-items: stretch; /* rows fill full width */
  justify-content: flex-start;
`;

export const StyledDx7CaseDark = styled.div`
  background-image:
    url("textures/dark-wall.png"),
    linear-gradient(
      180deg,
      #1c1814ff 0%,
      black 6%,
      #0d0b09ff 15%,
      #1c1814ff 97%,
      black 100%
    );
`;

export const StyledDx7CaseLight = styled.div`
  /* background: #241d19; */
  background-image:
    url("textures/dark-wall.png"),
    linear-gradient(
      180deg,
      black 0%,
      #2a2420ff 3%,
      #241d19 50%,
      #352e2aff 99%,
      #79726dff 100%
    );
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
