import { stripUnit } from "polished";

export const convertTimeToSeconds = (timeString: string): number => {
  const parts = timeString.split(":").map((part) => Number.parseInt(part, 10));
  let seconds = 0;

  if (parts.length === 3) {
    // h:mm:ss format
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // mm:ss format
    seconds = parts[0] * 60 + parts[1];
  }

  return seconds;
};

export const veryShortName = (shortName: string): string => {
  const parts = shortName.split(" - ");
  return parts[1] ?? shortName;
};

export const debounce = (
  func: (...args: any[]) => void,
  delay: number,
): (() => void) => {
  let inDebounce: ReturnType<typeof setTimeout> | null;

  return function debouncedFunction(this: any, ...args: any[]) {
    if (inDebounce) clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(this, args), delay);
  };
};

export const pxToNum = (value: string | number = 0): number =>
  Number(stripUnit(value));
