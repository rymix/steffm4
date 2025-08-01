import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SCREEN_SPEED_HOLDING, SCREEN_SPEED_TEMPORARY } from "utils/constants";

const JupiterScreen: React.FC = () => {
  const {
    screen: { holdingMessage, temporaryMessage },
    session: { displayLength },
    widget: { playing },
    track: { details: trackDetails },
  } = useMixcloud();

  const messageFormatter = (message: string | undefined): string => {
    // Always ensure we have at least one exclamation mark to prevent CSS artifacts
    if (!message) return "!";

    const padding = "!".repeat(displayLength);
    const formattedMessage = message
      .replaceAll(" ", "!")
      .replaceAll("...", " - ")
      .replaceAll(".", "")
      .replaceAll(":", "-");
    
    const fullMessage = padding + formattedMessage + padding;
    // Final safety check - ensure we never return empty string
    return fullMessage || "!";
  };

  // Message state management
  const [currentMessageType, setCurrentMessageType] = useState<'holding' | 'track' | 'temporary'>('holding');
  const [previousHoldingMessage, setPreviousHoldingMessage] = useState<string | undefined>(holdingMessage);
  const [previousTemporaryMessage, setPreviousTemporaryMessage] = useState<string | undefined>(temporaryMessage);
  const [screenMessage, setScreenMessage] = useState<string>(messageFormatter(holdingMessage));
  const [truncatedMessage, setTruncatedMessage] = useState<string>("!");
  const screenIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [screenPosition, setScreenPosition] = useState(0);

  // Determine what the current track message should be
  const trackMessage = React.useMemo(() => {
    if (!trackDetails) return undefined;
    return [
      trackDetails.trackName,
      trackDetails.artistName,
      trackDetails.remixArtistName,
      trackDetails.publisher,
    ]
      .filter(Boolean)
      .join(" - ");
  }, [trackDetails]);

  const clearExistingScreenInterval = useCallback((): void => {
    if (screenIntervalRef.current) {
      clearInterval(screenIntervalRef.current);
      screenIntervalRef.current = null;
    }
  }, []);

  const startScreenInterval = useCallback(
    (message: string, interval: number, messageType: 'holding' | 'track' | 'temporary') => {
      clearExistingScreenInterval();
      screenIntervalRef.current = setInterval(() => {
        setScreenPosition((prevPosition) => {
          const newPosition = prevPosition + 1;

          // Calculate the actual message content length (excluding padding)
          const actualMessageLength = message.length - (displayLength * 2); // subtract both left and right padding
          
          // End the cycle once we've scrolled past the actual content and are showing
          // displayLength characters of right padding (i.e., screen is full of ! characters)
          const endPosition = displayLength + actualMessageLength;
          
          if (newPosition >= endPosition) {
            // When temporary message finishes, return to appropriate state
            if (messageType === 'temporary') {
              // Return to track message if playing and track exists, otherwise holding message
              if (playing && trackMessage) {
                // eslint-disable-next-line no-use-before-define
                startTrackMessage();
              } else {
                // eslint-disable-next-line no-use-before-define
                startHoldingMessage();
              }
            } else {
              // For track and holding messages, restart immediately
              return 0;
            }
          }

          return newPosition;
        });
      }, interval);
    },
    [clearExistingScreenInterval, playing, trackMessage, displayLength],
  );

  const startHoldingMessage = (): void => {
    setPreviousHoldingMessage(holdingMessage);
    const formattedMessage = messageFormatter(holdingMessage);
    setScreenMessage(formattedMessage);
    setCurrentMessageType('holding');
    setScreenPosition(0);
    startScreenInterval(formattedMessage, SCREEN_SPEED_HOLDING, 'holding');
  };

  const startTrackMessage = (): void => {
    const formattedMessage = messageFormatter(trackMessage);
    setScreenMessage(formattedMessage);
    setCurrentMessageType('track');
    setScreenPosition(0);
    startScreenInterval(formattedMessage, SCREEN_SPEED_HOLDING, 'track');
  };

  const startTemporaryMessage = (): void => {
    setPreviousTemporaryMessage(temporaryMessage);
    const formattedMessage = messageFormatter(temporaryMessage);
    setScreenMessage(formattedMessage);
    setCurrentMessageType('temporary');
    setScreenPosition(0);
    startScreenInterval(formattedMessage, SCREEN_SPEED_TEMPORARY, 'temporary');
  };

  // Initialize screen on displayLength change
  useEffect(() => {
    startHoldingMessage();
  }, [displayLength]);

  // Handle temporary messages (highest priority)
  useEffect(() => {
    if (temporaryMessage !== previousTemporaryMessage) {
      if (temporaryMessage) {
        startTemporaryMessage();
      } else if (currentMessageType === 'temporary') {
        // Temporary message was cleared, return to appropriate state
        if (playing && trackMessage) {
          startTrackMessage();
        } else {
          startHoldingMessage();
        }
      }
    }
  }, [temporaryMessage, previousTemporaryMessage, currentMessageType, playing, trackMessage]);

  // Handle playing state and track changes
  useEffect(() => {
    // Only change message if we're not currently showing a temporary message
    if (currentMessageType !== 'temporary') {
      if (playing && trackMessage) {
        // Playing with track info - show track message
        startTrackMessage();
      } else {
        // Not playing or no track info - show holding message
        startHoldingMessage();
      }
    }
  }, [playing, trackMessage, currentMessageType]);

  // Handle holding message changes (only when it's the active message type)
  useEffect(() => {
    if (holdingMessage !== previousHoldingMessage && currentMessageType === 'holding') {
      startHoldingMessage();
    }
  }, [holdingMessage, previousHoldingMessage, currentMessageType]);

  // Update truncated message for display
  useEffect(() => {
    const sliced = screenMessage.slice(screenPosition, screenPosition + displayLength);
    // Ensure we never have an empty truncated message
    setTruncatedMessage(sliced || "!");
  }, [screenPosition, screenMessage, displayLength]);

  return (
    <StyledJupiterScreenWrapper $displayLength={displayLength}>
      <StyledJupiterScreen $displayLength={displayLength}>
        {truncatedMessage}
      </StyledJupiterScreen>
    </StyledJupiterScreenWrapper>
  );
};

export default JupiterScreen;
