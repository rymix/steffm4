/* eslint-disable unicorn/prefer-global-this */
/* eslint-disable unicorn/no-negated-condition */
/* eslint-disable unicorn/no-typeof-undefined */
/* eslint-disable unicorn/no-array-push-push */
import {
  StyledDx7Screen,
  StyledDx7ScreenBezel,
  StyledDx7ScreenDebug,
  StyledDx7ScreenMessage,
} from "components/Dx7/Screen/StyledDx7Screen";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef, useState } from "react";
import { DEBUG } from "utils/logger";

const Dx7Screen: React.FC = () => {
  const {
    session: { dx7ScreenLight },
  } = useMixcloud();

  // Simple test messages
  const testMessages = ["Hello World", "Hello World 2"];

  // Animation and display state
  const [displayMessage, setDisplayMessage] = useState<string>(testMessages[0]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [nextMessage, setNextMessage] = useState<string>("");
  const [animationState, setAnimationState] = useState<
    "idle" | "scrolling-out" | "dual-scroll"
  >("idle");
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [showNext, setShowNext] = useState<boolean>(false);

  // Animation refs
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentOffsetValueRef = useRef<number>(0);
  const nextOffsetValueRef = useRef<number>(0);
  const dualScrollStartedRef = useRef<boolean>(false);
  const animationStateRef = useRef<"idle" | "scrolling-out" | "dual-scroll">(
    "idle",
  );

  // Animation constants
  const stepsPx = 5;
  const displayTimeMs = 7000;
  const displayHeightPx = 80;
  const animationStepMs = 50;
  const screenWidth = 640; // Fixed width for now

  // Animation function
  const startScrollAnimation = (nextMsg: string): void => {
    if (animationStateRef.current !== "idle") {
      DEBUG &&
        console.log(
          `🔄 Animation blocked - current ref state: ${animationStateRef.current}`,
        );
      return;
    }

    // Force clear any existing intervals
    if (animationIntervalRef.current) {
      DEBUG && console.log(`🔄 Clearing existing animation interval`);
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }

    // Reset animation state tracking
    currentOffsetValueRef.current = 0;
    nextOffsetValueRef.current = displayHeightPx;
    dualScrollStartedRef.current = false;
    animationStateRef.current = "scrolling-out";

    setNextMessage(nextMsg);
    setAnimationState("scrolling-out");
    setCurrentOffset(0);
    setNextOffset(displayHeightPx);
    setShowNext(false);

    const halfwayPoint = -displayHeightPx / 2;

    DEBUG &&
      console.log(
        `🔄 Starting new animation for message: "${nextMsg.slice(0, 20)}..."`,
      );

    // Start scroll-out animation
    animationIntervalRef.current = setInterval(() => {
      // Update current offset
      currentOffsetValueRef.current -= stepsPx;
      setCurrentOffset(currentOffsetValueRef.current);

      // When current message reaches halfway point, start next message
      if (
        currentOffsetValueRef.current <= halfwayPoint &&
        !dualScrollStartedRef.current
      ) {
        DEBUG &&
          console.log(
            `🔄 Starting dual-scroll at halfway point: ${currentOffsetValueRef.current} <= ${halfwayPoint}`,
          );
        dualScrollStartedRef.current = true;
        animationStateRef.current = "dual-scroll";
        setShowNext(true);
        setAnimationState("dual-scroll");
      }

      // Animate next message in parallel during dual-scroll phase
      if (dualScrollStartedRef.current) {
        nextOffsetValueRef.current = Math.max(
          nextOffsetValueRef.current - stepsPx,
          0,
        );
        setNextOffset(nextOffsetValueRef.current);
        DEBUG &&
          console.log(
            `🔄 Next message offset: ${nextOffsetValueRef.current + stepsPx} -> ${nextOffsetValueRef.current}`,
          );
      }

      // Check completion condition
      const currentOffscreen =
        currentOffsetValueRef.current <= -displayHeightPx;
      const nextAtFinal = nextOffsetValueRef.current <= 0;

      if (currentOffscreen && nextAtFinal && dualScrollStartedRef.current) {
        DEBUG &&
          console.log(
            `✅ Animation complete - current: ${currentOffsetValueRef.current}, next: ${nextOffsetValueRef.current}`,
          );

        // Complete the animation
        setDisplayMessage(nextMsg);
        setAnimationState("idle");
        setCurrentOffset(0);
        setShowNext(false);

        // Reset refs for next animation
        currentOffsetValueRef.current = 0;
        nextOffsetValueRef.current = displayHeightPx;
        dualScrollStartedRef.current = false;
        animationStateRef.current = "idle";

        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
          animationIntervalRef.current = null;
        }
      }
    }, animationStepMs);
  };

  // Start pagination between test messages
  useEffect(() => {
    rotationIntervalRef.current = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        const nextIndex = (prev + 1) % testMessages.length;
        const nextMsg = testMessages[nextIndex];
        startScrollAnimation(nextMsg);
        return nextIndex;
      });
    }, displayTimeMs);

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  return (
    <StyledDx7ScreenBezel>
      <StyledDx7Screen $lightOn={dx7ScreenLight} $screenWidth={screenWidth}>
        {/* Current message */}
        <StyledDx7ScreenMessage
          style={{
            transform: `translateY(${currentOffset}px)`,
            zIndex: animationState === "idle" ? 1 : 2,
          }}
        >
          {displayMessage}
        </StyledDx7ScreenMessage>

        {/* Next message (shown during dual-scroll phase) */}
        {showNext && (
          <StyledDx7ScreenMessage
            style={{
              transform: `translateY(${nextOffset}px)`,
              zIndex: 3, // Always on top when visible
            }}
          >
            {nextMessage}
          </StyledDx7ScreenMessage>
        )}

        {/* Debug info panel - only shown when DEBUG is true */}
        {DEBUG && (
          <StyledDx7ScreenDebug>
            {animationState} | C:{currentOffset} | N:{nextOffset} |{" "}
            {showNext ? "DUAL" : "SINGLE"}
          </StyledDx7ScreenDebug>
        )}
      </StyledDx7Screen>
    </StyledDx7ScreenBezel>
  );
};

export default Dx7Screen;