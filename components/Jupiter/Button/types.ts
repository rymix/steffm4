export type JupiterButtonProps = {
  on?: boolean;
  colour?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
  label?: string;
  labelPosition?: "above" | "below";
};

export type StyledJupiterLedProps = {
  on?: boolean;
};

export type StyledJupiterButtonProps = {
  colour?: "cream" | "yellow" | "orange" | "red" | "green" | "blue";
};

export type JupiterButtonColours = {
  light: string;
  normal: string;
  dark: string;
};
