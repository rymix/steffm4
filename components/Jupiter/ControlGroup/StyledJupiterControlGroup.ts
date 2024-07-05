import type { StyledJupiterControlGroupProps } from "components/Jupiter/ControlGroup/types";
import styled from "styled-components";

export const StyledJupiterControlGroup = styled.div<StyledJupiterControlGroupProps>`
  border: 1px solid red;
  display: flex;
  flex-direction: ${(props) => props.$direction ?? "row"};
  flex-grow: ${(props) => props.$grow ?? 0};
  ${(props) =>
    props.$pad &&
    `
      ${(() => {
        switch (props.$pad) {
          case "left": {
            return "padding-left: 20px;";
          }
          case "right": {
            return "padding-right: 20px;";
          }
          case "rightBig": {
            return "padding: 20px 74px 0 24px";
          }
          case "both": {
            return "padding-left: 20px; padding-right: 20px;";
          }
          default: {
            return "";
          }
        }
      })()}
    `}
`;
