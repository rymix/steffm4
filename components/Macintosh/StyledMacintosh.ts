import styled from "styled-components";

export const StyledMacintosh = styled.div`
  display: block;
  width: 340px;
  height: 475px;
  margin: 125px auto;
  position: relative;
  box-shadow: 0 80px 60px -60px rgba(0, 0, 0, 0.4);
`;

export const StyledMonitor = styled.div`
  z-index: 2;
  display: block;
  width: 100%;
  height: 410px;
  border-radius: 15px;
  background-color: #dddbc2;
  position: absolute;
  background-image: linear-gradient(#dddbc2, #dfdac4);
  background-image: conic-gradient(
    #dddbc2 0 10.5%,
    #ececd5 11% 11.5%,
    #cecdae 12% 38%,
    #c8c4a7 39% 61.5%,
    #c7c3a6 62% 88%,
    #dfdac4 88.5% 89%,
    #dddbc2 89.25%
  );
  box-shadow: 0 60px 20px -20px rgba(142, 137, 97, 0.5);
`;

export const StyledMonitorInner = styled.div`
  display: block;
  width: 320px;
  height: 360px;
  background-image: linear-gradient(#cac6a9, #cfceb0);
  margin: auto;
  position: absolute;
  top: 22px;
  left: 0;
  right: 0;
  border-radius: 5px;
`;

export const StyledScreenCutout = styled.div`
  display: block;
  width: 280px;
  height: 225px;
  background-color: #dddbc2;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  border-radius: 5px;
  background-image: linear-gradient(#938f6a, #e0dfc3);
  background-image: conic-gradient(
    #938f6a 12.5%,
    #b5b293 15.5% 33%,
    #e0dfc3 34% 65.5%,
    #c2c1a2 66.5% 83.5%,
    #938f6a 86.5%
  );
`;

export const StyledScreen = styled.div`
  display: block;
  width: 260px;
  height: 195px;
  background-color: #4f5555;
  background-image: radial-gradient(#525b5a, #50585a);
  margin: auto;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  border-radius: 20px;
  box-shadow: 0 0 20px 10px #2b3030 inset;
`;

export const StyledLogo = styled.div`
  display: block;
  width: 22px;
  height: 22px;
  background-image: radial-gradient(#c9c6b5, #cbcbba);
  border-radius: 2px;
  position: absolute;
  left: 22px;
  bottom: 22px;
  padding-left: 3.5px;
  box-shadow: 0 0 2px 0px #979181 inset;
`;

export const StyledLogoText = styled.p`
  text-align: center;
  margin-top: -2px;
`;

export const StyledOpening = styled.div`
  display: block;
  width: 155px;
  height: 15px;
  background-image: linear-gradient(#bebb9c, #cac8a7 74.5% 75.5%);
  background-image: conic-gradient(
    #bebb9c 0% 23.5%,
    #c7c2a2 24.5% 25%,
    #dcd8bd 26% 73.5%,
    #cac8a7 74.5% 75.5%,
    #bebb9c 76.5%
  );
  position: absolute;
  bottom: 55px;
  right: 21px;
  border-radius: 4px;
`;

export const StyledOpeningInner = styled.div`
  display: block;
  width: 126px;
  height: 8px;
  background-color: #181914;
  border-radius: 2px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 3.5px;
`;

export const StyledFoot = styled.div`
  display: block;
  width: 100%;
  height: 85px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-radius: 7px;
  background-image: linear-gradient(#bbb497, #c1be9f);
  box-shadow:
    14px 0 3px -7px #cccab1 inset,
    -14px 0 3px -7px #cecdb1 inset,
    0 32px 3px -7px #c1be9f inset,
    0 -6px 3px -4px #aeaa87 inset;
`;

export const StyledInset = styled.div`
  display: inline;
  width: 16px;
  height: 16px;
  background-color: #c3bea0;
  position: absolute;
  bottom: 20px;
  left: 35px;
  border-radius: 2px;
  box-shadow:
    0 0 2px #c9c3a3 inset,
    0 0px 2px 1px #bcb694;
`;

export const StyledCableContainer = styled.div`
  display: block;
  width: 60px;
  height: 30px;
  background-color: #c3bea0;
  position: absolute;
  right: 30px;
  bottom: 15px;
  border-radius: 3px;
  box-shadow:
    0 2px 1px -1px #d0cbae inset,
    4px 0 1px -1px #bab492 inset,
    -5px 0 2px -2px #a8a281 inset,
    0 -4px 2px -3px #ada88b inset;
`;

export const StyledCableHole = styled.div`
  display: block;
  width: 18px;
  height: 20px;
  background-color: #848580;
  position: absolute;
  top: 5px;
  right: 7px;
  border-radius: 3px;
  box-shadow:
    0 -4px 0.5px -0.5px rgba(25, 25, 25, 0.2) inset,
    -2px 0 0.5px -0.5px rgba(25, 25, 25, 0.2) inset,
    2px 0 0.5px -0.5px rgba(25, 25, 25, 0.2) inset;
  background-image: linear-gradient(
      #848580 20%,
      transparent 20% 80%,
      #848580 80%
    ),
    linear-gradient(90deg, transparent 30%, #181914 30% 70%, transparent 70%);
`;
