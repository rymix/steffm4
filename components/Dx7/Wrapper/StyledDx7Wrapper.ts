import { StyledDx7WrapperProps } from "components/Dx7/Wrapper/types";
import styled from "styled-components";

export const StyledDx7Wrapper = styled.div<StyledDx7WrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100%;
  overflow-x: auto;
  z-index: 1;

  ${(props) =>
    props.$scale &&
    props.$scale < 1 &&
    `
    scale: ${props.$scale};
    overflow: visible !important;
  `}
`;
