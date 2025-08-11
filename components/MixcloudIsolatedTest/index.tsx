import { useMixcloud } from "contexts/mixcloud";
import React from "react";

interface MixcloudWidgetProps {
  className?: string;
  style?: React.CSSProperties;
}

export const MixcloudIsolatedTest: React.FC<MixcloudWidgetProps> = ({
  className,
  style,
}) => {
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
      className={className}
      style={{
        border: "none",
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "transparent",
        ...style,
      }}
    />
  );
};

export default MixcloudIsolatedTest;
