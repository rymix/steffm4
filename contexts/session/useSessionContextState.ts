import type { SessionContextState } from "contexts/session/types";
import { useRef, useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeName, setThemeName] = useState("defaultTheme");
  const theme = themes[themeName] || themes.defaultTheme;

  // useEffect(() => {
  //   const listener = (event) => {
  //     if (!ref.current || ref.current.contains(event.target)) return;
  //     handler(event);
  //   };
  //   document.addEventListener("mousedown", listener);

  //   return () => {
  //     document.removeEventListener("mousedown", listener);
  //   };
  // }, [ref, handler]);

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
