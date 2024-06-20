import { StyledGradientBackground } from "components/GradientBackground/StyledGradientBackground";
import { useSession } from "contexts/session";
import type { Colours } from "contexts/session/types";
import { backgrounds } from "polished";
import React from "react";

const backgrounds: Colours[] = [
  {
    gradient:
      "linear-gradient(135deg, hsla(331, 78%, 69%, 1) 0%, hsla(238, 82%, 70%, 1) 100%)",
    primary: "hsla(96, 78%, 50%, 1)",
    secondary: "hsla(96, 50%, 70%, 1)",
    tertiary: "hsla(180, 50%, 60%, 1)",
    text: "hsla(0, 0%, 100%, 1)",
  },
  {
    gradient: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
    primary: "hsla(120, 100%, 50%, 1)",
    secondary: "hsla(120, 50%, 70%, 1)",
    tertiary: "hsla(0, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(90deg, #DE26A0 0%, #068FF1 100%)",
    primary: "hsla(140, 100%, 50%, 1)",
    secondary: "hsla(140, 50%, 70%, 1)",
    tertiary: "hsla(60, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    primary: "hsla(140, 75%, 65%, 1)",
    secondary: "hsla(140, 40%, 80%, 1)",
    tertiary: "hsla(60, 75%, 65%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(328, 75%, 45%, 1) 0%, hsla(269, 85%, 41%, 1) 100%)",
    primary: "hsla(148, 75%, 45%, 1)",
    secondary: "hsla(148, 50%, 65%, 1)",
    tertiary: "hsla(40, 75%, 45%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(315deg, hsla(348, 88%, 66%, 1) 0%, hsla(36, 89%, 68%, 1) 100%)",
    primary: "hsla(188, 88%, 50%, 1)",
    secondary: "hsla(188, 50%, 68%, 1)",
    tertiary: "hsla(220, 88%, 66%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(315deg, hsla(211, 96%, 62%, 1) 0%, hsla(295, 94%, 76%, 1) 100%)",
    primary: "hsla(31, 96%, 62%, 1)",
    secondary: "hsla(31, 50%, 76%, 1)",
    tertiary: "hsla(10, 96%, 62%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(277, 79%, 84%, 1) 0%, hsla(204, 95%, 77%, 1) 100%)",
    primary: "hsla(97, 79%, 65%, 1)",
    secondary: "hsla(97, 50%, 84%, 1)",
    tertiary: "hsla(50, 79%, 77%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(45deg, #FF2CAA 0%, #ffff01 100%)",
    primary: "hsla(210, 100%, 50%, 1)",
    secondary: "hsla(210, 50%, 70%, 1)",
    tertiary: "hsla(150, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(135deg, hsla(171, 87%, 67%, 1) 0%, hsla(236, 100%, 72%, 1) 100%)",
    primary: "hsla(351, 87%, 67%, 1)",
    secondary: "hsla(351, 50%, 72%, 1)",
    tertiary: "hsla(300, 87%, 67%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
    primary: "hsla(150, 100%, 50%, 1)",
    secondary: "hsla(150, 50%, 70%, 1)",
    tertiary: "hsla(50, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    primary: "hsla(190, 100%, 50%, 1)",
    secondary: "hsla(190, 50%, 70%, 1)",
    tertiary: "hsla(90, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(45deg, #f286a0 0%, #fdc588 100%)",
    primary: "hsla(146, 100%, 50%, 1)",
    secondary: "hsla(146, 50%, 70%, 1)",
    tertiary: "hsla(36, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
    primary: "hsla(118, 68%, 90%, 1)",
    secondary: "hsla(118, 50%, 91%, 1)",
    tertiary: "hsla(200, 68%, 90%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(277, 79%, 84%, 1) 0%, hsla(204, 95%, 77%, 1) 100%)",
    primary: "hsla(97, 79%, 65%, 1)",
    secondary: "hsla(97, 50%, 84%, 1)",
    tertiary: "hsla(50, 79%, 77%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(135deg, hsla(39, 51%, 85%, 1) 0%, hsla(318, 79%, 79%, 1) 100%)",
    primary: "hsla(219, 51%, 85%, 1)",
    secondary: "hsla(219, 50%, 79%, 1)",
    tertiary: "hsla(100, 51%, 85%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(45deg, #5757D9 0%, #21D9F7 100%)",
    primary: "hsla(195, 100%, 50%, 1)",
    secondary: "hsla(195, 50%, 70%, 1)",
    tertiary: "hsla(345, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
    primary: "hsla(120, 100%, 50%, 1)",
    secondary: "hsla(120, 50%, 70%, 1)",
    tertiary: "hsla(60, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
    primary: "hsla(190, 100%, 50%, 1)",
    secondary: "hsla(190, 50%, 70%, 1)",
    tertiary: "hsla(90, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
    primary: "hsla(140, 100%, 50%, 1)",
    secondary: "hsla(140, 50%, 70%, 1)",
    tertiary: "hsla(60, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
    primary: "hsla(300, 100%, 50%, 1)",
    secondary: "hsla(300, 50%, 70%, 1)",
    tertiary: "hsla(60, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(135deg, hsla(187, 82%, 65%, 1) 0%, hsla(327, 67%, 74%, 1) 100%)",
    primary: "hsla(7, 82%, 65%, 1)",
    secondary: "hsla(7, 50%, 74%, 1)",
    tertiary: "hsla(50, 82%, 65%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(298, 68%, 90%, 1) 0%, hsla(30, 82%, 91%, 1) 100%)",
    primary: "hsla(118, 68%, 90%, 1)",
    secondary: "hsla(118, 50%, 91%, 1)",
    tertiary: "hsla(200, 68%, 90%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(186, 100%, 69%, 1) 100%)",
    primary: "hsla(37, 100%, 50%, 1)",
    secondary: "hsla(37, 50%, 69%, 1)",
    tertiary: "hsla(0, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(135deg, hsla(1, 84%, 80%, 1) 0%, hsla(56, 59%, 67%, 1) 100%)",
    primary: "hsla(181, 84%, 50%, 1)",
    secondary: "hsla(181, 50%, 67%, 1)",
    tertiary: "hsla(140, 84%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(180deg, hsla(321, 42%, 48%, 1) 0%, hsla(343, 80%, 65%, 1) 100%)",
    primary: "hsla(141, 42%, 48%, 1)",
    secondary: "hsla(141, 50%, 65%, 1)",
    tertiary: "hsla(100, 42%, 48%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(180deg, hsla(280, 84%, 41%, 1) 0%, hsla(218, 97%, 56%, 1) 100%)",
    primary: "hsla(100, 84%, 41%, 1)",
    secondary: "hsla(100, 50%, 56%, 1)",
    tertiary: "hsla(50, 84%, 41%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(56, 83%, 59%, 1) 0%, hsla(307, 100%, 66%, 1) 100%)",
    primary: "hsla(236, 83%, 59%, 1)",
    secondary: "hsla(236, 50%, 66%, 1)",
    tertiary: "hsla(300, 83%, 59%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(242, 58%, 73%, 1) 0%, hsla(157, 72%, 82%, 1) 100%)",
    primary: "hsla(62, 58%, 73%, 1)",
    secondary: "hsla(62, 50%, 82%, 1)",
    tertiary: "hsla(100, 58%, 73%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient: "linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
    primary: "hsla(10, 100%, 50%, 1)",
    secondary: "hsla(10, 50%, 70%, 1)",
    tertiary: "hsla(150, 100%, 50%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(329, 91%, 65%, 1) 0%, hsla(350, 91%, 65%, 1) 100%)",
    primary: "hsla(159, 91%, 65%, 1)",
    secondary: "hsla(159, 50%, 65%, 1)",
    tertiary: "hsla(0, 91%, 65%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(335, 91%, 70%, 1) 0%, hsla(49, 89%, 61%, 1) 100%)",
    primary: "hsla(165, 91%, 70%, 1)",
    secondary: "hsla(165, 50%, 61%, 1)",
    tertiary: "hsla(0, 91%, 70%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(312, 66%, 76%, 1) 0%, hsla(234, 93%, 67%, 1) 100%)",
    primary: "hsla(132, 66%, 76%, 1)",
    secondary: "hsla(132, 50%, 67%, 1)",
    tertiary: "hsla(200, 66%, 76%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
  {
    gradient:
      "linear-gradient(90deg, hsla(277, 79%, 84%, 1) 0%, hsla(204, 95%, 77%, 1) 100%)",
    primary: "hsla(97, 79%, 65%, 1)",
    secondary: "hsla(97, 50%, 84%, 1)",
    tertiary: "hsla(50, 79%, 77%, 1)",
    text: "hsla(0, 0%, 0%, 1)",
  },
];
export const GradientBackground: React.FC = () => {
  const { setColours } = useSession();

  setColours(backgrounds[0]);

  const changeBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setColours(backgrounds[randomIndex]);
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
