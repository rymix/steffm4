import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Color sets
const colorSets = [
  ["#dce25e", "#3487f9", "#8ff05e", "#f204ff"],
  ["#3a52aa", "#5ae409", "#9b61c4", "#3ad1ef", "#7face7", "#4315d1"],
  ["#bb3886", "#67f0f7", "#ba1354", "#4f9f5c", "#400d4d", "#4dda3a"],
  ["#8f894d", "#a57e77", "#6461e0", "#dd8354", "#264cea"],
  ["#747266", "#15bacc", "#f9d298", "#361ac1"],
  ["#354185", "#fa6d37", "#a5fc8a", "#32ac22", "#b0faa1", "#ff6cf"],
  ["#a800b5", "#ffaa2e", "#3e65aa", "#925fd4", "#4bdb6b"],
  ["#b98f8e", "#700972", "#927fc6", "#f73e43", "#6e50e5"],
  ["#431231", "#d1b048", "#bdd7b9", "#6658ed"],
  ["#13851b", "#96c78b", "#d0ce03", "#76ad2f", "#752a35"],
  ["#f5b843", "#3ed219", "#3e6dbf", "#a51e4c"],
  ["#e9a709", "#a4cc38", "#94924", "#556411", "#7fffeb", "#ee2100"],
  ["#f3411b", "#82567c", "#c4435e", "#c76312", "#e38408"],
  ["#eb706c", "#ecfad9", "#58857c"],
  ["#a74a0b", "#e19e37", "#b9ab41"],
  ["#11bf19", "#886ae2", "#86811b"],
];

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
