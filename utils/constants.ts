import { BackgroundExtended } from "db/types";

export const DEBUG = false;
export const VOLUME_AVAILABLE = true;
export const GA4 = false;
export const AUTO_CHANGE_BACKGROUND = true;
export const DEFAULT_LOCALE = "en-GB";
export const DEFAULT_MESSAGE = "Stef FM - Funky House Coming In Your Ears";
export const DEFAULT_TITLE = "Stef.FM - Funky House Coming In Your Ears";
export const DEFAULT_VOLUME = 1;
export const DISPLAY_LENGTH = 24;
export const NOISE_BACKGROUND_LOW = `
  data:image/png;base64,
  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAn8CBG0xnoYAAAAASUVORK5CYII=
`;
export const NOISE_BACKGROUND_MEDIUM = `
  data:image/png;base64,
  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAn8CBG0xnoYAAAAASUVORK5CYII=
`;

export const NOISE_BACKGROUND_HIGH = `
  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1HAwCAAAAY0lEQVR42mJ89uzZfwYKAAD8nH8cDZycnJSUlIyNjWXX0+Tl5U1NTY2BgYG8uXL5+vv7w9/fj6e3t9fT0/P3+vpaWlhYWFtDZ2cnDw8N3d3evw8HAwMDB+fn5PT09HR0dVVVV5cXFyUlJS+fwcPCAQWYA+YGAAAAAElFTkSuQmCC
`;
export const SCREEN_SPEED_HOLDING = 200;
export const SCREEN_SPEED_TEMPORARY = 120;
export const GOOGLE_TRACKING_ID = "G-P82N7RRW45";
export const DEFAULT_BACKGROUND: BackgroundExtended = {
  backgroundCategory: "table",
  name: "Wood 6",
  fileName: "wood-pattern6.png",
  tileType: "tile",
  width: 317,
  height: 400,
  backgroundCategoryObject: {
    code: "table",
    name: "Tabletop",
    folder: "wallpapers/table",
    type: "Macintosh",
    order: 1,
  },
};
export const STORAGE_PREFIX = "https://steffm.blob.core.windows.net/steffm/";
