import {
  StyledDx7MixcloudConnected,
  StyledDx7MixcloudConnectedWrapper,
} from "components/Dx7/MixcloudConnected/StyledDx7MixcloudConnected";
import { useMixcloud } from "contexts/mixcloud";
import { useMemo } from "react";

const Dx7MixcloudConnected: React.FC = () => {
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
    <StyledDx7MixcloudConnectedWrapper>
      <StyledDx7MixcloudConnected $connected={isConnected} />
    </StyledDx7MixcloudConnectedWrapper>
  );
};

export default Dx7MixcloudConnected;
