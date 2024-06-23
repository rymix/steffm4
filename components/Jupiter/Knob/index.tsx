import { useRef, useState } from "react";
import styled from "styled-components";

// Styled Components
const KnobWrapper = styled.div`
  display: flex;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const OuterKnob = styled.div`
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(100% 70%, #666 6%, #333 90%);
  box-shadow:
    0 5px 15px 2px #333,
    0 0 5px 3px #333,
    0 0 0 6px #444;
  margin: ${(props) => props.margin}px;
`;

const InnerKnob = styled.div`
  border-radius: 50%;
  transform: rotate(${(props) => props.deg}deg);
`;

const Grip = styled.div`
  position: absolute;
  width: 3px;
  height: 10px;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #e43728;
  box-shadow: 0 0 3px 1px black;
`;

const Knob = ({
  size = 150,
  min = 10,
  max = 30,
  degrees = 270,
  value = 0,
  color,
  onChange,
}) => {
  const fullAngle = degrees;
  const startAngle = (360 - degrees) / 2;
  const endAngle = startAngle + degrees;
  const margin = size * 0.15;
  const knobRef = useRef(null);

  const convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  };

  const initialDeg = Math.floor(
    convertRange(min, max, startAngle, endAngle, value),
  );
  const [deg, setDeg] = useState(initialDeg);

  const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    deg += (x < 0 && y >= 0) || (x < 0 && y < 0) ? 90 : 270;
    return Math.min(Math.max(startAngle, deg), endAngle);
  };

  const startDrag = (e) => {
    e.preventDefault();
    const knob = knobRef.current.getBoundingClientRect();
    const pts = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2,
    };
    const moveHandler = (e) => {
      const newDeg = getDeg(e.clientX, e.clientY, pts);
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

  const oStyle = { width: size, height: size, margin };
  const iStyle = { width: size, height: size, transform: `rotate(${deg}deg)` };

  return (
    <KnobWrapper size={size}>
      <OuterKnob style={oStyle} onMouseDown={startDrag} ref={knobRef}>
        <InnerKnob style={iStyle} deg={deg}>
          <Grip />
        </InnerKnob>
      </OuterKnob>
    </KnobWrapper>
  );
};

export default Knob;
