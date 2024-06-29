import {
  StyledJupiterGrip,
  StyledJupiterInnerKnob,
  StyledJupiterKnobMarker,
  StyledJupiterKnobWrapper,
  StyledJupiterOuterKnob,
  StyledJupiterOuterKnobWrapper,
  StyledJupiterRadialLabels,
} from "components/Jupiter/Knob/StyledJupiterKnob";
import type { JupiterKnobProps } from "components/Jupiter/Knob/types";
import { useRef, useState } from "react";

import JupiterLabel from "../Label";

const JupiterKnob: React.FC<JupiterKnobProps> = ({
  size = 0,
  min = 1,
  max = 4,
  degrees = 260,
  value = 1,
  onChange,
  label,
  labelPosition = "above",
  labelVisible = true,
  textColor = "white",
  steps = false,
}) => {
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const knobRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(value);

  const convertRange = (
    oldMin: number,
    oldMax: number,
    newMin: number,
    newMax: number,
    oldValue: number,
  ): number => {
    if (steps) {
      const valueRange = oldMax - oldMin;
      const stepSizeDegrees = degrees / valueRange;
      const stepNumber = Math.round(
        (oldValue - oldMin) * (valueRange / degrees),
      );
      return stepNumber * stepSizeDegrees + startAngle;
    }
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  };

  const initialDeg = convertRange(min, max, startAngle, endAngle, value);
  const [deg, setDeg] = useState(initialDeg);

  const getDeg = (
    cX: number,
    cY: number,
    pts: { x: number; y: number },
  ): number => {
    const x = pts.x - cX;
    const y = pts.y - cY;
    let localDeg: number = (Math.atan2(y, x) * 180) / Math.PI;
    localDeg += 90;
    if (localDeg < 0) localDeg += 360;
    return Math.min(Math.max(startAngle, localDeg), endAngle);
  };

  const startDrag = (dragEvent: React.MouseEvent<HTMLDivElement>): void => {
    dragEvent.preventDefault();
    if (!knobRef?.current) return;

    const knob = knobRef.current.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (mouseEvent: MouseEvent): void => {
      let newDeg = getDeg(mouseEvent.clientX, mouseEvent.clientY, pts);
      if (steps) {
        const valueRange = max - min;
        const stepSizeDegrees = degrees / valueRange;
        newDeg =
          Math.round((newDeg - startAngle) / stepSizeDegrees) *
            stepSizeDegrees +
          startAngle;
      }
      setDeg(newDeg);

      // Convert the degrees back to the value
      const newValue = Math.round(
        ((newDeg - startAngle) * (max - min)) / degrees + min,
      );

      if (newValue !== prevValueRef.current) {
        prevValueRef.current = newValue;
        onChange(newValue); // Correctly pass the value
      }
    };

    const stopDrag = (): void => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", stopDrag);
  };

  const outerStyle = { width: size, height: size };
  const innerStyle = {
    width: size,
    height: size,
    transform: `rotate(${deg}deg)`,
  };

  return (
    <StyledJupiterKnobWrapper>
      {labelVisible && labelPosition === "above" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
        />
      )}
      <StyledJupiterOuterKnobWrapper $size={size}>
        <StyledJupiterKnobMarker $x={-24} $y={72}>
          ADV
        </StyledJupiterKnobMarker>
        <StyledJupiterKnobMarker $x={-40} $y={18}>
          SHOES
        </StyledJupiterKnobMarker>
        <StyledJupiterKnobMarker $x={38} $y={-12}>
          SPEC
        </StyledJupiterKnobMarker>
        <StyledJupiterKnobMarker $x={100} $y={18}>
          COCK
        </StyledJupiterKnobMarker>
        <StyledJupiterKnobMarker $x={103} $y={72}>
          ALL
        </StyledJupiterKnobMarker>

        <StyledJupiterRadialLabels $file="92knob" />
        <StyledJupiterOuterKnob
          style={outerStyle}
          $margin={9}
          onMouseDown={startDrag}
          ref={knobRef}
        >
          <StyledJupiterInnerKnob style={innerStyle} $deg={deg} $snap={steps}>
            <StyledJupiterGrip />
          </StyledJupiterInnerKnob>
        </StyledJupiterOuterKnob>
      </StyledJupiterOuterKnobWrapper>
      {labelVisible && labelPosition === "below" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
        />
      )}
    </StyledJupiterKnobWrapper>
  );
};

export default JupiterKnob;
