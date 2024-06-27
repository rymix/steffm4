export type JupiterPanelProps = {
  children?: React.ReactNode;
  title?: string;
  align?: "center" | "left" | "right";
  padding?: string;
  background?: boolean;
};

export type JupiterPanelContentProps = {
  children?: React.ReactNode;
};

export type StyledJupiterPanelContent = {
  $position?: "left" | "right";
};

export type StyledJupiterPanelProps = {
  $padding?: string;
  $background?: boolean;
};

export type StyledJupiterPanelBorderProps = {
  $position: "left" | "right";
};

export type StyledJupiterPanelItemsProps = {
  $align?: "center" | "left" | "right";
};
