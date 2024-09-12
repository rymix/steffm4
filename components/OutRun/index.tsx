/* eslint-disable react/no-unescaped-entities */
import {
  StyledOutRun,
  StyledOutRunHand,
  StyledOutRunText,
  StyledOutRunTextShadow,
  StyledOutRunWrapper,
} from "components/OutRun/StyledOutRun";
import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";
import { setTimeout } from "timers";

export const OutRun: React.FC = () => {
  const [hand, setHand] = React.useState("outrun/hand-none.png");
  const [direction, setDirection] = useState(1);

  const {
    track: { details: trackDetails },
  } = useMixcloud();
  const trackName = trackDetails?.trackName;

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
              }, 500); // Step 6
            }, 1000); // Step 5
          }, 500); // Step 4
        }, 500); // Step 3
      }, 500); // Step 2
    }, 0); // Step 1: Start immediately
  };
  return (
    <>
      <button onClick={() => showHandSequence(setHand)}>
        Show Hand Sequence
      </button>
      <StyledOutRunWrapper>
        <StyledOutRun>
          <img src="outrun/notes.png" />
          <StyledOutRunText>{trackName}</StyledOutRunText>
          <StyledOutRunTextShadow>{trackName}</StyledOutRunTextShadow>
          <StyledOutRunHand src={hand}></StyledOutRunHand>
        </StyledOutRun>
      </StyledOutRunWrapper>
    </>
  );
};

export default OutRun;
