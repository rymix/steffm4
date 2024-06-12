import type { SessionContextState } from "contexts/session/types";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const theme = themes[themeName] || themes.defaultTheme;

  const startTimer = (duration: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setModalOpen(false);
      timerRef.current = null;
    }, duration * 1000);
  };

  const stopTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
    setModalOpen(false);
  };

  const openModal = useCallback(
    (content: ReactNode, seconds?: number): void => {
      setModalContent(content);
      setModalOpen(true);
      if (seconds !== undefined) {
        startTimer(seconds);
      }
    },
    [],
  );

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
    isMobile,
    menuOpen,
    modalContent,
    modalOpen,
    modalRef,
    openModal,
    setIsMobile,
    setMenuOpen,
    setModalContent,
    setModalOpen,
    setThemeName,
    theme,
    themeName,
  };
};

export default useSessionContextState;
