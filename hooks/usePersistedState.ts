import { useEffect, useState } from "react";

const usePersistedState = (
  key: string,
  defaultValue: string,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const isBrowser = typeof window !== "undefined";

  const [state, setState] = useState(() => {
    if (!isBrowser) return defaultValue;

    const persistedState = localStorage.getItem(key);
    return persistedState === null ? defaultValue : JSON.parse(persistedState);
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isBrowser]);

  return [state, setState];
};

export default usePersistedState;
