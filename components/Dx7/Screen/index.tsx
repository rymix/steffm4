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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DEBUG } from "utils/logger";

const Dx7Screen: React.FC = () => {
  const {
    screen: { holdingMessage },
    session: { dx7ScreenLight },
    track: { details: trackDetails },
    mix: { details: mixDetails },
  } = useMixcloud();

  // Direct viewport state for reliable orientation detection
  const [viewportState, setViewportState] = useState({
    width: typeof globalThis.window !== "undefined" ? window.innerWidth : 0,
    height: typeof globalThis.window !== "undefined" ? window.innerHeight : 0,
    isPortrait:
      typeof globalThis.window !== "undefined"
        ? window.innerHeight > window.innerWidth
        : false,
    isMobile: false,
  });

  const [displayMessage, setDisplayMessage] = useState<string>(
    holdingMessage ?? "",
  );
  const [currentSliceIndex, setCurrentSliceIndex] = useState<number>(0);
  const [messageSlices, setMessageSlices] = useState<string[]>([]);
  const [nextMessage, setNextMessage] = useState<string>("");
  const [animationState, setAnimationState] = useState<
    "idle" | "scrolling-out" | "dual-scroll"
  >("idle");
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [showNext, setShowNext] = useState<boolean>(false);
  const lastMixDetailsRef = useRef<typeof mixDetails | null>(null);
  const lastTrackDetailsRef = useRef<typeof trackDetails | null>(null);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animation state tracking refs
  const currentOffsetValueRef = useRef<number>(0);
  const nextOffsetValueRef = useRef<number>(0);
  const dualScrollStartedRef = useRef<boolean>(false);
  const animationStateRef = useRef<"idle" | "scrolling-out" | "dual-scroll">(
    "idle",
  );

  const stepsPx = 5;
  const displayTimeMs = 7000;
  const displayHeightPx = 80;
  const animationStepMs = 50;

  // Responsive string length based on screen width
  const [stringLength, setStringLength] = useState(72);
  const [screenWidth, setScreenWidth] = useState(640);

  // Direct viewport monitoring effect
  useLayoutEffect(() => {
    const detectMobile = (): boolean => {
      if (
        "userAgentData" in navigator &&
        (navigator as any).userAgentData?.mobile
      ) {
        return true;
      }
      const hasTouchCapability =
        "ontouchstart" in globalThis || navigator.maxTouchPoints > 0;
      const hasSmallScreen = window.innerWidth <= 1024;
      const mobileUserAgentPattern =
        /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|webOS/i;
      const isMobileUserAgent = mobileUserAgentPattern.test(
        navigator.userAgent,
      );
      const isMobileMediaQuery = globalThis.matchMedia(
        "(max-width: 1024px) and (hover: none)",
      ).matches;

      return (
        isMobileUserAgent ||
        (hasTouchCapability && hasSmallScreen) ||
        isMobileMediaQuery
      );
    };

    const updateViewportState = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = height > width;
      const isMobile = detectMobile();

      console.log("Viewport update:", { width, height, isPortrait, isMobile });

      setViewportState({
        width,
        height,
        isPortrait,
        isMobile,
      });
    };

    updateViewportState();

    // Listen to all possible viewport change events with longer timeout for orientation
    const handleOrientationChange = (): void => {
      setTimeout(updateViewportState, 200);
    };

    window.addEventListener("resize", updateViewportState);
    window.addEventListener("orientationchange", handleOrientationChange);
    screen?.orientation?.addEventListener?.("change", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", updateViewportState);
      window.removeEventListener("orientationchange", handleOrientationChange);
      screen?.orientation?.removeEventListener?.(
        "change",
        handleOrientationChange,
      );
    };
  }, []);

  // Update string length based on screen width and orientation
  useEffect(() => {
    const updateStringLength = (): void => {
      const { width, isPortrait, isMobile } = viewportState;

      console.log("Updating dimensions:", {
        width,
        isPortrait,
        isMobile,
        currentStringLength: stringLength,
        currentScreenWidth: screenWidth,
      });

      // Proportional sizing based on viewport width
      // Case width range: 300px (min) to 720px+ (max)
      // Screen width range: 220px (min) to 640px (max)

      const sizeRatio = 0.8; // Adjust this value to make Screen smaller (0.7) or larger (0.9)
      const stringRatio = 0.75; // Adjust this value to make string length shorter (0.6) or longer (0.8)

      const minCaseWidth = 300;
      const maxCaseWidth = 720;
      const minScreenWidth = 220 * sizeRatio;
      const maxScreenWidth = 640 * sizeRatio;

      // Clamp viewport width to case width range
      const clampedWidth = Math.max(
        minCaseWidth,
        Math.min(width, maxCaseWidth),
      );

      // Calculate proportional screen width
      const widthRatio =
        (clampedWidth - minCaseWidth) / (maxCaseWidth - minCaseWidth);
      const calculatedScreenWidth = Math.round(
        minScreenWidth + widthRatio * (maxScreenWidth - minScreenWidth),
      );

      // Calculate proportional string length (18 at 220px, 72 at 640px)
      const minStringLength = 18 * stringRatio;
      const maxStringLength = 72 * stringRatio;
      const screenWidthRatio =
        (calculatedScreenWidth - minScreenWidth) /
        (maxScreenWidth - minScreenWidth);
      const calculatedStringLength = Math.round(
        minStringLength +
          screenWidthRatio * (maxStringLength - minStringLength),
      );

      setScreenWidth(calculatedScreenWidth);
      setStringLength(calculatedStringLength);
    };

    updateStringLength();
  }, [viewportState]);

  // Function to slice message into configurable character chunks
  const sliceMessage = (message: string): string[] => {
    if (message.length <= stringLength) return [message];

    const slices: string[] = [];
    for (let i = 0; i < message.length; i += stringLength) {
      slices.push(message.slice(i, i + stringLength));
    }
    return slices;
  };

  // Animation functions
  const startScrollAnimation = (nextMsg: string): void => {
    if (animationStateRef.current !== "idle") {
      DEBUG &&
        console.log(
          `🔄 Animation blocked - current ref state: ${animationStateRef.current}`,
        );
      return;
    }

    // Force clear any existing intervals with extra safety
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

    // Start scroll-out animation (configurable steps)
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

      // Check completion condition using ref values
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

  // Function to build the appropriate message based on context
  const buildMessage = (): string => {
    // If no mix or track details, show holding message
    if (!mixDetails || !trackDetails) {
      return holdingMessage ?? "";
    }

    const parts: string[] = [];

    // Check if this is a mix change (both mix and track changed)
    const mixChanged = lastMixDetailsRef.current?.name !== mixDetails.name;
    const trackChanged =
      lastTrackDetailsRef.current?.trackName !== trackDetails.trackName;

    if (mixChanged && trackChanged) {
      // Format for first track of new mix
      parts.push(mixDetails.name);
      if (mixDetails.notes) parts.push(mixDetails.notes);
      parts.push(trackDetails.trackName);
      parts.push(trackDetails.artistName);
      if (trackDetails.remixArtistName)
        parts.push(trackDetails.remixArtistName);
      if (trackDetails.publisher) parts.push(trackDetails.publisher);
    } else if (trackChanged && !mixChanged) {
      // Format for tracks 2+ of same mix
      parts.push(trackDetails.trackName);
      parts.push(trackDetails.artistName);
      if (trackDetails.remixArtistName)
        parts.push(trackDetails.remixArtistName);
      if (trackDetails.publisher) parts.push(trackDetails.publisher);
      parts.push(mixDetails.name);
      if (mixDetails.notes) parts.push(mixDetails.notes);
    } else {
      // No change, return current message
      return messageSlices.length > 0
        ? messageSlices.join("")
        : (holdingMessage ?? "");
    }

    return parts.filter(Boolean).join(" - ");
  };

  // Effect to handle message building and slicing
  useEffect(() => {
    const newMessage = buildMessage();
    const newSlices = sliceMessage(newMessage);

    // Only update if message actually changed
    if (JSON.stringify(newSlices) !== JSON.stringify(messageSlices)) {
      setMessageSlices(newSlices);
      setCurrentSliceIndex(0);

      // Reset all animation states when message changes
      setAnimationState("idle");
      setCurrentOffset(0);
      setNextOffset(displayHeightPx);
      setShowNext(false);

      // Reset animation state refs
      currentOffsetValueRef.current = 0;
      nextOffsetValueRef.current = displayHeightPx;
      dualScrollStartedRef.current = false;
      animationStateRef.current = "idle";

      // Clear existing intervals
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }

      DEBUG && console.log(`🔄 Message changed, animation states reset`);

      // Start rotation if multiple slices
      if (newSlices.length > 1) {
        rotationIntervalRef.current = setInterval(() => {
          setCurrentSliceIndex((prev) => {
            const nextIndex = (prev + 1) % newSlices.length;
            const nextSlice = newSlices[nextIndex];
            // Start animation to next slice
            startScrollAnimation(nextSlice);
            return nextIndex;
          });
        }, displayTimeMs);
      }
    }

    // Update refs for next comparison
    lastMixDetailsRef.current = mixDetails;
    lastTrackDetailsRef.current = trackDetails;
  }, [mixDetails, trackDetails, holdingMessage, stringLength]);

  // Effect to update display message from current slice (only for initial load)
  useEffect(() => {
    if (messageSlices.length > 0 && animationState === "idle") {
      setDisplayMessage(messageSlices[currentSliceIndex] || "");
    }
  }, [currentSliceIndex, messageSlices, animationState]);

  // Cleanup intervals on unmount
  useEffect(() => {
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
