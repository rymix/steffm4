import {
  StyledJupiterGrip,
  StyledJupiterInnerKnob,
  StyledJupiterKnobMarker,
  StyledJupiterKnobWrapper,
  StyledJupiterOuterKnob,
  StyledJupiterOuterKnobWrapper,
} from "components/Jupiter/Knob/StyledJupiterKnob";
import type { JupiterKnobProps } from "components/Jupiter/Knob/types";
import JupiterLabel from "components/Jupiter/Label";
import { useEffect, useRef, useState } from "react";

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
  min = 1,
  max = 4,
  degrees = 260,
  value = 5,
  onChange = () => {},
  label,
  labelPosition = "above",
  labelVisible = true,
  textColor = "white",
  steps = false,
  categories = [],
  onCategoryChange = () => {},
}) => {
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const knobRef = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(value);

  const [deg, setDeg] = useState<number | null>(null); // Initialize to null for SSR

  useEffect(() => {
    // Ensure that the rotation is set after mount
    const initialDeg = convertRange(min, max, startAngle, endAngle, value);
    setDeg(initialDeg);
  }, [value, min, max, startAngle, endAngle]);

  const handleKnobChange = (newValue: number): void => {
    onChange(newValue);
    onCategoryChange(newValue);
  };

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

  const startDrag = (
    dragEvent:
      | React.MouseEvent<HTMLDivElement>
      | React.TouchEvent<HTMLDivElement>,
  ): void => {
    if (dragEvent instanceof MouseEvent) {
      dragEvent.preventDefault();
    }

    if (!knobRef?.current) return;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const preventDefault = (event: TouchEvent): void => {
      event.preventDefault();
    };

    const knob = knobRef.current.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };

    const moveHandler = (moveEvent: MouseEvent | TouchEvent): void => {
      const clientX =
        moveEvent instanceof MouseEvent
          ? moveEvent.clientX
          : moveEvent.touches[0].clientX;
      const clientY =
        moveEvent instanceof MouseEvent
          ? moveEvent.clientY
          : moveEvent.touches[0].clientY;
      let newDeg = getDeg(clientX, clientY, pts);
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
        handleKnobChange(newValue); // Correctly pass the value
      }
    };

    const stopDrag = (): void => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", stopDrag);
      document.removeEventListener("touchmove", preventDefault);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", stopDrag, { passive: false });
    document.addEventListener("touchmove", preventDefault, { passive: false });
  };

  const outerStyle = { width: size, height: size };
  const innerStyle =
    deg !== null
      ? { width: size, height: size, transform: `rotate(${deg}deg)` }
      : { width: size, height: size }; // Default style for SSR

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
        {categories.map((category, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledJupiterKnobMarker key={index} $x={category.x} $y={category.y}>
            {category.shortName}
          </StyledJupiterKnobMarker>
        ))}
        <StyledJupiterOuterKnob
          style={outerStyle}
          $margin={9}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          ref={knobRef}
        >
          <StyledJupiterInnerKnob
            style={innerStyle}
            $deg={deg || 0}
            $snap={steps ? 1 : 0}
          >
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
