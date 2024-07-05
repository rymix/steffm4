export type JupiterLabelProps = {
  label?: string;
  labelPosition?: "above" | "below";
  paddingTop?: number;
  paddingBottom?: number;
  textColor?: string;
};

export type StyledJupiterScreenWrapperProps = {
  $displayLength: number;
};

export type StyledJupiterLabelProps = {
  $labelPosition?: string;
  $paddingBottom?: number;
  $paddingTop?: number;
  $textColor?: string;
};

export type StyledJupiterScreenProps = {
  $displayLength: number;
};
