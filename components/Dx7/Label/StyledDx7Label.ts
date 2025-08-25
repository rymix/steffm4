import type { StyledDx7LabelProps } from "components/Dx7/Label/types";
import styled from "styled-components";

export const StyledDx7LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 32px;
  min-height: 32px;
`;

export const StyledDx7Label = styled.div<StyledDx7LabelProps>`
  color: ${(props) => props.$textColor};
  display: flex;
  align-items: ${(props) =>
    props.$labelPosition === "below" ? "flex-start" : "flex-end"};
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: ${(props) => props.$paddingBottom}px;
  padding-top: ${(props) => props.$paddingTop}px;
  padding-left: 4px;
  font-size: ${(props) =>
    props.$size === "huge"
      ? "22px"
      : props.$size === "large"
        ? "16px"
        : "10px"};
  text-transform: uppercase;
`;
