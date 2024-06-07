import { useEffect, useRef, useState } from "react";

const TimerDemo = () => {
  const [seconds, setSeconds] = useState(5);

  const [isActive, setIsActive] = useState(false);

  const [counter, setCounter] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setCounter((prevCounter) => prevCounter + 1);

      clearTimeout(timerRef.current);

      timerRef.current = null;

      setIsActive(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [isActive, seconds]);

  const startTimer = () => {
    if (isActive) {
      setCounter((prevCounter) => prevCounter + 1);
    }

    setSeconds(5);

    setIsActive(true);

    clearTimeout(timerRef.current);

    timerRef.current = null;
  };

  const stopTimer = () => {
    setIsActive(false);

    clearTimeout(timerRef.current);

    timerRef.current = null;
  };

  return (
    <div>
      <h1>Seconds: {seconds}</h1>

      <h2>Counter: {counter}</h2>

      <button onClick={startTimer}>Start</button>

      <button onClick={stopTimer} disabled={!isActive}>
        Stop
      </button>
    </div>
  );
};

export default TimerDemo;
