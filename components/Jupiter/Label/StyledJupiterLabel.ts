import type { StyledJupiterLabelProps } from "components/Jupiter/Label/types";
import styled from "styled-components";

export const StyledJupiterLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 42px;
  min-height: 42px;
`;

export const StyledJupiterLabel = styled.div<StyledJupiterLabelProps>`
  color: ${(props) => props.$textColor};
  display: flex;
  align-items: ${(props) =>
    props.$labelPosition === "below" ? "flex-start" : "flex-end"};
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: ${(props) => props.$paddingBottom}px;
  padding-top: ${(props) => props.$paddingTop}px;
  font-size: 14px;
  text-transform: uppercase;
`;
