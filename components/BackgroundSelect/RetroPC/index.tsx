import Screen from "components/BackgroundSelect/RetroPC/Screen";
import {
  StyledMonitor,
  StyledMonitorPanel,
  StyledMonitorWrapper,
  StyledScreenWrapper,
} from "components/BackgroundSelect/RetroPC/StyledRetroPC";
import React from "react";

const MonitorComponent: React.FC = () => {
  return (
    <StyledMonitorWrapper>
      <StyledMonitor>
        <StyledMonitorPanel />
        <StyledScreenWrapper>
          <Screen />
        </StyledScreenWrapper>
      </StyledMonitor>
    </StyledMonitorWrapper>
  );
};

export default MonitorComponent;
