import { useRef, useState } from "react";

/**
 * Hook for managing tooltip display and behavior
 */
export const useTooltip = (): TooltipState => {
  // ================================================================
  // STATE
  // ================================================================

  const [tooltipMessage, setTooltipMessage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipFading, setTooltipFading] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // ================================================================
  // REFS
  // ================================================================

  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // ================================================================
  // HELPER FUNCTIONS
  // ================================================================

  // Clear tooltip timers
  const clearTooltipTimers = (): void => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    if (tooltipFadeTimerRef.current) {
      clearTimeout(tooltipFadeTimerRef.current);
      tooltipFadeTimerRef.current = null;
    }
  };

  // Show tooltip with message and position
  const showTooltip = (message: string, x: number, y: number): void => {
    clearTooltipTimers();

    setTooltipMessage(message);
    setTooltipPosition({ x, y });
    setTooltipVisible(true);
    setTooltipFading(false);

    // Auto-hide tooltip after 3 seconds
    tooltipTimerRef.current = setTimeout(() => {
      setTooltipFading(true);
      tooltipFadeTimerRef.current = setTimeout(() => {
        setTooltipVisible(false);
        setTooltipFading(false);
        setTooltipMessage(null);
      }, 300); // Fade duration
    }, 3000);
  };

  // Hide tooltip immediately
  const hideTooltip = (): void => {
    clearTooltipTimers();
    setTooltipFading(true);
    tooltipFadeTimerRef.current = setTimeout(() => {
      setTooltipVisible(false);
      setTooltipFading(false);
      setTooltipMessage(null);
    }, 300);
  };

  // Cleanup function for unmounting
  const cleanup = (): void => {
    clearTooltipTimers();
  };

  return {
    // State
    tooltipMessage,
    setTooltipMessage,
    tooltipVisible,
    setTooltipVisible,
    tooltipFading,
    setTooltipFading,
    tooltipPosition,
    setTooltipPosition,

    // Actions
    showTooltip,
    hideTooltip,
    cleanup,

    // Refs (for external access if needed)
    refs: {
      tooltipTimer: tooltipTimerRef,
      tooltipFadeTimer: tooltipFadeTimerRef,
    },
  };
};

export type TooltipState = ReturnType<typeof useTooltip>;
