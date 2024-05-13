import styled from "styled-components";

export const StyledPageWrapper = styled.div<{ $enable3D: boolean }>`
  width: 100%;
  height: 100vh;
  position: relative;
  perspective: ${(props) => (props.$enable3D ? "1000px" : "none")};
  overflow-x: hidden;
`;

export const StyledBackgroundWrapper = styled.div<{
  $backgroundImage: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 55%;
  left: 50%;
  width: 130%;
  height: 140vh;
  background-color: #795141;
  background-image: ${(props) =>
    props.$backgroundImage
      ? `url("images/wood-pattern${props.$backgroundImage}.png")`
      : `url("images/wood-pattern6.png")`};
  /* background-size: 700px; */
  transform: translate(-50%, -50%) rotateX(10deg) rotateY(0deg);
`;

export const StyledMixcloudContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 200px 0 100px 0;
  position: relative;
  width: 100%;
`;

export const StyledMixcloud = styled.div`
  height: auto;
  margin: 100px;
  position: relative;
  transition: transform 0.5s ease-in-out;
  width: clamp(320px, 75%, 620px);
`;

export const MixHeader = styled.div`
  background: #4682b4;
  width: 100%;
`;

export const StyledPlayer = styled.div`
  background-color: ${({ theme }) => theme.colors.case.bg};
  background-image:
  /* linear-gradient(
      to bottom,
      transparent 32px,
      #000a 32px,
      #0003 34px 36px,
      transparent 36px 40px,
      #000a 40px,
      #0004 42px 44px,
      transparent 44px 48px,
      #000a 48px,
      #0003 50px 52px,
      transparent 52px 56px,
      #000a 56px,
      #0003 58px 60px,
      transparent 60px 64px,
      #000a 64px,
      #0003 66px 68px,
      transparent 68px 184px,
      #fffc 186px,
      #0003 186px 212px,
      transparent 186px
    ), */ linear-gradient(
      150deg,
      transparent 50%,
      #0003
    ),
    var(--backgroundSVG);
  border-radius: 10px 10px 20px 20px;
  box-shadow:
    10px 0 20px #0008,
    20px 10px 30px #000b;
  /* padding: 15.5% 4.8% 4.8% 4.8%; */
  position: relative;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

export const StyledPlayerHeader = styled.div`
  background-image: linear-gradient(
    to bottom,
    transparent 32px,
    #000a 32px,
    #0003 34px 36px,
    transparent 36px 40px,
    #000a 40px,
    #0004 42px 44px,
    transparent 44px 48px,
    #000a 48px,
    #0003 50px 52px,
    transparent 52px 56px,
    #000a 56px,
    #0003 58px 60px,
    transparent 60px 64px,
    #000a 64px,
    #0003 66px 68px,
    transparent 68px 184px
  );
  height: 100px;
`;

export const StyledPlayerFlags = styled.div`
  background-image: linear-gradient(to bottom, #fffc 0px, #0003 0px 262px);
`;
