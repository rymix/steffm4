import { Container, FadeDiv } from "components/FadeSwitch/StyledFadeSwitch";
import React, { useEffect, useState } from "react";
import type { RuleSet } from "styled-components";
import { css, keyframes } from "styled-components";

const generateRandomDuration = (): number => Math.floor(Math.random() * 26) + 5;

function generateRandomDegree(): number {
  return Math.floor(Math.random() * 360) + 1;
}

const FadeSwitch: React.FC = () => {
  const [isFirstGradientVisible, setIsFirstGradientVisible] = useState(true);
  const [duration1, setDuration1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [degree1, setDegree1] = useState(0);
  const [degree2, setDegree2] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstGradientVisible((prev) => {
        if (prev) {
          setDegree2(generateRandomDegree());
          setDuration2(generateRandomDuration());
        } else {
          setDegree1(generateRandomDegree());
          setDuration1(generateRandomDuration());
        }
        return !prev;
      });
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const gradientAnimation1 = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  const gradientAnimation2 = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  const animationRule1 = (duration: number): RuleSet<object> => css`
    ${gradientAnimation1} ${duration}s ease infinite;
  `;

  const animationRule2 = (duration: number): RuleSet<object> => css`
    ${gradientAnimation2} ${duration}s ease infinite;
  `;

  const gradient1 = (degree: number, duration: number) => css`
    background: linear-gradient(
      ${degree}deg,
      #4a6971,
      #7146ff,
      #f48a70,
      #37f297,
      #5662fc
    );
    background-size: 300% 300%;
    animation: ${animationRule1(duration)};
  `;

  const gradient2 = (degree: number, duration: number) => css`
    background: linear-gradient(${degree}deg, #e53000, #e2cb5b, #f97827);
    background-size: 180% 180%;
    animation: ${animationRule2(duration)};
  `;

  return (
    <>
      <div>duration1: {duration1}</div>
      <div>duration2: {duration2}</div>
      <div>degree1: {degree1}</div>
      <div>degree2: {degree2}</div>
      <Container>
        <FadeDiv
          $isVisible={isFirstGradientVisible}
          $gradient={gradient1(degree1, duration1)}
        />
        <FadeDiv
          $isVisible={!isFirstGradientVisible}
          $gradient={gradient2(degree2, duration2)}
        />
      </Container>
    </>
  );
};

export default FadeSwitch;
