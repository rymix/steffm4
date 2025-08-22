import type { StyledDx7LcdProps } from "components/Dx7/Lcd/types";
import styled from "styled-components";

export const StyledDx7LcdWrapper = styled.div<StyledDx7LcdProps>`
  align-items: center;
  background: rgba(32, 16, 0, 1);
  background-image:
    linear-gradient(170deg, #0007, transparent 50%),
    linear-gradient(to bottom, transparent, #fff1 95%, #fff4 100%);
  box-shadow:
    inset 5px 5px 5px rgba(0, 0, 0, 0.2),
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
  border: 2px solid #333;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  font-family: "dseg14";
  font-size: 40px;
  font-weight: bold;
  height: 90px;
  justify-content: flex-end;
  width: ${(props) => Math.max(150, props.$characterCount * 32 + 44)}px;
`;

export const StyledDx7Lcd = styled.div<StyledDx7LcdProps>`
  color: rgba(236, 29, 29, 1);
  display: flex;
  justify-content: flex-end;
  position: relative;
  text-shadow: 0 0 0.25em rgba(207, 0, 0, 1);

  &::before {
    content: "${(props) => "~".repeat(props.$characterCount)}";
    display: block;
    opacity: 0.1;
    position: absolute;
    text-shadow: none;
  }
`;
