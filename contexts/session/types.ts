import type { DefaultTheme } from "styled-components";

export type SessionContextState = {
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  theme: DefaultTheme;
  themeName: string;
};
