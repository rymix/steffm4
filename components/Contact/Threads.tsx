// components/Contact/Threads.tsx
import ThreadsIcon from "public/svg/threads-logo.svg";
import React from "react";
import styled from "styled-components";

// Styled component for the SVG icon
const StyledThreadsIcon = styled(ThreadsIcon)`
  font-size: 2em;
  width: 1em;
  height: 1em;
  fill: rgba(0, 0, 0, 0.7); /* Default color */
  transition: fill 0.3s ease; /* Smooth transition */

  &:hover {
    fill: rgba(0, 0, 0, 1); /* Change to full black on hover */
  }
`;

// Component that returns the SVG with applied styles
const Threads: React.FC = () => {
  return <StyledThreadsIcon aria-label="Threads" />;
};

export default Threads;
