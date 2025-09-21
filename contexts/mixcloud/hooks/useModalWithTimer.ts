import { ReactNode, useCallback, useState } from "react";

import type { MixcloudCoreState } from "./useMixcloudCore";

/**
 * Hook for managing modal state with auto-close timer functionality
 */
export const useModalWithTimer = (coreState: MixcloudCoreState) => {
  const { refs, preferences } = coreState;

  // ================================================================
  // STATE
  // ================================================================

  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalHideChrome, setModalHideChrome] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // ================================================================
  // HELPER FUNCTIONS
  // ================================================================

  // Close modal and cleanup
  const handleCloseModal = useCallback((): void => {
    if (refs.timer.current) {
      clearInterval(refs.timer.current);
      refs.timer.current = null;
    }
    setSecondsRemaining(null);
    setModalOpen(false);
    setModalContent(null);
    setModalTitle(null);
    setModalHideChrome(false);

    // Re-enable keyboard shortcuts when modal closes
    preferences.setKeyboardShortcutsEnabled(true);
  }, [refs.timer, preferences]);

  // Start countdown timer
  const startTimer = useCallback(
    (seconds: number): void => {
      setSecondsRemaining(seconds);

      refs.timer.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev === null || prev <= 1) {
            handleCloseModal();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [refs.timer, handleCloseModal],
  );

  // Stop countdown timer
  const stopTimer = useCallback((): void => {
    if (refs.timer.current) {
      clearInterval(refs.timer.current);
      refs.timer.current = null;
    }
    setSecondsRemaining(null);
  }, [refs.timer]);

  // Open modal with optional auto-close timer
  const openModal = useCallback(
    (
      content: ReactNode,
      title?: string,
      seconds?: number,
      hideChrome?: boolean,
      disableShortcuts?: boolean,
    ): void => {
      setModalContent(content);
      setModalTitle(title || null);
      setModalHideChrome(hideChrome || false);
      setModalOpen(true);

      // Disable keyboard shortcuts when modal is open (if requested)
      if (disableShortcuts) {
        preferences.setKeyboardShortcutsEnabled(false);
      }

      // Start auto-close timer if specified
      if (seconds && seconds > 0) {
        startTimer(seconds);
      }
    },
    [preferences, startTimer],
  );

  return {
    // State
    modalContent,
    setModalContent,
    modalOpen,
    setModalOpen,
    modalTitle,
    setModalTitle,
    modalHideChrome,
    setModalHideChrome,
    secondsRemaining,
    setSecondsRemaining,
    menuOpen,
    setMenuOpen,

    // Actions
    openModal,
    handleCloseModal,
    startTimer,
    stopTimer,
  };
};

export type ModalWithTimerState = ReturnType<typeof useModalWithTimer>;
