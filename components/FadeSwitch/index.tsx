import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const FadeSwitch: React.FC = () => {
  const [isFirstGradientVisible, setIsFirstGradientVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstGradientVisible((prev) => !prev);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <FadeDiv isVisible={isFirstGradientVisible} gradient={gradient1} />
      <FadeDiv isVisible={!isFirstGradientVisible} gradient={gradient2} />
    </Container>
  );
};

export default FadeSwitch;

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

const animationRule1 = () => css`
  ${gradientAnimation1} 5s ease infinite;
`;

const animationRule2 = () => css`
  ${gradientAnimation2} 24s ease infinite;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
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

const FadeDiv = styled.div<{ isVisible: boolean; gradient: any }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${(props) => props.gradient};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
  z-index: ${(props) => (props.isVisible ? 1 : 0)};
`;
