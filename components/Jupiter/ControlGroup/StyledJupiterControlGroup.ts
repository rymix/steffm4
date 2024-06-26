import type { StyledJupiterControlGroupProps } from "components/Jupiter/ControlGroup/types";
import styled from "styled-components";

export const StyledJupiterControlGroup = styled.div<StyledJupiterControlGroupProps>`
  display: flex;
  flex-direction: row;
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
