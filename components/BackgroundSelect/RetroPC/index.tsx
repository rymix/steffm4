import Screen from "components/BackgroundSelect/RetroPC/Screen";
import {
  StyledMonitor,
  StyledMonitorPanel,
  StyledMonitorStand,
  StyledMonitorWrapper,
} from "components/BackgroundSelect/RetroPC/StyledRetroPC";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

const MonitorComponent: React.FC = () => {
  const {
    session: { scale },
  } = useMixcloud();

  return (
    <StyledMonitorWrapper $scale={scale}>
      <StyledMonitor>
        <StyledMonitorPanel />
        <Screen />
        <StyledMonitorStand />
      </StyledMonitor>
    </StyledMonitorWrapper>
  );
};

export default MonitorComponent;
