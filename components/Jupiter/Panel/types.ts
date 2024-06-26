export type JupiterPanelProps = {
  children?: React.ReactNode;
  title?: string;
  align?: "center" | "left" | "right";
  padding?: string;
  background?: boolean;
};

export type StyledJupiterPanelProps = {
  $padding?: string;
  $background?: boolean;
};

export type StyledJupiterPanelItemsProps = {
  $align?: "center" | "left" | "right";
};
