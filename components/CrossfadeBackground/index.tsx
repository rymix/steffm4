import AnimatedGradientBackground from "components/Background";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CrossfadeWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: -1000;
`;

const FadeWrapper = styled.div<{ opacity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 1s ease-in-out;
`;

const CrossfadeBackground: React.FC = () => {
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [dummyState, setDummyState] = useState(0);
  const [firstOpacity, setFirstOpacity] = useState(1);
  const [secondOpacity, setSecondOpacity] = useState(0);

  useEffect(() => {
    // Change the dummy state variable every 5 seconds for demonstration
    const interval = setInterval(() => {
      setDummyState((prevState) => prevState + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const steps = 20; // Number of steps in the transition
    const stepDuration = 100; // Duration of each step in milliseconds
    let currentStep = 0;

    const transition = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      if (isFirstVisible) {
        setFirstOpacity(1 - progress);
        setSecondOpacity(progress);
      } else {
        setFirstOpacity(progress);
        setSecondOpacity(1 - progress);
      }

      if (currentStep >= steps) {
        clearInterval(transition);
        setIsFirstVisible((prev) => !prev);
        // Reset the invisible background after the transition
        setTimeout(() => {
          setDummyState((prevState) => prevState + 1);
        }, 0); // Immediately reset after the transition
      }
    }, stepDuration);

    return () => clearInterval(transition);
  }, [dummyState, isFirstVisible]);

  return (
    <CrossfadeWrapper>
      <FadeWrapper opacity={firstOpacity}>
        <AnimatedGradientBackground
          key={isFirstVisible ? dummyState : dummyState - 1}
        />
      </FadeWrapper>
      <FadeWrapper opacity={secondOpacity}>
        <AnimatedGradientBackground
          key={isFirstVisible ? dummyState - 1 : dummyState}
        />
      </FadeWrapper>
    </CrossfadeWrapper>
  );
};

export default CrossfadeBackground;
