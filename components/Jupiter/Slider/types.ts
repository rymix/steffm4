export type JupiterSliderProps = {
  onChange: (_value: number) => void;
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelPosition?: "above" | "below";
  lineColor?: string;
  textColor?: string;
  value: number;
};

export type StyledJupiterSliderProps = {
  orientation?: "horizontal" | "vertical";
  $lineColor?: string;
};
