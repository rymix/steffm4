import React, { useState } from "react";
import { Knob } from "react-rotary-knob";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "6rem",
};

const JupiterKnob: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <div style={styles}>
      <Knob
        style={{ display: "inline-block" }}
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        unlockDistance={0}
        preciseMode
        width={200}
        height={200}
        clampMin={0}
        clampMax={300}
        rotateDegrees={210}
      />
      <div>{value}</div>
    </div>
  );
};

export default JupiterKnob;
