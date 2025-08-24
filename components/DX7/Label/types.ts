export type Dx7LabelProps = {
  label?: string;
  labelPosition?: "above" | "below";
  paddingTop?: number;
  paddingBottom?: number;
  textColor?: string;
  size?: "tiny" | "normal" | "large" | "huge";
};

export type StyledDx7LabelProps = {
  $labelPosition?: string;
  $paddingBottom?: number;
  $paddingTop?: number;
  $textColor?: string;
  $size?: "tiny" | "normal" | "large" | "huge";
};
