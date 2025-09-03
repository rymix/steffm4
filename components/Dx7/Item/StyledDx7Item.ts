import { StyledDx7ItemGroupProps } from "components/Dx7/Item/types";
import styled from "styled-components";

export const StyledDx7ItemGroup = styled.div<StyledDx7ItemGroupProps>`
  display: flex;
  flex-direction: row;
  width: 200px;

  justify-content: ${(props) =>
    props.$alignment === "right" ? "flex-end" : "flex-start"};
  justify-content: ${(props) => props.$forceStack && "center"};

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const StyledDx7Item = styled.div`
  padding: 0 2px;
`;
