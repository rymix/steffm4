export type JupiterPanelProps = {
  children?: React.ReactNode;
  title?: string;
  align?: "center" | "left" | "right";
  padding?: string | null;
  background?: "none" | "panel" | "rear" | "front";
};

export type JupiterPanelContentProps = {
  children?: React.ReactNode;
  padding?: string | null;
};

export type StyledJupiterPanelContentProps = {
  $padding?: string | null;
};

export type StyledJupiterPanelWrapperProps = {
  $padding?: string | null;
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
