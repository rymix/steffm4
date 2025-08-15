export type JupiterButtonProps = {
  on?: boolean;
  color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
  onClick?: () => void;
  momentary?: boolean; // New prop to indicate momentary button behavior
  size?: "normal" | "large" | "huge";
};

export type JupiterButtonColors = {
  color: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  light: string;
  normal: string;
  dark: string;
};

export type StyledJupiterButtonWrapperProps = {
  $size?: "normal" | "large" | "huge";
};

export type StyledJupiterLedProps = {
  $down?: boolean;
  $on?: boolean;
  $size?: "normal" | "large" | "huge";
};

export type StyledJupiterButtonProps = {
  $color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  $size?: "normal" | "large" | "huge";
};
