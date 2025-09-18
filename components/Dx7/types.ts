// This file previously contained StyledDx7CaseRowProps and StyledDx7CaseItemProps
// These parameterized component types have been removed and replaced with
// specific styled components that don't require type props

// Individual component types are now defined in their respective component directories
// e.g., components/Dx7/Button/types.ts, components/Dx7/Screen/types.ts, etc.

// Types for styled components that need responsive props

export type BaseDimensionsProps = {
  $windowWidth?: number;
  $isMobile?: boolean;
  $isPortrait?: boolean;
};

export type StyledDx7CaseProps = BaseDimensionsProps;

export type StyledDx7CaseControlsContainerProps = BaseDimensionsProps;

export type StyledDx7CaseVolumeContainerProps = BaseDimensionsProps;

export type StyledDx7CaseFilterContainerProps = BaseDimensionsProps;

export type StyledDx7HeaderLogoProps = BaseDimensionsProps;

export type StyledDx7HeaderMottoProps = BaseDimensionsProps;

export type StyledDx7HeaderSpacerProps = BaseDimensionsProps;

export type StyledDx7SliderOuterProps = BaseDimensionsProps;

export type StyledDx7CaseDarkProps = {
  $background?: string;
};
