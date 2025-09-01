import { StyledDx7FilterSelectProps } from "components/Dx7/FilterSelect/types";
import styled from "styled-components";

export const StyledDx7FilterSelect = styled.div<StyledDx7FilterSelectProps>`
  display: flex;
  flex-direction: ${(props) =>
    (props.$windowWidth && props.$windowWidth < 480) || props.$forceStack
      ? "column"
      : "row"};
`;
