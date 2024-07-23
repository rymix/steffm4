import {
  StyledInnerMonitor1,
  StyledMainMonitor,
  StyledMonitorContainer,
} from "components/RetroPC/StyledRetroPC";
import { RetroPCProps } from "components/RetroPC/types";
import React from "react";

const MonitorComponent: React.FC<RetroPCProps> = ({ background }) => {
  return (
    <StyledMonitorContainer>
      <StyledMainMonitor>
        <StyledInnerMonitor1 />
        {/* <div $background={background}>
          <div>
            {background?.name || ""} {background?.backgroundCategoryName || ""}
          </div>
        </div> */}
      </StyledMainMonitor>
      {/* <StyledMonitorMiddleButtonContainer /> */}
      {/* <StyledMonitorMiddleButtonBottom /> */}
      {/* <StyledMonitorMiddleButtonLightPart> */}
      {/* <StyledButtonsLeft>
        <StyledButtonsLeftContainer>
          <StyledButton />
          <StyledButton />
          <StyledButton />
          <StyledButton />
        </StyledButtonsLeftContainer>
        <StyledButtonsRightContainer>
          <StyledButton />
          <StyledButton />
        </StyledButtonsRightContainer>
      </StyledButtonsLeft> */}
      {/* <StyledButtonsMiddleContainer>
        <StyledButton />
        <StyledButton />
      </StyledButtonsMiddleContainer> */}
      {/* </StyledMonitorMiddleButtonLightPart> */}
      {/* <StyledMonitorPowerButtonContainer>
        <StyledLight />
        <StyledPower />
      </StyledMonitorPowerButtonContainer> */}
      {/* <StyledUnderMonitor /> */}
      {/* <StyledBase /> */}
    </StyledMonitorContainer>
  );
};

export default MonitorComponent;
