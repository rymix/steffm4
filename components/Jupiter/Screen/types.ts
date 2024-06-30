export type JupiterLabelProps = {
  label?: string;
  labelPosition?: "above" | "below";
  paddingTop?: number;
  paddingBottom?: number;
  textColor?: string;
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
