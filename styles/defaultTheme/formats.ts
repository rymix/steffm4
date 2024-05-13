const formats = {
  layout: {
    width: "720px",
  },
  fontFamily: {
    default:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    tickerTape: "dseg14, monospace, 'Courier New'",
    badge: "edgar",
  },
  date: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  } as Intl.DateTimeFormatOptions,
  equalizer: {
    mix: {
      transitionSpeed: {
        active: 0.25,
        inactive: 0.75,
      },
      minHeight: 10,
      maxHeight: 100,
      updateDelay: 100,
      pulseSpeed: 1500,
      pulseDelay: 1000,
    },
    track: {
      transitionSpeed: {
        active: 0.25,
        inactive: 0.75,
      },
      minHeight: 10,
      maxHeight: 70,
      updateDelay: 100,
      pulseSpeed: 3000,
      pulseDelay: 1000,
    },
  },
  longDate: {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  } as Intl.DateTimeFormatOptions,
  time: {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  } as Intl.DateTimeFormatOptions,
  tooltipDate: {
    month: "long",
    day: "numeric",
    year: "numeric",
  } as Intl.DateTimeFormatOptions,
  tooltipWeekday: {
    weekday: "long",
  } as Intl.DateTimeFormatOptions,
  ticker: {
    displayLength: 18,
    pauseDelay: 0,
    tickDelay: 200,
  },
  transition: {
    default: 250,
    fast: 100,
  },
};

export default formats;
