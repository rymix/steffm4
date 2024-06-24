import {
  StyledJupiterGrip,
  StyledJupiterInnerKnob,
  StyledJupiterKnobWrapper,
  StyledJupiterOuterKnob,
  StyledJupiterOuterKnobWrapper,
  StyledJupiterRadialLabels,
} from "components/Jupiter/Knob/StyledJupiterKnob";
import type { JupiterKnobProps } from "components/Jupiter/Knob/types";
import { useRef, useState } from "react";

import JupiterLabel from "../Label";

const convertRange = (
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number,
): number => {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};

const JupiterKnob: React.FC<JupiterKnobProps> = ({
  size = 0,
  min = 10,
  max = 30,
  degrees = 270,
  value = 0,
  onChange,
  label,
  labelPosition = "above",
  textColor = "white",
}) => {
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const knobRef = useRef<HTMLDivElement>(null);

  const initialDeg = Math.floor(
    convertRange(min, max, startAngle, endAngle, value),
  );
  const [deg, setDeg] = useState(initialDeg);

  const getDeg = (
    cX: number,
    cY: number,
    pts: { x: number; y: number },
  ): number => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let localDeg: number = (Math.atan(y / x) * 180) / Math.PI;
    localDeg += (x < 0 && y >= 0) || (x < 0 && y < 0) ? 90 : 270;
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
      const newDeg = getDeg(mouseEvent.clientX, mouseEvent.clientY, pts);
      setDeg(newDeg);
      const newValue = Math.floor(
        convertRange(startAngle, endAngle, min, max, newDeg),
      );
      onChange(newValue);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  const outerStyle = { width: size, height: size };
  const innerStyle = {
    width: size,
    height: size,
    transform: `rotate(${deg}deg)`,
  };

  return (
    <StyledJupiterKnobWrapper>
      {labelPosition === "above" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
        />
      )}
      <StyledJupiterOuterKnobWrapper $size={size}>
        <StyledJupiterRadialLabels $file="knob-volume" />
        <StyledJupiterOuterKnob
          style={outerStyle}
          $margin={9}
          onMouseDown={startDrag}
          ref={knobRef}
        >
          <StyledJupiterInnerKnob style={innerStyle} $deg={deg}>
            <StyledJupiterGrip />
          </StyledJupiterInnerKnob>
        </StyledJupiterOuterKnob>
      </StyledJupiterOuterKnobWrapper>
      {labelPosition === "below" && (
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
