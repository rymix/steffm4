export type JupiterButtonProps = {
  on?: boolean;
  colour?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
};

export type JupiterButtonColours = {
  light: string;
  normal: string;
  dark: string;
};

export type StyledJupiterLedProps = {
  $on?: boolean;
};

export type StyledJupiterButtonProps = {
  $colour?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
};
