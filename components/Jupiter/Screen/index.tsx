import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useEffect, useState } from "react";

const displayLength = 15; // Number of characters to display at a time
const padding = "!".repeat(displayLength); // Padding characters

const sampleMessages = ["Short test", "Another message", "One more example"];
const temporaryMessages = ["Temp message 1", "Temp message 2"];

const JupiterScreen: React.FC = () => {
  const [holdingMessage, setHoldingMessage] = useState("Long sample message");
  const [message, setMessage] = useState(holdingMessage);
  const [position, setPosition] = useState(0);
  const [isTemporaryMessage, setIsTemporaryMessage] = useState(false);

  const fixedWidthMessage = message.replaceAll(" ", "!"); // Replace spaces with !
  const paddedMessage = padding + fixedWidthMessage + padding; // Padded message

  const updateInterval = () => {
    return isTemporaryMessage ? 100 : 300;
  };

  useEffect(() => {
    setPosition(0); // Reset position when message changes
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

  const messageDisplaySegment = () => {
    const startPosition = position;
    const endPosition = startPosition + displayLength;
    return paddedMessage.slice(startPosition, endPosition);
  };

  const setTemporaryMessage = (msg) => {
    setMessage(msg);
    setIsTemporaryMessage(true);
  };

  const updateHoldingMessage = (msg) => {
    setHoldingMessage(msg);
    if (!isTemporaryMessage) {
      setMessage(msg);
    }
  };

  return (
    <>
      <StyledJupiterScreenWrapper>
        <StyledJupiterScreen displayLength={displayLength}>
          {messageDisplaySegment()}
        </StyledJupiterScreen>
      </StyledJupiterScreenWrapper>
      <div>
        <h3>Holding Messages</h3>
        {sampleMessages.map((msg, index) => (
          <button key={index} onClick={() => updateHoldingMessage(msg)}>
            Set Holding Message {index + 1}
          </button>
        ))}
        <h3>Temporary Messages</h3>
        {temporaryMessages.map((msg, index) => (
          <button key={index} onClick={() => setTemporaryMessage(msg)}>
            Set Temporary Message {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default JupiterScreen;
