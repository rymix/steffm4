import type { SessionContextState } from "contexts/session/types";
import { useEffect, useRef, useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const theme = themes[themeName] || themes.defaultTheme;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [burgerMenuRef]);

  return {
    burgerMenuRef,
    menuOpen,
    setMenuOpen,
    setThemeName,
    theme,
    themeName,
  };
};

export default useSessionContextState;
