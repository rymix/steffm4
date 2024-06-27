export type JupiterPanelProps = {
  children?: React.ReactNode;
  title?: string;
  align?: "center" | "left" | "right";
  padding?: string;
  background?: "none" | "panel" | "rear" | "front";
};

export type JupiterPanelContentProps = {
  children?: React.ReactNode;
};

export type StyledJupiterPanelContent = {
  $position?: "left" | "right";
};

export type StyledJupiterPanelWrapperProps = {
  $padding?: string;
  $background?: "none" | "panel" | "rear" | "front";
};

export type StyledJupiterPanelProps = {
  $background?: "none" | "panel" | "rear" | "front";
};

export type StyledJupiterPanelBorderProps = {
  $position: "left" | "right";
};

export type StyledJupiterPanelItemsProps = {
  $align?: "center" | "left" | "right";
};
