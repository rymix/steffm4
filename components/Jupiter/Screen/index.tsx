import {
  StyledJupiterScreen,
  StyledJupiterScreenWrapper,
} from "components/Jupiter/Screen/StyledJupiterScreen";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { DISPLAY_LENGTH } from "utils/constants";

const padding = "!".repeat(DISPLAY_LENGTH);

const JupiterScreen: React.FC = () => {
  const {
    screen: { screenMessage, screenPosition },
  } = useMixcloud();

  const fixedWidthMessage = screenMessage.replaceAll(" ", "!");
  const paddedMessage = padding + fixedWidthMessage + padding;

  const messageDisplaySegment = (): string => {
    const startPosition = screenPosition;
    const endPosition = startPosition + DISPLAY_LENGTH;
    return paddedMessage.slice(startPosition, endPosition);
  };

  return (
    <StyledJupiterScreenWrapper>
      <StyledJupiterScreen $displayLength={DISPLAY_LENGTH}>
        {messageDisplaySegment()}
      </StyledJupiterScreen>
    </StyledJupiterScreenWrapper>
  );
};

export default JupiterScreen;
