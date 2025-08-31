// This file previously contained StyledDx7CaseRowProps and StyledDx7CaseItemProps
// These parameterized component types have been removed and replaced with
// specific styled components that don't require type props

// Individual component types are now defined in their respective component directories
// e.g., components/Dx7/Button/types.ts, components/Dx7/Screen/types.ts, etc.

// Types for styled components that need windowWidth props
export interface StyledDx7CaseProps {
  $windowWidth?: number;
}

export interface StyledDx7CaseControlsContainerProps {
  $windowWidth?: number;
}

export interface StyledDx7CaseVolumeContainerProps {
  $windowWidth?: number;
}

export interface StyledDx7CaseFilterContainerProps {
  $windowWidth?: number;
}

export interface StyledDx7HeaderLogoProps {
  $windowWidth?: number;
}

export interface StyledDx7HeaderMottoProps {
  $windowWidth?: number;
}

export interface StyledDx7HeaderSpacerProps {
  $windowWidth?: number;
}

export interface StyledDx7SliderOuterProps {
  $windowWidth?: number;
}

export {};
