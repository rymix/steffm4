import type { SessionContextState } from "contexts/session/types";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const [isMobile, setIsMobile] = useState(false);
  const theme = themes[themeName] || themes.defaultTheme;

  const clearCountdown = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setCountdown(0);
  }, []);

  const startCountdown = useCallback(
    (seconds: number) => {
      clearCountdown();
      setCountdown(seconds);

      const endTime = Date.now() + seconds * 1000;
      intervalIdRef.current = window.setInterval(() => {
        const timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        setCountdown(timeLeft);

        if (timeLeft <= 0) {
          clearCountdown();
        }
      }, 1000);
    },
    [clearCountdown],
  );

  const openModal = useCallback((content: ReactNode): void => {
    setModalContent(content);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }

      if (modalRef.current && !modalRef.current.contains(target)) {
        setModalOpen(false);
        clearCountdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearCountdown();
    };
  }, [burgerMenuRef, modalRef, clearCountdown]);

  useEffect(() => {
    if (!modalOpen) {
      clearCountdown();
    }
  }, [modalOpen, clearCountdown]);

  return {
    burgerMenuRef,
    countdown,
    isMobile,
    menuOpen,
    modalContent,
    modalOpen,
    modalRef,
    openModal,
    setCountdown: startCountdown,
    setIsMobile,
    setMenuOpen,
    setModalContent,
    setModalOpen,
    setThemeName,
    startCountdown,
    theme,
    themeName,
  };
};

export default useSessionContextState;
