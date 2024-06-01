import { Container, FadeDiv } from "components/FadeSwitch/StyledFadeSwitch";
import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useState } from "react";
import type { RuleSet } from "styled-components";
import { css, keyframes, useTheme } from "styled-components";

const generateRandomDuration = (min: number, max: number): number => {
  const range = max - min + 1;
  const randomNumber = Math.floor(Math.random() * range);
  return randomNumber + min;
};
const generateRandomDegree = (): number => {
  return Math.floor(Math.random() * 360) + 1;
};

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

const FadeSwitch: React.FC = () => {
  const {
    track: { sectionNumber },
  } = useMixcloud();
  const [isFirstGradientVisible, setIsFirstGradientVisible] = useState(true);
  const [duration1, setDuration1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [degree1, setDegree1] = useState(0);
  const [degree2, setDegree2] = useState(0);
  const [colors1, setColors1] = useState<string[]>(colorSets[0]);
  const [colors2, setColors2] = useState<string[]>(colorSets[1]);
  const [skipFirstUpdate, setSkipFirstUpdate] = useState(true);

  const theme = useTheme();
  const { max, min } = theme.sizes.background.duration;

  const getRandomColors = (excludeColors: string[]): string[] => {
    const availableColors = colorSets.filter(
      (colorSet) => colorSet !== excludeColors,
    );
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  };

  useEffect(() => {
    if (skipFirstUpdate) {
      // Skip the first update
      setSkipFirstUpdate(false);
    } else {
      // Update gradients on sectionNumber change
      setIsFirstGradientVisible((prev) => {
        if (prev) {
          setDegree2(generateRandomDegree());
          setDuration2(generateRandomDuration(min, max));
          setColors2(getRandomColors(colors1));
        } else {
          setDegree1(generateRandomDegree());
          setDuration1(generateRandomDuration(min, max));
          setColors1(getRandomColors(colors2));
        }
        return !prev;
      });
    }
  }, [sectionNumber]);

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

  const gradient1 = (
    degree: number,
    duration: number,
    colors: string[],
  ): RuleSet<object> => css`
    background: linear-gradient(${degree}deg, ${colors.join(", ")});
    background-size: 300% 300%;
    animation: ${animationRule1(duration)};
  `;

  const gradient2 = (
    degree: number,
    duration: number,
    colors: string[],
  ): RuleSet<object> => css`
    background: linear-gradient(${degree}deg, ${colors.join(", ")});
    background-size: 180% 180%;
    animation: ${animationRule2(duration)};
  `;

  return (
    <Container>
      <FadeDiv
        $isVisible={isFirstGradientVisible}
        $gradient={gradient1(degree1, duration1, colors1)}
      />
      <FadeDiv
        $isVisible={!isFirstGradientVisible}
        $gradient={gradient2(degree2, duration2, colors2)}
      />
    </Container>
  );
};

export default FadeSwitch;
