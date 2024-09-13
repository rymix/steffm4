/* eslint-disable react/no-unescaped-entities */
import {
  StyledNotesImage,
  StyledNotesShadowImage,
  StyledOutRun,
  StyledOutRunHand,
  StyledOutRunText,
  StyledOutRunTextShadow,
  StyledOutRunTextShadowWrapper,
  StyledOutRunTextWrapper,
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
  const [direction, setDirection] = useState(1);

  const {
    track: { details: trackDetails },
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
        <StyledOutRunHand src={hand}></StyledOutRunHand>
      </StyledOutRun>
    </StyledOutRunWrapper>
  );
};

export default OutRun;
