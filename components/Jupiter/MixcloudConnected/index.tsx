import {
  StyledJupiterMixcloudConnected,
  StyledJupiterMixcloudConnectedWrapper,
} from "components/Jupiter/MixcloudConnected/StyledJupiterMixcloudConnected";
import { useMixcloud } from "contexts/mixcloud";
import { useMemo } from "react";

const JupiterMixcloudConnected: React.FC = () => {
  const {
    isReady,
    widget: { loaded, scriptLoaded, player, playerUpdated },
  } = useMixcloud();

  // Determine connection status based on multiple factors
  const isConnected = useMemo(() => {
    // Check if all critical components are ready
    const widgetReady = loaded && scriptLoaded && player && playerUpdated;
    const systemReady = isReady;

    return widgetReady && systemReady;
  }, [isReady, loaded, scriptLoaded, player, playerUpdated]);

  return (
    <StyledJupiterMixcloudConnectedWrapper>
      <StyledJupiterMixcloudConnected $connected={isConnected} />
    </StyledJupiterMixcloudConnectedWrapper>
  );
};

export default JupiterMixcloudConnected;
