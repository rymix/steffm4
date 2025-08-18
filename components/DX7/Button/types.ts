export type Dx7ButtonProps = {
  on?: boolean;
  color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
  onClick?: () => void;
  momentary?: boolean; // New prop to indicate momentary button behavior
  size?: "normal" | "large" | "huge";
};

export type Dx7ButtonColors = {
  color: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  light: string;
  normal: string;
  dark: string;
};

export type StyledDx7ButtonWrapperProps = {
  $size?: "normal" | "large" | "huge";
};

export type StyledDx7LedProps = {
  $down?: boolean;
  $on?: boolean;
  $size?: "normal" | "large" | "huge";
};

export type StyledDx7ButtonProps = {
  $color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  $size?: "normal" | "large" | "huge";
};
