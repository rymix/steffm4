// This file previously contained StyledDx7CaseRowProps and StyledDx7CaseItemProps
// These parameterized component types have been removed and replaced with
// specific styled components that don't require type props

// Individual component types are now defined in their respective component directories
// e.g., components/Dx7/Button/types.ts, components/Dx7/Screen/types.ts, etc.

// Types for styled components that need responsive props
export interface StyledDx7CaseProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7CaseControlsContainerProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7CaseVolumeContainerProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7CaseFilterContainerProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7HeaderLogoProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7HeaderMottoProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7HeaderSpacerProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export interface StyledDx7SliderOuterProps {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
}

export {};
