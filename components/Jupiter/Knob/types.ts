export type JupiterKnobProps = {
  size: number;
  min: number;
  max: number;
  degrees: number;
  value: number;
  onChange: (val: number) => void;
  onCategoryChange: (val: string) => void;
  label?: string;
  labelPosition?: "above" | "below";
  labelVisible?: boolean;
  textColor?: string;
  steps?: boolean;
  categories: string[];
};

export type StyledKnobWrapperProps = {
  $size: number;
};

export type StyledOuterKnobProps = {
  $margin: number;
};

export type StyledInnerKnobProps = {
  $deg: number;
  $snap?: number;
};

export type StyledKnobRadialLabels = {
  $file: string;
};

export type StyledJupiterKnobMarkerProps = {
  $x: number;
  $y: number;
};
