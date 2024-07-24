import styled from "styled-components";

const monitorWidth = 320;

export const StyledMonitorWrapper = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: center;
`;

export const StyledMonitor = styled.div`
  width: ${monitorWidth}px;
  height: ${monitorWidth * 0.774}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    121.79deg,
    rgba(231, 223, 208, 1) 0%,
    rgba(220, 209, 187, 1) 3.75%
  );
  border-radius: 3px 3px 0px 0px;
  position: relative;

  x&::after {
    content: "";
    position: absolute;
    width: ${monitorWidth * 0.742}px;
    height: ${monitorWidth * 0.531}px;
    background: linear-gradient(
      119.8deg,
      rgba(131, 134, 140, 1) 0%,
      rgba(41, 45, 54, 1) 69.96%
    );
    box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.42);
    border-radius: 2px;
  }

  &::before {
    content: "";
    position: absolute;
    width: ${monitorWidth * 0.806}px;
    height: ${monitorWidth * 0.581}px;
    background: rgba(220, 209, 187, 1);
    box-shadow:
      inset 0px 267px 4px -8px rgba(0, 0, 0, 0.25),
      inset 0px 0px 10px 6px rgba(162, 158, 150, 1);
    filter: blur(0.9px);
  }
`;

export const StyledScreenWrapper = styled.div``;

export const StyledMonitorPanel = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 10%;
  background: rgba(220, 209, 187, 1);
  box-shadow:
    0px 10px 22px rgba(0, 0, 0, 0.25),
    inset 0px 4px 2px -2px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    background: rgba(220, 209, 187, 1);
    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 1);
  }
`;
