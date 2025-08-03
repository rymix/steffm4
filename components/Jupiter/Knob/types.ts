import type { Category } from "db/types";

export type JupiterKnobProps = {
  size: number;
  min: number;
  max: number;
  degrees: number;
  value: number;
  onChange: (_value: number) => void;
  onCategoryChange: (_value: number) => void;
  label?: string;
  labelPosition?: "above" | "below";
  labelVisible?: boolean;
  textColor?: string;
  steps?: boolean;
  categories: Category[];
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
