import { StyledSemiCircularProgress } from "components/Controls/StyledSemiCircularProgress";
import React from "react";

export interface SemiCircularProgressProps {
  value: number;
  position?: "top" | "bottom";
  start?: "left" | "right";
  barWidth?: number;
}

const SemiCircularProgress: React.FC<SemiCircularProgressProps> = (props) => {
  const { value, position = "top", start = "left", barWidth = 1 } = props;
  return (
    <StyledSemiCircularProgress
      role="semicircularprogressbar"
      value={value}
      position={position}
      start={start}
      barWidth={barWidth}
    />
  );
};

export default SemiCircularProgress;
