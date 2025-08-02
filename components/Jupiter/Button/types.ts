export type JupiterButtonProps = {
  on?: boolean;
  color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
  onClick?: () => void;
  momentary?: boolean; // New prop to indicate momentary button behavior
};

export type JupiterButtonColors = {
  color: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
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
