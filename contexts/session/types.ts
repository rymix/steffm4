import type React from "react";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";

export type SessionContextState = {
  burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
  isMobile: boolean;
  menuOpen: boolean;
  modalContent: ReactNode | null;
  modalOpen: boolean;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  openModal: (content: ReactNode) => void;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  theme: DefaultTheme;
  themeName: string;
};
