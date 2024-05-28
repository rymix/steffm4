import type React from "react";
import type { DefaultTheme } from "styled-components";

export type SessionContextState = {
  burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
  isMobile: boolean;
  menuOpen: boolean;
  modalOpen: boolean;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  theme: DefaultTheme;
  themeName: string;
};
