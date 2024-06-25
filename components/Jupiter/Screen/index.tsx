import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useEffect, useState } from "react";

const displayLength = 15;
const padding = "!".repeat(displayLength);

const JupiterScreen: React.FC = () => {
  const [holdingMessage, setHoldingMessage] = useState("Long sample message");
  const [message, setMessage] = useState(holdingMessage);
  const [position, setPosition] = useState(0);
  const [isTemporaryMessage, setIsTemporaryMessage] = useState(false);

  const fixedWidthMessage = message.replaceAll(" ", "!");
  const paddedMessage = padding + fixedWidthMessage + padding;

  const updateInterval = (): number => {
    return isTemporaryMessage ? 100 : 300;
  };

  useEffect(() => {
    setPosition(0);
  }, [message]);

  useEffect(() => {
    const intervalSpeed = updateInterval();
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (
          isTemporaryMessage &&
          newPosition >= fixedWidthMessage.length + displayLength
        ) {
          setMessage(holdingMessage);
          setIsTemporaryMessage(false);
          return 0;
        }
        return newPosition % (fixedWidthMessage.length + displayLength);
      });
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [fixedWidthMessage.length, isTemporaryMessage, holdingMessage]);

  const messageDisplaySegment = (): string => {
    const startPosition = position;
    const endPosition = startPosition + displayLength;
    return paddedMessage.slice(startPosition, endPosition);
  };

  return (
    <>
      <StyledJupiterScreenWrapper>
        <StyledJupiterScreen displayLength={displayLength}>
          {messageDisplaySegment()}
        </StyledJupiterScreen>
      </StyledJupiterScreenWrapper>
    </>
  );
};

export default JupiterScreen;
