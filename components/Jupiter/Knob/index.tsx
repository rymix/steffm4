import { useRef, useState } from "react";
import styled from "styled-components";

// Styled Components
const KnobWrapper = styled.div`
  display: flex;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const Ticks = styled.div`
  position: absolute;
`;

const Tick = styled.div`
  position: absolute;
  background: black;
  box-shadow: inset 0 0 0 0 black;
  width: 3px;
  transition: box-shadow 0.5s;
  &.active {
    box-shadow:
      inset 0 0 5px 2px #509eec,
      0 0 0 1px #369;
  }
`;

const OuterKnob = styled.div`
  border-radius: 50%;
  border: 1px solid #222;
  border-bottom: 5px solid #222;
  background-image: radial-gradient(100% 70%, #666 6%, #333 90%);
  box-shadow:
    0 5px 15px 2px black,
    0 0 5px 3px black,
    0 0 0 12px #444;
  margin: ${(props) => props.margin}px;
`;

const InnerKnob = styled.div`
  border-radius: 50%;
  transform: rotate(${(props) => props.deg}deg);
`;

const Grip = styled.div`
  position: absolute;
  width: 5%;
  height: 5%;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #509eec;
  box-shadow: 0 0 3px 1px black;
`;

const AppWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5em;
`;

const BodyStyle = styled.body`
  margin: 0;
  background-image: radial-gradient(30% 50%, #555 6%, #333 90%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Knob = ({
  size = 150,
  min = 10,
  max = 30,
  numTicks = 0,
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

  const renderTicks = () => {
    const ticks = [];
    const incr = fullAngle / numTicks;
    const sizeWithMargin = margin + size / 2;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      ticks.push({
        deg,
        tickStyle: {
          height: sizeWithMargin + 10,
          left: sizeWithMargin - 1,
          top: sizeWithMargin + 2,
          transform: `rotate(${deg}deg)`,
          transformOrigin: "top",
        },
      });
    }
    return ticks;
  };

  const oStyle = { width: size, height: size, margin };
  const iStyle = { width: size, height: size, transform: `rotate(${deg}deg)` };

  if (color) {
    oStyle.backgroundImage = `radial-gradient(100% 70%,hsl(210, ${deg}%, ${
      deg / 5
    }%),hsl(${Math.random() * 100},20%,${deg / 36}%))`;
  }

  return (
    <KnobWrapper size={size}>
      <Ticks>
        {numTicks
          ? renderTicks().map((tick, i) => (
              <Tick
                key={i}
                className={`tick${tick.deg <= deg ? " active" : ""}`}
                style={tick.tickStyle}
              />
            ))
          : null}
      </Ticks>
      <OuterKnob style={oStyle} onMouseDown={startDrag} ref={knobRef}>
        <InnerKnob style={iStyle} deg={deg}>
          <Grip />
        </InnerKnob>
      </OuterKnob>
    </KnobWrapper>
  );
};

export default Knob;
