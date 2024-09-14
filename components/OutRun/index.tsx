/* eslint-disable react/no-unescaped-entities */
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
import { setTimeout } from "timers";
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

  const showHandSequence = (
    setHand: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    // Start by showing no hand
    setHand(handImages.none);

    setTimeout(() => {
      // Step 2: Show hand-0
      setHand(handImages.hand0);

      setTimeout(() => {
        // Step 3: Show hand-2
        setHand(handImages.hand2);

        setTimeout(() => {
          // Step 4: Randomly show hand-1 or hand-3
          const randomHand =
            Math.random() < 0.5 ? handImages.hand1 : handImages.hand3;
          setHand(randomHand);

          setTimeout(() => {
            // Step 5: Show hand-2
            setHand(handImages.hand2);

            setTimeout(() => {
              // Step 6: Show hand-0
              setHand(handImages.hand0);

              setTimeout(() => {
                // Step 7: Show no hand
                setHand(handImages.none);
              }, 250); // Step 6
            }, 1000); // Step 5
          }, 500); // Step 4
        }, 250); // Step 3
      }, 250); // Step 2
    }, 0); // Step 1: Start immediately
  };

  useEffect(() => {
    showHandSequence(setHand);
    const randomFrequency = (Math.random() * (108.0 - 87.5) + 87.5).toFixed(1);
    setFrequency(randomFrequency);
  }, [trackName]);

  useEffect(() => {
    showHandSequence(setHand);
  }, [playing]);

  useEffect(() => {
    const intervalBackgroundPosition = setInterval(() => {
      setBackgroundPosition((prev) => prev - 4);
    }, 3000);

    return () => clearInterval(intervalBackgroundPosition);
  }, []);

  useEffect(() => {
    const intervalTree = setInterval(() => {
      setTree((prevTree) =>
        prevTree === "outrun/tree-1.png"
          ? "outrun/tree-2.png"
          : "outrun/tree-1.png",
      );
    }, 2000);

    return () => clearInterval(intervalTree);
  }, []); // Empty dependency array to run once on mount

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
