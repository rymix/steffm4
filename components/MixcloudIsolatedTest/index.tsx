import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { mcKeyFormatter, mcWidgetUrlFormatter } from "utils/functions";

export const MixcloudIsolatedTest: React.FC = () => {
  const {
    mcKey,
    tempRouteValue,
    widget: { iframeRef, widgetUrl },
  } = useMixcloud();

  // Construct alternative URL if temp route value exists
  let effectiveWidgetUrl = widgetUrl;
  let effectiveMcKey = mcKey;
  
  if (tempRouteValue) {
    const formattedTempKey = mcKeyFormatter(tempRouteValue);
    effectiveWidgetUrl = mcWidgetUrlFormatter(formattedTempKey);
    effectiveMcKey = formattedTempKey;
    console.log("🎵 WIDGET - Using temp route value:", tempRouteValue);
    console.log("🎵 WIDGET - Formatted key:", formattedTempKey);
    console.log("🎵 WIDGET - Alternative URL:", effectiveWidgetUrl);
  }

  // Only render the widget if we have valid values
  if (!effectiveMcKey || !effectiveWidgetUrl) {
    return null;
  }

  return (
    <iframe
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

export default MixcloudIsolatedTest;
