import type {
  StyledJupiterScreenProps,
  StyledJupiterScreenWrapperProps,
} from "components/Jupiter/Screen/types";
import styled from "styled-components";

export const StyledJupiterScreenWrapper = styled.div<StyledJupiterScreenWrapperProps>`
  align-items: center;
  background: #024;
  background-image: linear-gradient(170deg, #0007, transparent 50%),
    linear-gradient(to bottom, transparent, #fff1 95%, #fff4 100%);
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  font-family: "dseg14";
  font-size: 40px;
  font-weight: bold;
  height: 90px;
  justify-content: flex-end;
  width: ${(props) => props.$displayLength * 33}px;
`;

export const StyledJupiterScreen = styled.div<StyledJupiterScreenProps>`
  color: #3af;
  display: flex;
  justify-content: flex-end;
  position: relative;
  text-shadow: 0 0 0.25em #3af;

  &:before {
    content: "${(props) => "~".repeat(props.$displayLength)}";
    display: block;
    opacity: 0.1;
    position: absolute;
    text-shadow: none;
  }
`;

export const StyledScreenDebug = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 300px;
  background: white;

  dd {
    margin-left: 20px;
  }
`;
