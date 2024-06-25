import styled from "styled-components";

export const StyledJupiterScreenWrapper = styled.div`
  align-items: center;
  background: yellow;
  display: flex;
  font-family: "dseg14";
  font-size: clamp(16px, 220%, 34px);
  font-size: 40px;
  font-weight: bold;
  height: 100px;
  justify-content: flex-end;
  width: 500px;
`;

export const StyledJupiterScreen = styled.div<{ displayLength: number }>`
  display: flex;
  justify-content: flex-end;
  position: relative;

  &:before {
    content: "${(props) => "~".repeat(props.displayLength)}";
    display: block;
    opacity: 0.2;
    position: absolute;
    text-shadow: none;
  }
`;
