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
  const [showHand, setShowHand] = React.useState(false);
  const [handAnimationStartTick, setHandAnimationStartTick] = useState<
    number | null
  >(null);

  const [tree, setTree] = React.useState("outrun/tree-1.png");
  const [frequency, setFrequency] = useState("87.5");
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [tick, setTick] = useState(0); // Global timer tick

  const {
    track: { details: trackDetails },
    widget: { playing, volume },
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
    if (handAnimationStartTick === null) return; // Do nothing if hand animation hasn't started yet

    if (showHand) {
      // const handTick = tick % 30; // 30 ticks = 7.5s (assuming 250ms per tick)
      const animationTick = (tick - handAnimationStartTick) % 30; // Calculate the offset from the start tick

      switch (animationTick) {
        case 1:
          setHand(handImages.none);
          break;
        case 2:
          setHand(handImages.hand0);
          break;
        case 4:
          setHand(handImages.hand2);
          break;
        case 6:
          setHand(Math.random() < 0.5 ? handImages.hand1 : handImages.hand3);
          break;
        case 8:
          setHand(handImages.hand2);
          break;
        case 10:
          setHand(handImages.hand0);
          break;
        case 12:
          setHand(handImages.none);
          setShowHand(false);
          break;
        default:
          break;
      }
    } else {
      setShowHand(false);
    }
  }, [tick, handAnimationStartTick, showHand]); // Dependency on the global tick

  // Show hand animation if volume, track or playig changes
  useEffect(() => {
    console.log("playing, trackName, volume changed");
    if (playing) {
      setHandAnimationStartTick(tick); // Record the current tick when playing changes
      setShowHand(true);
    } else {
      setHand(handImages.none); // Reset hand when not playing
    }
  }, [playing, trackName, volume]);

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
    const randomFrequency = (Math.random() * (108 - 87.5) + 87.5).toFixed(1);
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
        <StyledOutRunHand src={hand} />
      </StyledOutRun>
    </StyledOutRunWrapper>
  );
};

export default OutRun;
