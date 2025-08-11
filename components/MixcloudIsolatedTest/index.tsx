import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const MixcloudIsolatedTest: React.FC = () => {
  const {
    mcKey,
    widget: { iframeRef, widgetUrl },
  } = useMixcloud();

  // Only render the widget if we have a valid mcKey and widgetUrl
  if (!mcKey || !widgetUrl) {
    return null;
  }

  return (
    <iframe
      ref={iframeRef}
      src={widgetUrl}
      width="100%"
      height="60"
      frameBorder="0"
      allow="autoplay"
      title="Mixcloud Widget Player"
    />
  );
};

export default MixcloudIsolatedTest;
