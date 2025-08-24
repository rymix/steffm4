import styled from "styled-components";
import type { StyledDx7CaseRowProps, StyledDx7CaseItemProps } from "./types";

export const StyledDx7Case = styled.div`
  background: #241d19;
  width: 90%;
  min-width: 520px;
  display: flex;
  flex-direction: column; /* each direct child = its own row */
  align-items: stretch; /* rows fill full width */
  justify-content: flex-start;
`;

export const StyledDx7CaseDark = styled.div`
  background: #241d19;
`;

export const StyledDx7CaseLight = styled.div`
  background: #423432;
`;

export const StyledDx7CaseRow = styled.div<StyledDx7CaseRowProps>`
  display: flex;
  flex-direction: ${props => {
    if (props.layout === 'vertical') return 'column';
    if (props.layout === 'horizontal') return 'row';
    return 'row'; // default
  }};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  gap: ${props => props.gap || '0'};
  ${props => props.customFlex ? props.customFlex : ''}
`;

export const StyledDx7CaseItem = styled.div<StyledDx7CaseItemProps>`
  border: 1px solid red;
  ${props => props.flex ? `flex: ${props.flex};` : ''}
  ${props => props.alignSelf ? `align-self: ${props.alignSelf};` : ''}
  
  ${props => props.layout ? `
    display: flex;
    flex-direction: ${props.layout === 'vertical' ? 'column' : 'row'};
    ${props.justifyContent ? `justify-content: ${props.justifyContent};` : ''}
    ${props.alignItems ? `align-items: ${props.alignItems};` : ''}
    ${props.gap ? `gap: ${props.gap};` : ''}
  ` : ''}
  
  ${props => props.customFlex ? props.customFlex : ''}
`;
