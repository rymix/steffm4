export type JupiterSliderProps = {
  onChange: (val: number) => void;
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelPosition?: "above" | "below";
  lineColor?: string;
  textColor?: string;
};

export type StyledJupiterSliderProps = {
  orientation?: "horizontal" | "vertical";
  $lineColor?: string;
};
