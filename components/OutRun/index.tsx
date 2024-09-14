import {
  StyledNotesImage,
  StyledNotesShadowImage,
  StyledOutRun,
  StyledOutRunAudio,
  StyledOutRunClouds,
  StyledOutRunHand,
  StyledOutRunNumber,
  StyledOutRunText,
  StyledOutRunTextShadow,
  StyledOutRunTextShadowWrapper,
  StyledOutRunTextWrapper,
  StyledOutRunTree,
  StyledOutRunWrapper,
} from "components/OutRun/StyledOutRun";
import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect, useState } from "react";
import {
  getScaledFontSize,
  removeParentheses,
  removeTextAfterComma,
} from "utils/functions";

export const OutRun: React.FC = () => {
  const [hand, setHand] = React.useState("outrun/hand-none.png");
  const [tree, setTree] = React.useState("outrun/tree-1.png");
  const [frequency, setFrequency] = useState("87.5");
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [tick, setTick] = useState(0); // Global timer tick

  const {
    track: { details: trackDetails },
    widget: { playing },
  } = useMixcloud();
  const trackName = trackDetails?.trackName || "";

  let cleanTrackName = removeParentheses(trackName);
  cleanTrackName = removeTextAfterComma(cleanTrackName);

  const fontSize = getScaledFontSize(cleanTrackName, 22, 44, 26, 52);

  const handImages = {
    none: "outrun/hand-none.png", // No image
    hand0: "outrun/hand-0.png",
    hand1: "outrun/hand-1.png",
    hand2: "outrun/hand-2.png",
    hand3: "outrun/hand-3.png",
  };

  // Global timer that ticks every 250ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prevTick) => prevTick + 1); // Increment tick
    }, 250); // Global tick interval

    return () => clearInterval(interval);
  }, []);

  // Hand animation logic based on global timer
  useEffect(() => {
    const handTick = tick % 30; // 30 ticks = 7.5s (assuming 250ms per tick)

    if (handTick === 1) {
      setHand(handImages.none);
    } else if (handTick === 2) {
      setHand(handImages.hand0);
    } else if (handTick === 4) {
      setHand(handImages.hand2);
    } else if (handTick === 6) {
      setHand(Math.random() < 0.5 ? handImages.hand1 : handImages.hand3);
    } else if (handTick === 8) {
      setHand(handImages.hand2);
    } else if (handTick === 10) {
      setHand(handImages.hand0);
    } else if (handTick === 12) {
      setHand(handImages.none);
    }
  }, [tick]); // Dependency on the global tick

  // Cloud movement based on global timer
  useEffect(() => {
    if (tick % 4 === 0) {
      // Move cloud every 1 second (4 ticks)
      setBackgroundPosition((prev) => prev - 4);
    }
  }, [tick]);

  // Tree switching logic based on global timer
  useEffect(() => {
    if (tick % 8 === 0) {
      // Switch tree every 2 seconds (8 ticks)
      setTree((prevTree) =>
        prevTree === "outrun/tree-1.png"
          ? "outrun/tree-2.png"
          : "outrun/tree-1.png",
      );
    }
  }, [tick]);

  // Frequency logic based on track change
  useEffect(() => {
    const randomFrequency = (Math.random() * (108.0 - 87.5) + 87.5).toFixed(1);
    setFrequency(randomFrequency);
  }, [trackName]);

  return (
    <StyledOutRunWrapper>
      <StyledOutRun>
        <StyledOutRunTextShadowWrapper $fontSize={fontSize}>
          <StyledNotesShadowImage
            src="outrun/notes-shadow.png"
            $fontSize={fontSize}
          />
          <StyledOutRunTextShadow $fontSize={fontSize}>
            {cleanTrackName}
          </StyledOutRunTextShadow>
        </StyledOutRunTextShadowWrapper>
        <StyledOutRunTextWrapper $fontSize={fontSize}>
          <StyledNotesImage src="outrun/notes.png" $fontSize={fontSize} />
          <StyledOutRunText $fontSize={fontSize}>
            {cleanTrackName}
          </StyledOutRunText>
        </StyledOutRunTextWrapper>
        <StyledOutRunTree src={tree} />
        <StyledOutRunClouds
          style={{ backgroundPositionX: `${backgroundPosition}px` }}
        />
        <StyledOutRunNumber>{frequency}</StyledOutRunNumber>
        <StyledOutRunAudio
          src={playing ? "outrun/audio-loop.gif" : "outrun/anim/audio-0.png"}
        />
        <StyledOutRunHand src={hand}></StyledOutRunHand>
      </StyledOutRun>
    </StyledOutRunWrapper>
  );
};

export default OutRun;
