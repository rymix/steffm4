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

export const convertTimeToHumanReadable = (
  durationString: string,
  delimiter: string = " ",
): string => {
  const parts = durationString.split(":");

  if (parts.length === 2) {
    // Format mm:ss
    const [minutes, seconds] = parts;
    return `${minutes}m${delimiter}${seconds}s`;
  }
  if (parts.length === 3) {
    // Format hh:mm:ss
    const [hours, minutes, seconds] = parts;
    return `${hours}h${delimiter}${minutes}m${delimiter}${seconds}s`;
  }
  // If format is incorrect or unexpected, return the original string
  return durationString;
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

/* Mixcloud specific functions */
export const mcKeyFormatter = (mcKey: string): string =>
  mcKey.startsWith("/rymixxx/") ? mcKey : `/rymixxx/${mcKey}/`;

export const mcKeyUnformatter = (mcKey: string): string =>
  mcKey.startsWith("/rymixxx/") ? mcKey.slice(9, -1) : mcKey;

export const mcKeyUrlFormatter = (mcKey: string): string =>
  `https://www.mixcloud.com${mcKeyFormatter(mcKey)}`;

export const mcWidgetUrlFormatter = (mcKey: string): string =>
  `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(
    mcKeyUrlFormatter(mcKey),
  )}`;

export const copyToClipboard = (text: string): void => {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator.clipboard is available
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Could not copy text:", error);
      });
  } else {
    // navigator.clipboard not available, fallback to older method
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      console.log(`Fallback: Copying text command was ${msg}`);
    } catch (error) {
      console.error("Fallback: Oops, unable to copy", error);
    }

    textArea.remove();
  }
};

export const replaceSpacesWithNbsp = (text: string): string => {
  return text.replaceAll(/\s/g, "\u00A0");
};

// Type guard function
export const isCategoryObject = (
  category: any,
): category is { code: string } => {
  return category && typeof category === "object" && "code" in category;
};

export const selectCoverArt = (local: string, remote: string): string => {
  return local || remote;
};
