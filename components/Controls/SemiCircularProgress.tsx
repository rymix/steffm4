/* eslint-disable jsx-a11y/aria-role */
import { StyledSemiCircularProgress } from "components/Controls/StyledSemiCircularProgress";
import { useSession } from "contexts/session";
import React from "react";

export interface SemiCircularProgressProps {
  $value: number;
  $position?: "top" | "bottom";
  $start?: "left" | "right";
  $barWidth?: number;
}

const SemiCircularProgress: React.FC<SemiCircularProgressProps> = (props) => {
  const { colours } = useSession();
  const { $value, $position = "top", $start = "left", $barWidth = 1 } = props;
  const validValue = Number.isNaN($value) ? 0 : $value;

  return (
    <StyledSemiCircularProgress
      colours={colours}
      role="semicircularprogressbar"
      $value={validValue}
      $position={$position}
      $start={$start}
      $barWidth={$barWidth}
    />
  );
};

export default SemiCircularProgress;
