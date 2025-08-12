import { useMixcloud } from "contexts/mixcloud";
import React, { useEffect } from "react";
import { mcKeyFormatter, mcWidgetUrlFormatter } from "utils/functions";

import { StyledMixcloudWidget } from "./StyledMixcloud";

export const Mixcloud: React.FC = () => {
  const {
    mcKey,
    tempRouteValue,
    widget: { iframeRef, widgetUrl },
    controls: { setTempRouteValueFromRoute },
  } = useMixcloud();

  // Construct alternative URL if temp route value exists
  let effectiveWidgetUrl = widgetUrl;
  let effectiveMcKey = mcKey;
  
  if (tempRouteValue) {
    const formattedTempKey = mcKeyFormatter(tempRouteValue);
    effectiveWidgetUrl = mcWidgetUrlFormatter(formattedTempKey);
    effectiveMcKey = formattedTempKey;
    console.log("🎵 MIXCLOUD WIDGET - Using temp route value:", tempRouteValue);
    console.log("🎵 MIXCLOUD WIDGET - Formatted key:", formattedTempKey);
    console.log("🎵 MIXCLOUD WIDGET - Alternative URL:", effectiveWidgetUrl);
  }

  // Don't auto-clear temp route value here - let it persist until after initial load

  // Only render the widget if we have valid values
  if (!effectiveMcKey || !effectiveWidgetUrl) {
    return null;
  }

  return (
    <StyledMixcloudWidget
      ref={iframeRef}
      src={effectiveWidgetUrl}
      width="100%"
      height="60"
      frameBorder="0"
      allow="autoplay"
      title="Mixcloud Widget Player"
    />
  );
};

export default Mixcloud;
