import type React from "react";
import type { DefaultTheme } from "styled-components";

export type SessionContextState = {
  burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  theme: DefaultTheme;
  themeName: string;
};
