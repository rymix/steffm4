import { StyledGradientBackground } from "components/GradientBackground/StyledGradientBackground";
import type { Background } from "components/GradientBackground/types";
import React, { useState } from "react";

const backgrounds: Background = [
  {
    gradient: `linear-gradient(135deg, hsla(331, 78%, 69%, 1) 0%, hsla(238, 82%, 70%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, #DE26A0 0%, #068FF1 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(328, 75%, 45%, 1) 0%, hsla(269, 85%, 41%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(315deg, hsla(348, 88%, 66%, 1) 0%, hsla(36, 89%, 68%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(277, 79%, 84%, 1) 0%, hsla(204, 95%, 77%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(45deg, #FF2CAA 0%, #ffff01 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(135deg, hsla(171, 87%, 67%, 1) 0%, hsla(236, 100%, 72%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, #00DBDE 0%,  #FC00FF  100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(160deg, #0093E9 0%,  #80D0C7  100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(45deg, #f286a0 0%, #fdc588 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(277, 79%, 84%, 1) 0%, hsla(204, 95%, 77%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(135deg, hsla(39, 51%, 85%, 1) 0%, hsla(318, 79%, 79%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(45deg, #5757D9 0%, #21D9F7 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(135deg, hsla(187, 82%, 65%, 1) 0%, hsla(327, 67%, 74%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(135deg, hsla(1, 84%, 80%, 1) 0%, hsla(56, 59%, 67%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(180deg, hsla(321, 42%, 48%, 1) 0%, hsla(343, 80%, 65%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(180deg, hsla(280, 84%, 41%, 1) 0%, hsla(218, 97%, 56%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(56, 83%, 59%, 1) 0%, hsla(307, 100%, 66%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(242, 58%, 73%, 1) 0%, hsla(157, 72%, 82%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(132deg, #F4D03F  0%, #16A085 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(329, 91%, 65%, 1) 0%, hsla(350, 91%, 65%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(335, 91%, 70%, 1) 0%, hsla(49, 89%, 61%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(312, 66%, 76%, 1) 0%, hsla(234, 93%, 67%, 1) 100%)`,
    text: "black",
  },
  {
    gradient: `linear-gradient(90deg, hsla(277, 79%, 84%, 1) 0%, hsla(204, 95%, 77%, 1) 100%)`,
    text: "black",
  },
];

export const GradientBackground: React.FC = () => {
  const [currentBackground, setCurrentBackground] = useState(
    backgrounds[0].gradient,
  );

  const changeBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setCurrentBackground(backgrounds[randomIndex].gradient);
  };

  return (
    <>
      <StyledGradientBackground background={currentBackground} />
      <button
        onClick={changeBackground}
        style={{ position: "relative", zIndex: 1 }}
      >
        Change Background
      </button>
    </>
  );
};

export default GradientBackground;
