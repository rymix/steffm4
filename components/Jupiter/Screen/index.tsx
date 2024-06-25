import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useSession } from "contexts/session";
import { useEffect, useState } from "react";

const displayLength = 15;
const padding = "!".repeat(displayLength);

const JupiterScreen: React.FC = () => {
  const { holdingMessage, temporaryMessage, setTemporaryMessage } =
    useSession();
  const [message, setMessage] = useState(holdingMessage);
  const [position, setPosition] = useState(0);

  const fixedWidthMessage = message.replaceAll(" ", "!");
  const paddedMessage = padding + fixedWidthMessage + padding;

  const updateInterval = (): number => {
    return temporaryMessage ? 100 : 300;
  };

  useEffect(() => {
    setPosition(0);
    if (temporaryMessage) {
      setMessage(temporaryMessage);
    } else {
      setMessage(holdingMessage);
    }
  }, [temporaryMessage, holdingMessage]);

  useEffect(() => {
    const intervalSpeed = updateInterval();
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (
          temporaryMessage &&
          newPosition >= fixedWidthMessage.length + displayLength
        ) {
          setTemporaryMessage(""); // Clear the temporary message
          setMessage(holdingMessage);
          return 0;
        }
        return newPosition % (fixedWidthMessage.length + displayLength);
      });
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [fixedWidthMessage.length, temporaryMessage, holdingMessage]);

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
