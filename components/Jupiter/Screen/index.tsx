import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useEffect, useRef, useState } from "react";

const padMessage = (message: string | undefined, pad: number) => {
  if (!message) return "";
  const padString = "!".repeat(pad);
  message = message.replaceAll(" ", "!");
  return `${padString}${message}${padString}`;
};

const getPaddedSegment = (message: string, start: number, length: number) => {
  const end = start + length;
  if (end <= message.length) {
    return message.slice(start, end);
  }
  return message.slice(start, message.length);
};

const JupiterScreen: React.FC = () => {
  const [characterCount, setCharacterCount] = useState<number>(10);
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const [holdingMessage, setHoldingMessage] =
    useState<string>("Holding Message");
  const [temporaryMessage, setTemporaryMessage] =
    useState<string>("Temporary Message");
  const [activeMessage, setActiveMessage] = useState<string>("");
  const [displayIndex, setDisplayIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeMessageRef = useRef<string>(activeMessage);
  const displayIndexRef = useRef<number>(displayIndex);

  useEffect(() => {
    activeMessageRef.current = activeMessage;
    displayIndexRef.current = displayIndex;
  }, [activeMessage, displayIndex]);

  const updateDisplayMessage = () => {
    const message = activeMessageRef.current;
    const index = displayIndexRef.current;
    console.log(
      `Updating display message: ${getPaddedSegment(
        message,
        index,
        characterCount,
      )}`,
    );
    setDisplayMessage(getPaddedSegment(message, index, characterCount));
    setDisplayIndex((prevIndex) =>
      prevIndex + 1 >= message.length ? 0 : prevIndex + 1,
    );
  };

  const startTicker = (message: string) => {
    console.log(`Starting ticker with message: ${message}`);
    const paddedMessage = padMessage(message, characterCount);
    setActiveMessage(paddedMessage);
    setDisplayIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(updateDisplayMessage, 300);
  };

  useEffect(() => {
    console.log("useEffect - Initial mount");
    if (temporaryMessage) {
      startTicker(temporaryMessage);
      const tempMessageLength = temporaryMessage.length + characterCount * 2;
      setTimeout(() => {
        console.log(
          "Temporary message displayed, switching to holding message",
        );
        startTicker(holdingMessage);
      }, tempMessageLength * 300);
    } else {
      startTicker(holdingMessage);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log(
      `Holding message or character count changed. Updating active message: ${holdingMessage}`,
    );
    if (activeMessage !== padMessage(holdingMessage, characterCount)) {
      setActiveMessage(padMessage(holdingMessage, characterCount));
    }
  }, [holdingMessage, characterCount]);

  useEffect(() => {
    console.log(`Active message updated: ${activeMessage}`);
    // Reset displayIndex and message when activeMessage changes
    setDisplayIndex(0);
    setDisplayMessage(getPaddedSegment(activeMessage, 0, characterCount));
  }, [activeMessage]);

  return (
    <>
      <button onClick={() => setTemporaryMessage("Message 1")}>
        Message 1
      </button>
      <button onClick={() => setTemporaryMessage("Rain Man")}>Rain Man</button>
      <StyledJupiterScreenWrapper>
        <StyledJupiterScreen>{displayMessage}</StyledJupiterScreen>
      </StyledJupiterScreenWrapper>
    </>
  );
};

export default JupiterScreen;
