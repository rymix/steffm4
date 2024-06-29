export type JupiterButtonProps = {
  on?: boolean;
  color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
  onClick?: () => void;
};

export type JupiterButtonColors = {
  light: string;
  normal: string;
  dark: string;
};

export type StyledJupiterLedProps = {
  $down?: boolean;
  $on?: boolean;
};

export type StyledJupiterButtonProps = {
  $color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
};
