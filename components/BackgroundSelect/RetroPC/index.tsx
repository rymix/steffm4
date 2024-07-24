import Screen from "components/BackgroundSelect/RetroPC/Screen";
import {
  StyledMonitor,
  StyledMonitorPanel,
  StyledMonitorStand,
  StyledMonitorWrapper,
} from "components/BackgroundSelect/RetroPC/StyledRetroPC";
import React from "react";

const MonitorComponent: React.FC = () => {
  return (
    <StyledMonitorWrapper>
      <StyledMonitor>
        <StyledMonitorPanel />
        <Screen />
        <StyledMonitorStand />
      </StyledMonitor>
    </StyledMonitorWrapper>
  );
};

export default MonitorComponent;
