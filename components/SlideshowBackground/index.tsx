import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const images = ["stefcitrus.png", "stefdeephouse.png", "steffmgooglelogo.png"];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BackgroundImage = styled.div<{ src: string; isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 2s;
  transition: opacity 2s ease-in-out;
`;

const SlideshowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const SlideshowBackground: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsVisible(true);
      }, 2000); // Match this duration with the animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SlideshowWrapper>
      {images.map((src, index) => (
        <BackgroundImage
          key={index}
          src={`backgrounds/${src}`}
          isVisible={index === currentImageIndex && isVisible}
        />
      ))}
    </SlideshowWrapper>
  );
};

export default SlideshowBackground;
