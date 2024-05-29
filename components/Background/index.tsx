import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// List of colors to be used in the gradient
const colors = [
  "#f2f0e6",
  "#b8b5b9",
  "#858288",
  "#646365",
  "#45444e",
  "#3a3956",
  "#212123",
  "#332c41",
  "#434467",
  "#5681c5",
  "#7ec0d1",
  "#aedac8",
  "#ece1a6",
  "#cca170",
  "#a85855",
  "#68566c",
  "#494257",
  "#794c3d",
  "#a17c60",
  "#e2cfb7",
  "#c6d177",
  "#92ae6a",
  "#5e7a79",
  "#50584b",
  "#7a7249",
  "#b3b384",
  "#e7c9c5",
  "#c58fc7",
  "#5d5669",
];

// Keyframes for gradient animation
const generateKeyframes = (angle: number) => keyframes`
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

// Styled component with dynamic gradient animation
const GradientBackground = styled.div<{
  angle: number;
  duration: number;
  gradient: string;
}>`
  width: 100%;
  height: 100vh;
  background: ${({ gradient }) => gradient};
  background-size: 180% 180%;
  animation: ${({ angle }) => generateKeyframes(angle)}
    ${({ duration }) => duration}s ease infinite;
  position: fixed;
  z-index: -100;
  transition: background 10s ease; /* Smooth transition between gradients */
`;

const AnimatedGradientBackground: React.FC = () => {
  const [angle, setAngle] = useState(21);
  const [duration, setDuration] = useState(24);
  const [gradient, setGradient] = useState(
    `linear-gradient(21deg, #874770, #86cebd, #a31c22)`,
  );

  useEffect(() => {
    // Function to get a random color from the list
    const getRandomColor = () =>
      colors[Math.floor(Math.random() * colors.length)];

    // Function to generate a random gradient
    const generateRandomGradient = () => {
      const color1 = getRandomColor();
      const color2 = getRandomColor();
      const color3 = getRandomColor();
      return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
    };

    // Initial gradient update
    const updateGradient = () => {
      setGradient(generateRandomGradient());
    };

    updateGradient();

    // Interval to update gradient colors
    const colorInterval = setInterval(updateGradient, 10000); // Change colors every 10 seconds

    // Interval to update angle
    const angleInterval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 0.1) % 360);
    }, 1000); // Update angle every second

    // Interval to update animation duration
    const durationInterval = setInterval(() => {
      setDuration((prevDuration) => {
        const newDuration = prevDuration + (Math.random() * 0.2 - 0.1); // Slightly adjust duration
        return Math.max(10, Math.min(20, newDuration)); // Keep duration between 10s and 20s
      });
    }, 2000); // Update duration every 2 seconds

    return () => {
      clearInterval(colorInterval);
      clearInterval(angleInterval);
      clearInterval(durationInterval);
    };
  }, [angle]);

  return (
    <GradientBackground angle={angle} duration={duration} gradient={gradient} />
  );
};

export default AnimatedGradientBackground;
