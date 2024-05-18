import { StyledSemiCircularProgress } from "components/Controls/StyledSemiCircularProgress";
import React from "react";

export interface SemiCircularProgressProps {
  value: number;
  position?: "top" | "bottom";
  start?: "left" | "right";
}

const SemiCircularProgress: React.FC<SemiCircularProgressProps> = (props) => {
  const { value, position = "top", start = "left" } = props;
  return (
    <StyledSemiCircularProgress
      role="semicircularprogressbar"
      value={value}
      position={position}
      start={start}
    />
  );
};

export default SemiCircularProgress;
