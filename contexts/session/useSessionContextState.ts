import type { SessionContextState } from "contexts/session/types";
import { useEffect, useRef, useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const [isMobile, setIsMobile] = useState(false);
  const theme = themes[themeName] || themes.defaultTheme;

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }

      if (modalRef.current && !modalRef.current.contains(target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [burgerMenuRef, modalRef]);

  return {
    burgerMenuRef,
    isMobile,
    menuOpen,
    modalOpen,
    modalRef,
    setIsMobile,
    setMenuOpen,
    setModalOpen,
    setThemeName,
    theme,
    themeName,
  };
};

export default useSessionContextState;
