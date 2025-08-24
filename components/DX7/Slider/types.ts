export type Dx7SliderProps = {
  onChange: (_value: number) => void;
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelPosition?: "above" | "below";
  lineColor?: string;
  textColor?: string;
  value: number;
  size?: "tiny" | "normal" | "large" | "huge";
};

export type StyledDx7SliderProps = {
  orientation?: "horizontal" | "vertical";
  $lineColor?: string;
};
