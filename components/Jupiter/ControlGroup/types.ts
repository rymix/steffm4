export type JupiterControlGroupProps = {
  children?: React.ReactNode;
  pad?: "left" | "right" | "rightBig" | "both";
  label?: boolean;
  title?: string;
  direction?: "row" | "column";
  grow?: number;
};

export type StyledJupiterControlGroupProps = {
  $pad?: "left" | "right" | "rightBig" | "both";
  $direction?: "row" | "column";
  $grow?: number;
};
