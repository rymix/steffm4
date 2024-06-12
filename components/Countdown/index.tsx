import React from "react";

interface CountdownProps {
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  return <div>{seconds}</div>;
};

export default Countdown;
