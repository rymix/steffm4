import styled from "styled-components";

export const StyledMonitorContainer = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  background-repeat: no-repeat;
`;

export const StyledMainMonitor = styled.div`
  position: absolute;
  width: 100%;
  height: 78%;
  background:
    linear-gradient(
        to right,
        rgba(193, 182, 159, 1) 7%,
        rgba(255, 255, 255, 0) 8%
      )
      0% 0% / 10% 100%,
    linear-gradient(
        to left,
        rgba(193, 182, 159, 1) 7%,
        rgba(255, 255, 255, 0) 8%
      )
      100% 0% / 10% 100%,
    linear-gradient(
        to left,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.02)
      )
      100% 0% / 10% 100%,
    linear-gradient(
        to right,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.02)
      )
      0% 0% / 10% 100%,
    linear-gradient(
        to right,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.02)
      )
      0% 0% / 10% 100%,
    linear-gradient(
        to left,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.02)
      )
      100% 0% / 10% 100%,
    radial-gradient(
        220% 100% at 50% 100%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1) 51%
      )
      55% -55px / 100% 110px,
    rgba(218, 209, 190, 1);
  background-repeat: no-repeat;
  border-radius: 20px;

  &:before {
    width: 100%;
    height: 77%;
    content: "";
    position: absolute;
    border-radius: 20px;
    top: -2%;
    background: radial-gradient(
        250% 100% at 50% 100%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 1) 51%
      )
      55% -55px / 100% 110px;
    background-repeat: no-repeat;
  }

  &:after {
    width: 100%;
    height: 77%;
    content: "";
    position: absolute;
    border-radius: 20px;
    top: -2%;
    background: radial-gradient(
        250% 100% at 50% 100%,
        rgba(255, 255, 255, 0) 35%,
        rgba(255, 255, 255, 0.05) 40%,
        rgba(255, 255, 255, 1) 45%
      )
      55% -55px / 100% 110px;
    background-repeat: no-repeat;
  }
`;

export const StyledInnerMonitor1 = styled.div`
  width: 81%;
  height: 73.5%;
  background:
    radial-gradient(
        100% 100% at 50% 50%,
        rgba(255, 255, 255, 0.1),
        rgba(65, 67, 62, 1)
      )
      55% 50% / 100% 100%,
    rgba(80, 88, 85, 1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-repeat: no-repeat;

  &:after {
    width: 100%;
    height: 102%;
    content: "";
    position: absolute;
    border-radius: 10px;
    top: -2%;
    background:
      linear-gradient(
          to left,
          rgba(255, 255, 255, 0.33),
          rgba(255, 255, 255, 0)
        )
        100% 100% / 5% 95%,
      linear-gradient(
          to left,
          rgba(255, 255, 255, 0.3) 10%,
          rgba(255, 255, 255, 0) 15%
        )
        100% 100% / 5% 95%,
      linear-gradient(
          to left,
          rgba(255, 255, 255, 0.3) 10%,
          rgba(255, 255, 255, 0) 15%
        )
        100% 100% / 5% 95%,
      linear-gradient(
          to top,
          rgba(255, 255, 255, 0.1) 15%,
          rgba(255, 255, 255, 0)
        )
        100% 100% / 100% 10%,
      linear-gradient(
          to top,
          rgba(255, 255, 255, 0.3) 5%,
          rgba(255, 255, 255, 0) 10%
        )
        100% 100% / 100% 10%,
      linear-gradient(
          to right,
          rgba(255, 255, 255, 0.3) 10%,
          rgba(255, 255, 255, 0) 15%
        )
        0% 100% / 5% 95%,
      radial-gradient(
          300% 100% at 50% 100%,
          rgba(80, 88, 85, 0) 35%,
          rgba(255, 255, 255, 0.6) 49%,
          rgba(218, 209, 190, 1) 51%
        )
        55% -50px / 100% 110px,
      linear-gradient(
          to right,
          rgba(255, 255, 255, 0.33),
          rgba(255, 255, 255, 0)
        )
        0% 0% / 5% 100%;
    background-repeat: no-repeat;
  }
`;

export const StyledMonitorMiddleButtonContainer = styled.div`
  width: 83%;
  height: 11%;
  position: absolute;
  top: 78.5%;
  left: 50.5%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background:
    linear-gradient(to left, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0))
      100% 0% / 10% 100%,
    linear-gradient(to right, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))
      0% 0% / 10% 100%,
    linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0)
      )
      100% 0% / 100% 10%,
    rgba(179, 168, 142, 1);
  background-repeat: no-repeat;
`;

export const StyledMonitorMiddleButtonBottom = styled.div`
  width: 84%;
  height: 10%;
  position: absolute;
  top: 83%;
  left: 50.5%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
`;

export const StyledMonitorMiddleButtonLightPart = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 82%;
  height: 10.5%;
  position: absolute;
  top: 79%;
  left: 50.5%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background:
    linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.2),
        rgba(169, 156, 128, 1) 30%,
        rgba(255, 255, 255, 0) 60%
      )
      100% 100% / 100% 50%,
    linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1))
      100% 0% / 50% 100%,
    linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1))
      0% 0% / 50% 100%,
    rgba(213, 203, 182, 1);
  background-repeat: no-repeat;
`;

export const StyledButtonsLeft = styled.div`
  width: 96px; /* 32% of 300px */
  height: 135px; /* 45% of 300px */
  border-radius: 4px;
  position: absolute;
  top: 174px; /* 58% of 300px */
  left: 118.5px; /* 39.5% of 300px */
  transform: translate(-50%, -50%);
  box-shadow: 0 16px 19.2px 0px rgba(0, 0, 0, 0.4);
  background: rgba(215, 205, 185, 1);
  background-repeat: no-repeat;
`;

export const StyledButton = styled.div`
  width: 17px; /* 1.7em */
  height: 100%;
  background: rgba(35, 35, 35, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    width: 14px; /* 1.4em */
    height: 14px;
    background:
      radial-gradient(
          100% 100% at 50% 50%,
          rgba(222, 215, 196, 0.5),
          rgba(191, 181, 159, 1) 50%,
          rgba(255, 255, 255, 0) 51%
        )
        61% 0% / 100% 100%,
      rgba(191, 181, 159, 1);
    content: "";
    position: absolute;
    border-radius: inherit;
  }
`;

export const StyledButtonsLeftContainer = styled.div`
  width: 150px; /* 50% of 300px */
  height: 82.5px; /* 55% of 150px */
  position: absolute;
  top: 87px; /* 29% of 300px */
  left: 118.5px; /* 39.5% of 300px */
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
`;

export const StyledButtonsRightContainer = styled.div`
  width: 69px; /* 23% of 300px */
  height: 82.5px; /* 55% of 150px */
  position: absolute;
  top: 87px; /* 29% of 300px */
  left: 252px; /* 84% of 300px */
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
`;

export const StyledButtonsMiddleContainer = styled.div`
  position: absolute;
  top: 150px; /* 50% of 300px */
  left: 183px; /* 61% of 300px */
  width: 90px; /* 9em */
  height: 11px; /* 1.1em */
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  &:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0),
        rgba(183, 170, 142, 1)
      )
      0% 0% / 100% 50%;
    background-repeat: no-repeat;
  }
`;

export const StyledMonitorPowerButtonContainer = styled.div`
  width: 33px; /* 3.3em */
  height: 40px; /* 4em */
  position: absolute;
  top: 231px; /* 77% of 300px */
  left: 247.5px; /* 82.5% of 300px */
  transform: translate(-50%, -50%);
`;

export const StyledPower = styled.div`
  width: 32px; /* 3.2em */
  height: 32px;
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(214, 202, 176, 1);
  background: rgba(87, 82, 72, 1);

  &:after {
    width: 29px; /* 2.9em */
    height: 29px;
    border-radius: inherit;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:
      radial-gradient(
          100% 100% at 50% 50%,
          rgba(222, 215, 196, 0.7),
          rgba(191, 181, 159, 0.7) 50%,
          rgba(255, 255, 255, 0) 51%
        )
        61% 0% / 100% 100%,
      rgba(215, 204, 183, 1);
    background-repeat: no-repeat;
  }
`;

export const StyledLight = styled.div`
  width: 7.5px; /* 0.75em */
  height: 10px; /* 1em */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
      to bottom,
      rgba(247, 0, 0, 0.7),
      rgba(131, 56, 40, 0.7)
    )
    0% 0% / 10% 100%;
`;

export const StyledUnderMonitor = styled.div`
  width: 200px; /* 20em */
  height: 62px; /* 6.2em */
  position: absolute;
  top: 265.5px; /* 88.5% of 300px */
  left: 153.9px; /* 51.3% of 300px */
  transform: translate(-50%, -50%);
  background:
    radial-gradient(
        150% 100% at 50% 0%,
        rgba(255, 255, 255, 0) 45%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 51%
      )
      55% 2.5px / 100% 100%,
    radial-gradient(
        110% 100% at 50% 0%,
        rgba(255, 255, 255, 0) 46%,
        rgba(255, 255, 255, 0.65) 48%,
        rgba(255, 255, 255, 1) 50%
      )
      55% 15px / 100% 100%,
    linear-gradient(to right, rgba(255, 255, 255, 0), rgba(115, 107, 87, 0.3))
      100% 0% / 150px 21px,
    linear-gradient(to left, rgba(255, 255, 255, 0), rgba(115, 107, 87, 0.3)) 0%
      0% / 150px 21px,
    linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3))
      0% 0% / 210px 21px,
    linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2))
      100% 0% / 210px 21px,
    rgba(226, 216, 195, 1);
  background-repeat: no-repeat;
`;

export const StyledBase = styled.div``;
