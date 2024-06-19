import type React from "react";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";

export type Colours = {
  gradient: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
};

export type SessionContextState = {
  burgerMenuRef: React.MutableRefObject<HTMLDivElement | null>;
  colours: Colours | null;
  setColours: React.Dispatch<React.SetStateAction<Colours | null>>;
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
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string | null>>;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  theme: DefaultTheme;
  themeName: string;
};
