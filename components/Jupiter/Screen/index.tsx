import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
  StyledScreenDebug,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DISPLAY_LENGTH } from "utils/constants";

const messageFormatter = (message: string | undefined): string => {
  if (!message) return "";

  const padding = "!".repeat(DISPLAY_LENGTH);
  const formattedMessage = message
    .replaceAll(" ", "!")
    .replaceAll(".", "")
    .replaceAll("'", "");
  return padding + formattedMessage + padding;
};

const JupiterScreen: React.FC = () => {
  const {
    screen: {
      holdingMessage,
      setHoldingMessage,
      setTemporaryMessage,
      temporaryMessage,
    },
  } = useMixcloud();
  const [holdingMessageIsPlaying, setHoldingMessageIsPLaying] =
    useState<boolean>(false);
  const [temporaryMessageIsPlaying, setTemporaryMessageIsPLaying] =
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
          console.log("newPosition", newPosition);
          return (
            newPosition %
            (message?.length ? message.length + DISPLAY_LENGTH : 0)
          );
        });
      }, interval);
    },
    [clearExistingScreenInterval],
  );

  useEffect(() => {
    console.log("holdingMessage or temporaryMessage changed");
    if (holdingMessage !== previousHoldingMessage) {
      setPreviousHoldingMessage(holdingMessage);

      if (!temporaryMessageIsPlaying) {
        console.log("!temporaryMessageIsPlaying");
        setHoldingMessageIsPLaying(true);
        setScreenPosition(0);
        setScreenMessage(messageFormatter(holdingMessage));
        startScreenInterval(holdingMessage, 250);
      }
    }

    if (temporaryMessage !== previousTemporaryMessage) {
      setPreviousTemporaryMessage(temporaryMessage);
      setHoldingMessageIsPLaying(false);
      setTemporaryMessageIsPLaying(true);
      setScreenPosition(0);
      setScreenMessage(messageFormatter(temporaryMessage));
      startScreenInterval(temporaryMessage, 100);
    }
  }, [holdingMessage, temporaryMessage]);

  useEffect(() => {
    setTruncatedMessage(
      screenMessage?.slice(screenPosition, screenPosition + DISPLAY_LENGTH),
    );
  }, [screenPosition, screenMessage]);

  useEffect(() => {
    console.log("initialising screenInterval");
    startScreenInterval(holdingMessage, 250);
  }, []);

  return (
    <>
      <StyledScreenDebug>
        <dl>
          <dt>holdingMessage</dt>
          <dd>{holdingMessage}</dd>
          <dt>previousHoldingMessage</dt>
          <dd>{previousHoldingMessage}</dd>
          <dt>temporaryMessage</dt>
          <dd>{temporaryMessage}</dd>
          <dt>previousTemporaryMessage</dt>
          <dd>{previousTemporaryMessage}</dd>
          <dt>holdingMessageIsPlaying</dt>
          <dd>{holdingMessageIsPlaying ? "true" : "false"}</dd>
          <dt>temporaryMessageIsPlaying</dt>
          <dd>{temporaryMessageIsPlaying ? "true" : "false"}</dd>
          <dt>screenPosition</dt>
          <dd>{screenPosition}</dd>
          <dt>screenMessage</dt>
          <dd>{screenMessage}</dd>
        </dl>
        <button
          type="button"
          onClick={() => {
            setHoldingMessage("Holding Message 1");
          }}
        >
          Holding Message 1
        </button>
        <button
          type="button"
          onClick={() => {
            setHoldingMessage("Eat My Shorts");
          }}
        >
          Holding Message 2
        </button>
        <button
          type="button"
          onClick={() => {
            setTemporaryMessage("Temporary Message 1");
          }}
        >
          Temporary Message 1
        </button>
        <button
          type="button"
          onClick={() => {
            setTemporaryMessage("Big Farts");
          }}
        >
          Temporary Message 2
        </button>
      </StyledScreenDebug>
      <StyledJupiterScreenWrapper>
        <StyledJupiterScreen $displayLength={DISPLAY_LENGTH}>
          {truncatedMessage}
        </StyledJupiterScreen>
      </StyledJupiterScreenWrapper>
    </>
  );
};

export default JupiterScreen;
