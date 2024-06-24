export type JupiterKnobProps = {
  size: number;
  min: number;
  max: number;
  degrees: number;
  value: number;
  onChange: (val: number) => void;
  label?: string;
  labelPosition?: "above" | "below";
  textColor?: string;
};

export type StyledKnobWrapperProps = {
  $size: number;
};

export type StyledOuterKnobProps = {
  $margin: number;
};

export type StyledInnerKnobProps = {
  $deg: number;
};

export type StyledKnobRadialLabels = {
  $file: string;
};
