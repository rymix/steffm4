import { useState } from "react";
import { DEFAULT_MESSAGE } from "utils/constants";

import type { ScreenMessagesReturn } from "../types";

/**
 * Hook for managing screen messages (holding and temporary messages)
 */
export const useScreenMessages = (): ScreenMessagesReturn => {
  // ================================================================
  // STATE
  // ================================================================

  const [holdingMessage, setHoldingMessage] = useState<string | undefined>(
    DEFAULT_MESSAGE,
  );
  const [temporaryMessage, setTemporaryMessage] = useState<
    string | undefined
  >();

  return {
    // State
    holdingMessage,
    setHoldingMessage,
    temporaryMessage,
    setTemporaryMessage,
  };
};

export type ScreenMessagesState = ReturnType<typeof useScreenMessages>;
