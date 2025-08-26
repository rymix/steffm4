export type StyledDx7CaseRowProps = {
  layout?: "horizontal" | "vertical" | "custom";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: string;
  customFlex?: string;
};

// Removed StyledDx7CaseItemProps - replaced with specific components
