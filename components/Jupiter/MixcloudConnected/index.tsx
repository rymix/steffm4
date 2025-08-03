import {
  StyledJupiterMixcloudConnected,
  StyledJupiterMixcloudConnectedWrapper,
} from "components/Jupiter/MixcloudConnected/StyledJupiterMixcloudConnected";
import { useMixcloud } from "contexts/mixcloud";
import { useMemo } from "react";

const JupiterMixcloudConnected: React.FC = () => {
  const {
    isReady,
    widget: { loaded, scriptLoaded, player },
  } = useMixcloud();

  // Determine connection status based on multiple factors
  const isConnected = useMemo(() => {
    // Check if all critical components are ready
    // In production, isReady might not be set due to SSR/hydration issues
    // so we'll rely more on the actual widget state
    const widgetReady = loaded && scriptLoaded && player;
    // If we have a player and script is loaded, we're essentially "ready"
    // This makes the component more resilient to SSR/hydration issues
    const systemReady = isReady || (scriptLoaded && player);

    return widgetReady && systemReady;
  }, [isReady, loaded, scriptLoaded, player]);

  return (
    <StyledJupiterMixcloudConnectedWrapper>
      <StyledJupiterMixcloudConnected $connected={isConnected} />
    </StyledJupiterMixcloudConnectedWrapper>
  );
};

export default JupiterMixcloudConnected;
