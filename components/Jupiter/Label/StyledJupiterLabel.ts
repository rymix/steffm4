import type { StyledJupiterLabelProps } from "components/Jupiter/Label/types";
import styled from "styled-components";

export const StyledJupiterLabelWrapper = styled.div`
  background: green;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 56px;
`;

export const StyledJupiterLabel = styled.div<StyledJupiterLabelProps>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-bottom: ${(props) => props.paddingBottom}px;
  padding-top: ${(props) => props.paddingTop}px;
`;