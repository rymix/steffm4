export type Dx7ButtonProps = {
  on?: boolean;
  color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue" | "grey";
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
  onClick?: () => void;
  momentary?: boolean; // New prop to indicate momentary button behavior
  size?: "tiny" | "normal" | "large" | "huge";
};

export type Dx7ButtonColors = {
  color: "cream" | "yellow" | "orange" | "red" | "green" | "blue" | "grey";
  light: string;
  normal: string;
  dark: string;
};

export type StyledDx7ButtonWrapperProps = {
  $size?: "tiny" | "normal" | "large" | "huge";
};

export type StyledDx7LedProps = {
  $down?: boolean;
  $on?: boolean;
  $size?: "tiny" | "normal" | "large" | "huge";
};

export type StyledDx7ButtonProps = {
  $color?: "cream" | "yellow" | "orange" | "red" | "green" | "blue" | "grey";
  $size?: "tiny" | "normal" | "large" | "huge";
};
