export type JupiterKnobProps = {
  size: number;
  min: number;
  max: number;
  degrees: number;
  value: number;
  onChange: (val: number) => void;
  label?: string;
  labelPosition?: "above" | "below";
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
