import { Container, FadeDiv } from "components/FadeSwitch/StyledFadeSwitch";
import React, { useEffect, useState } from "react";
import type { RuleSet } from "styled-components";
import { css, keyframes } from "styled-components";

const generateRandomDuration = (): number => Math.floor(Math.random() * 26) + 5;

const FadeSwitch: React.FC = () => {
  const [isFirstGradientVisible, setIsFirstGradientVisible] = useState(true);
  const [duration1, setDuration1] = useState(generateRandomDuration());
  const [duration2, setDuration2] = useState(generateRandomDuration());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstGradientVisible((prev) => !prev);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const gradientAnimation1 = css`
    ${keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `}
  `;

  const gradientAnimation2 = css`
    ${keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `}
  `;

  const animationDuration1 = (): RuleSet<object> => css`5s`;

  const animationDuration2 = (): RuleSet<object> => css`15s`;

  const animationRule1 = (): RuleSet<object> => css`
    ${gradientAnimation1} ${animationDuration1} ease infinite;
  `;

  const animationRule2 = (): RuleSet<object> => css`
    ${gradientAnimation2} ${animationDuration2} ease infinite;
  `;

  const gradient1 = css`
    background: linear-gradient(
      123deg,
      #4a6971,
      #7146ff,
      #f48a70,
      #37f297,
      #5662fc
    );
    background-size: 300% 300%;
    animation: ${animationRule1};
  `;

  const gradient2 = css`
    background: linear-gradient(239deg, #e53000, #e2cb5b, #f97827);
    background-size: 180% 180%;
    animation: ${animationRule2};
  `;

  return (
    <Container>
      <FadeDiv $isVisible={isFirstGradientVisible} $gradient={gradient1} />
      <FadeDiv $isVisible={!isFirstGradientVisible} $gradient={gradient2} />
    </Container>
  );
};

export default FadeSwitch;
