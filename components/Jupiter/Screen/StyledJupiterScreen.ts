import styled from "styled-components";

export const StyledJupiterScreenWrapper = styled.div`
  align-items: center;
  background: #024;
  background-image: linear-gradient(170deg, #0007, transparent 50%),
    linear-gradient(to bottom, transparent, #fff1 95%, #fff4 100%);
  display: flex;
  font-family: "dseg14";
  font-size: 40px;
  font-weight: bold;
  height: 100px;
  justify-content: flex-end;
  width: 500px;
`;

export const StyledJupiterScreen = styled.div<{ displayLength: number }>`
  color: #3af;
  display: flex;
  justify-content: flex-end;
  position: relative;
  text-shadow: 0 0 0.25em #3af;

  &:before {
    content: "${(props) => "~".repeat(props.displayLength)}";
    display: block;
    opacity: 0.1;
    position: absolute;
    text-shadow: none;
  }
`;
