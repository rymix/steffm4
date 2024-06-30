import type React from "react";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";

export type Colors = {
  gradient: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  glow: string;
};

export type SessionContextState = {
  burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
  colors: Colors | null;
  holdingMessage: string;
  isMobile: boolean;
  menuOpen: boolean;
  modalContent: ReactNode | null;
  modalOpen: boolean;
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  modalTitle: string | null;
  openModal: (
    content: ReactNode,
    title?: string | null,
    seconds?: number,
  ) => void;
  secondsRemaining: number | null;
  setColors: React.Dispatch<React.SetStateAction<Colors | null>>;
  setHoldingMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setTemporaryMessage: React.Dispatch<React.SetStateAction<string>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  temporaryMessage: string;
  theme: DefaultTheme;
  themeName: string;
};
