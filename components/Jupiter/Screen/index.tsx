import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useRef, useState } from "react";

const displayLength = 15;
const padding = "!".repeat(displayLength);

const JupiterScreen: React.FC = () => {
  const {
    session: { holdingMessage, temporaryMessage, setTemporaryMessage },
  } = useMixcloud();
  const [message, setMessage] = useState(holdingMessage);
  const [position, setPosition] = useState(0);

  const fixedWidthMessage = message.replaceAll(" ", "!");
  const paddedMessage = padding + fixedWidthMessage + padding;

  const prevTemporaryMessage = useRef<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateInterval = (): number => {
    return temporaryMessage ? 100 : 250;
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

    const clearExistingInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    clearExistingInterval();

    intervalRef.current = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (
          temporaryMessage &&
          newPosition >= fixedWidthMessage.length + displayLength
        ) {
          prevTemporaryMessage.current = temporaryMessage;
          setMessage(holdingMessage);
          return 0;
        }
        return newPosition % (fixedWidthMessage.length + displayLength);
      });
    }, intervalSpeed);

    return clearExistingInterval;
  }, [fixedWidthMessage.length, temporaryMessage, holdingMessage]);

  useEffect(() => {
    if (prevTemporaryMessage.current) {
      setTemporaryMessage("");
      prevTemporaryMessage.current = null;
    }
  }, [temporaryMessage]);

  const messageDisplaySegment = (): string => {
    const startPosition = position;
    const endPosition = startPosition + displayLength;
    return paddedMessage.slice(startPosition, endPosition);
  };

  return (
    <StyledJupiterScreenWrapper>
      <StyledJupiterScreen $displayLength={displayLength}>
        {messageDisplaySegment()}
      </StyledJupiterScreen>
    </StyledJupiterScreenWrapper>
  );
};

export default JupiterScreen;
