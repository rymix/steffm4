import type { SessionContextState } from "contexts/session/types";
import { useState } from "react";
import themes from "styles/themes";

const useSessionContextState = (): SessionContextState => {
  const [themeName, setThemeName] = useState("defaultTheme");
  const theme = themes[themeName] || themes.defaultTheme;

  return {
    setThemeName,
    theme,
    themeName,
  };
};

export default useSessionContextState;
