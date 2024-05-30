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
  const [angle, setAngle] = useState(0);
  const [duration, setDuration] = useState(10);
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    // Function to get a random item from an array
    const getRandomItem = (array: any[]) =>
      array[Math.floor(Math.random() * array.length)];

    // Select a random color set
    const colorSet = getRandomItem(colorSets);

    // Generate a gradient string from the color set
    const generateGradient = (colors: string[], angle: number) => {
      return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
    };

    // Set random animation properties
    const randomAngle = Math.floor(Math.random() * 360);
    const randomDuration = Math.floor(Math.random() * 11) + 5; // Duration between 5 and 15 seconds

    setAngle(randomAngle);
    setDuration(randomDuration);
    setGradient(generateGradient(colorSet, randomAngle));
  }, []);

  return (
    <GradientBackground angle={angle} duration={duration} gradient={gradient} />
  );
};

export default AnimatedGradientBackground;
