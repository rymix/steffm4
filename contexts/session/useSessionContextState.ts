import { useMixcloud } from "contexts/mixcloud";
import type { Colors, SessionContextState } from "contexts/session/types";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const defaultMessage = "Stef FM - Funky House Coming In Your Ears";
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<Colors | null>(null);
  const [holdingMessage, setHoldingMessage] = useState(defaultMessage);
  const modalRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const [isMobile, setIsMobile] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [temporaryMessage, setTemporaryMessage] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const theme = themes[themeName] || themes.defaultTheme;

  /* Screen Messages in Session Context State */
  const { initialized, mix, track } = useMixcloud();

  useEffect(() => {
    if (initialized) {
      setHoldingMessage(mix?.details?.name || defaultMessage);
    }
  }, [mix, initialized]);

  useEffect(() => {
    if (initialized) {
      setTemporaryMessage(track?.details?.trackName || "New Track");
    }
  }, [track, initialized]);

  /* Timer for Modal auto-close */
  const startTimer = (duration: number): void => {
    setSecondsRemaining(duration);
    clearTimeout(timerRef.current || 0);
    clearInterval(intervalRef.current || 0);

    timerRef.current = setTimeout(() => {
      setModalOpen(false);
      setSecondsRemaining(null);
      clearInterval(intervalRef.current || 0);
      timerRef.current = null;
    }, duration * 1000);

    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current || 0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = (): void => {
    clearTimeout(timerRef.current || 0);
    clearInterval(intervalRef.current || 0);
    timerRef.current = null;
    intervalRef.current = null;
    setSecondsRemaining(null);
    setModalOpen(false);
  };

  const openModal = useCallback(
    (content: ReactNode, title?: string | null, seconds?: number): void => {
      setModalContent(content);
      setModalTitle(title ?? null);
      setModalOpen(true);
      if (seconds === undefined) {
        setSecondsRemaining(null);
      } else {
        startTimer(seconds);
      }
    },
    [],
  );

  /* Set isMobile if small screen */
  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* Cancel timers and close Modals and Menus */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }

      if (modalRef.current && !modalRef.current.contains(target)) {
        stopTimer();
      }
    };

    const handleEscapePress = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        stopTimer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [burgerMenuRef, modalRef]);

  return {
    burgerMenuRef,
    colors,
    holdingMessage,
    isMobile,
    menuOpen,
    modalContent,
    modalOpen,
    modalRef,
    modalTitle,
    openModal,
    secondsRemaining,
    setColors,
    setHoldingMessage,
    setIsMobile,
    setMenuOpen,
    setModalContent,
    setModalOpen,
    setModalTitle,
    setTemporaryMessage,
    setThemeName,
    temporaryMessage,
    theme,
    themeName,
  };
};

export default useSessionContextState;
