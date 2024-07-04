import React from "react";

import {
  StyledColumn,
  StyledGridWrapper,
  StyledItem,
  StyledItems,
  StyledTitle,
} from "./StyledGrid";

export const Grid: React.FC = () => {
  return (
    <StyledGridWrapper>
      <StyledColumn>
        <StyledTitle>Title 1</StyledTitle>
        <StyledItems>
          <StyledItem>Item 1</StyledItem>
        </StyledItems>
      </StyledColumn>
      <StyledColumn>
        <StyledTitle>Title 2</StyledTitle>
        <StyledItems>
          <StyledItem>Item 2</StyledItem>
          <StyledItem>Item 3</StyledItem>
        </StyledItems>
      </StyledColumn>
      <StyledColumn>
        <StyledTitle>Title 3</StyledTitle>
        <StyledItems>
          <StyledItem>Item 4</StyledItem>
          <StyledItem>Item 5</StyledItem>
        </StyledItems>
      </StyledColumn>
    </StyledGridWrapper>
  );
};

export default Grid;
