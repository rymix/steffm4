import {
  StyledDx7Screen,
  StyledDx7ScreenBezel,
  StyledDx7ScreenDebug,
  StyledDx7ScreenMessage,
} from "components/Dx7/Screen/StyledDx7Screen";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef, useState } from "react";
import { convertTimeToHumanReadable } from "utils/functions";
import { DEBUG } from "utils/logger";

const Dx7Screen: React.FC = () => {
  const {
    mix: { details: mixDetails },
    track: { details: trackDetails },
    session: { dx7ScreenLight },
    screen: { isResizing, screenComponentWidth, screenComponentCharsPerLine },
  } = useMixcloud();

  // State for screen messages
  const [screenMessages, setScreenMessages] = useState<string[]>([]);

  // Animation and display state
  const [displayMessage, setDisplayMessage] = useState<string>(
    screenMessages.length > 0 ? screenMessages[0] : "No content",
  );
  const [_currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
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

  // Effect to build messages whenever mixDetails or trackDetails changes
  useEffect(() => {
    console.log("🔄 Building messages from mix/track details");

    // Reset screen index when source data changes
    setCurrentScreenIndex(0);

    // Clear existing intervals when rebuilding
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }

    // Build messageTrack with conditional delimiters
    const messageTrackParts: string[] = [];
    if (trackDetails?.trackName) messageTrackParts.push(trackDetails.trackName);
    if (trackDetails?.artistName)
      messageTrackParts.push(trackDetails.artistName);
    if (trackDetails?.publisher) messageTrackParts.push(trackDetails.publisher);
    if (trackDetails?.remixArtistName)
      messageTrackParts.push(trackDetails.remixArtistName);
    const messageTrack = messageTrackParts.join(" - ");

    // Build messageMix with conditional delimiters
    const messageMixParts: string[] = [];
    if (mixDetails?.name) messageMixParts.push(mixDetails.name);
    if (mixDetails?.duration) {
      messageMixParts.push(convertTimeToHumanReadable(mixDetails.duration));
    }
    const messageMix = messageMixParts.join(" - ");

    // messageNotes only has a value if notes parameter is present
    const messageNotes = mixDetails?.notes || "";

    // Method to create indexed array of strings with word wrapping
    const createMessageArray = (maxCharsPerItem: number): string[] => {
      const sourceMessages = [messageTrack, messageMix, messageNotes];

      console.log("📝 Source messages:", {
        messageTrack: `"${messageTrack}" (${messageTrack.length} chars)`,
        messageMix: `"${messageMix}" (${messageMix.length} chars)`,
        messageNotes: `"${messageNotes}" (${messageNotes.length} chars)`,
        maxCharsPerItem,
        screenComponentWidth,
        isResizing,
      });

      const result: string[] = [];

      sourceMessages.forEach((message, messageIndex) => {
        if (!message) return; // Skip empty messages

        const words = message.split(" ");
        let currentItem = "";

        words.forEach((word) => {
          // Check if word exceeds max character count
          if (word.length > maxCharsPerItem) {
            // If we have content in currentItem, save it first (trimmed)
            if (currentItem.trim()) {
              result.push(currentItem.trim());
              currentItem = "";
            }

            // Split the long word into chunks
            for (let i = 0; i < word.length; i += maxCharsPerItem) {
              const chunk = word.slice(i, i + maxCharsPerItem);
              result.push(chunk);
            }
          } else {
            // Calculate what the item would be if we add this word
            const testItem = currentItem ? `${currentItem} ${word}` : word;
            const trimmedTestItem = testItem.trim();

            // Check if the TRIMMED version fits (don't count trailing spaces)
            if (trimmedTestItem.length <= maxCharsPerItem) {
              currentItem = testItem;
            } else {
              // Current item is full, save it (trimmed) and start new item with this word
              if (currentItem.trim()) {
                result.push(currentItem.trim());
              }
              currentItem = word;
            }
          }
        });

        // Save any remaining content in currentItem
        if (currentItem.trim()) {
          result.push(currentItem.trim());
        }

        // Add separator between message types (but not after the last message)
        if (messageIndex < sourceMessages.length - 1) {
          result.push(""); // Empty string as separator
        }
      });

      return result;
    };

    // Method to create screen messages from array (2 lines per screen message)
    const createScreenMessages = (array: string[]): string[] => {
      const result: string[] = [];

      for (let i = 0; i < array.length; i += 2) {
        const line1 = array[i] || "";
        const line2 = array[i + 1] || "";

        // Join with newline if both lines exist, otherwise just use the single line
        const screenMessage = line2 ? `${line1}\n${line2}` : line1;
        result.push(screenMessage);
      }

      return result;
    };

    // Create the message array and filter out empty strings using dynamic character limit
    const messageArray = createMessageArray(screenComponentCharsPerLine);
    const filteredMessageArray = messageArray.filter(
      (item) => item.trim().length > 0,
    );
    const newScreenMessages = createScreenMessages(filteredMessageArray);

    console.log("🔄 Created screen messages:", {
      originalArrayLength: messageArray.length,
      filteredArrayLength: filteredMessageArray.length,
      screenMessagesLength: newScreenMessages.length,
      charsPerLine: screenComponentCharsPerLine,
      screenWidth: screenComponentWidth,
      isResizing,
      sampleMessage: newScreenMessages[0]?.substring(0, 50) || "",
    });

    // Update state
    setScreenMessages(newScreenMessages);
    setDisplayMessage(
      newScreenMessages.length > 0 ? newScreenMessages[0] : "No content",
    );
  }, [
    mixDetails,
    trackDetails,
    screenComponentCharsPerLine,
    screenComponentWidth,
  ]);

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

  // Start pagination between screen messages
  useEffect(() => {
    // Only start pagination if we have screen messages
    if (screenMessages.length > 1) {
      console.log(
        "🔄 Starting pagination with",
        screenMessages.length,
        "screen messages",
      );

      rotationIntervalRef.current = setInterval(() => {
        setCurrentScreenIndex((prev) => {
          const nextIndex = (prev + 1) % screenMessages.length;
          const nextMsg = screenMessages[nextIndex];
          startScrollAnimation(nextMsg);
          return nextIndex;
        });
      }, displayTimeMs);
    } else if (rotationIntervalRef.current) {
      // Clear any existing interval if we have 0 or 1 messages
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [screenMessages]); // Depend on screenMessages so it restarts when messages change

  return (
    <StyledDx7ScreenBezel>
      <StyledDx7Screen
        $lightOn={dx7ScreenLight}
        $screenWidth={screenComponentWidth}
      >
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
