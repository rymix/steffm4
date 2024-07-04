import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef, useState } from "react";

const JupiterScreen: React.FC = () => {
  const {
    screen: { holdingMessage, temporaryMessage },
    session: { displayLength },
  } = useMixcloud();

  const messageFormatter = (message: string | undefined): string => {
    if (!message) return "";

    const padding = "!".repeat(displayLength);
    const formattedMessage = message
      .replaceAll(" ", "!")
      .replaceAll("...", " - ")
      .replaceAll(".", "")
      .replaceAll(":", "-");
    return padding + formattedMessage + padding;
  };

  const [, setHoldingMessageIsPlaying] = useState<boolean>(false);
  const [temporaryMessageIsPlaying, setTemporaryMessageIsPlaying] =
    useState<boolean>(false);
  const [previousHoldingMessage, setPreviousHoldingMessage] = useState<
    string | undefined
  >(holdingMessage);
  const [previousTemporaryMessage, setPreviousTemporaryMessage] = useState<
    string | undefined
  >(temporaryMessage);
  const [screenMessage, setScreenMessage] = useState<string | undefined>(
    messageFormatter(holdingMessage),
  );
  const [truncatedMessage, setTruncatedMessage] = useState<
    string | undefined
  >();
  const screenIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [screenPosition, setScreenPosition] = useState(0);

  const clearExistingScreenInterval = useCallback((): void => {
    if (screenIntervalRef.current) {
      clearInterval(screenIntervalRef.current);
      screenIntervalRef.current = null;
    }
  }, []);

  const startScreenInterval = useCallback(
    (message: string | undefined, interval: number) => {
      clearExistingScreenInterval();
      screenIntervalRef.current = setInterval(() => {
        setScreenPosition((prevPosition) => {
          const newPosition = prevPosition + 1;

          if (!message) return prevPosition;

          if (newPosition === message.length + displayLength) {
            // eslint-disable-next-line no-use-before-define
            startHoldingMessage();
          }

          return (
            newPosition % (message?.length ? message.length + displayLength : 0)
          );
        });
      }, interval);
    },
    [clearExistingScreenInterval],
  );

  const startHoldingMessage = (): void => {
    setPreviousHoldingMessage(holdingMessage);
    setScreenMessage(messageFormatter(holdingMessage));
    setHoldingMessageIsPlaying(true);
    setTemporaryMessageIsPlaying(false);
    setScreenPosition(0);
    startScreenInterval(holdingMessage, 200);
  };

  const startTemporaryMessage = (): void => {
    setPreviousTemporaryMessage(temporaryMessage);
    setScreenMessage(messageFormatter(temporaryMessage));
    setTemporaryMessageIsPlaying(true);
    setHoldingMessageIsPlaying(false);
    setScreenPosition(0);
    startScreenInterval(temporaryMessage, 150);
  };

  useEffect(() => {
    if (holdingMessage !== previousHoldingMessage) {
      startHoldingMessage();
    }

    if (temporaryMessage !== previousTemporaryMessage) {
      startTemporaryMessage();
    }
  }, [holdingMessage, temporaryMessage, temporaryMessageIsPlaying]);

  useEffect(() => {
    setTruncatedMessage(
      screenMessage?.slice(screenPosition, screenPosition + displayLength),
    );
  }, [screenPosition, screenMessage]);

  useEffect(() => {
    startScreenInterval(holdingMessage, 200);
  }, []);

  return (
    <StyledJupiterScreenWrapper $displayLength={displayLength}>
      <StyledJupiterScreen $displayLength={displayLength}>
        {truncatedMessage}
      </StyledJupiterScreen>
    </StyledJupiterScreenWrapper>
  );
};

export default JupiterScreen;
