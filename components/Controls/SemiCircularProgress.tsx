/* eslint-disable jsx-a11y/aria-role */
import { StyledSemiCircularProgress } from "components/Controls/StyledSemiCircularProgress";
import React from "react";

export interface SemiCircularProgressProps {
  value: number;
}
const SemiCircularProgress: React.FC<SemiCircularProgressProps> = (props) => {
  const { value } = props;
  return (
    <StyledSemiCircularProgress role="semicircularprogressbar" value={value} />
  );
};

export default SemiCircularProgress;
