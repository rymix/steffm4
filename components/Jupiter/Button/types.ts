export type JupiterButtonProps = {
  on?: boolean;
  color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
};

export type JupiterButtonColors = {
  light: string;
  normal: string;
  dark: string;
};

export type StyledJupiterLedProps = {
  $on?: boolean;
};

export type StyledJupiterButtonProps = {
  $color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
};
