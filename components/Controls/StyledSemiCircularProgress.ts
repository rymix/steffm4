import styled from "styled-components";

interface StyledSemiCircularProgressProps {
  value: number;
  position: "top" | "bottom";
  start: "left" | "right";
  barWidth?: number;
}

const getStartTurn = (position: "top" | "bottom", start: "left" | "right") => {
  if (position === "top") {
    return start === "left" ? "0.75turn" : "0.25turn";
  }
  return start === "left" ? "1.25turn" : "0.75turn";
};

export const StyledSemiCircularProgress = styled.div<StyledSemiCircularProgressProps>`
  --percentage: ${(props) => props.value};
  --primary: rgba(0.5, 0.5, 0.5, 0.8);
  --secondary: rgba(0.5, 0.5, 0.5, 0.2);
  --size: 400px;
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: ${(props) =>
    props.position === "top" ? "50% / 100% 100% 0 0" : "50% / 0 0 100% 100%"};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: ${(props) =>
    props.position === "top" ? "flex-end" : "flex-start"};
  justify-content: center;
  transform: ${(props) =>
    props.position === "bottom" ? "scaleX(-1)" : "none"};

  &::before {
    content: "";
    position: absolute;
    top: ${(props) => (props.position === "top" ? "0" : "auto")};
    bottom: ${(props) => (props.position === "bottom" ? "0" : "auto")};
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from ${(props) => getStartTurn(props.position, props.start)} at 50%
        ${(props) => (props.position === "top" ? "100%" : "0%")},
      var(--primary) 0%,
      var(--primary) calc(var(--percentage) * 1% / 2),
      var(--secondary) calc(var(--percentage) * 1% / 2),
      var(--secondary) 100%
    );
    mask: radial-gradient(
      at 50% ${(props) => (props.position === "top" ? "100%" : "0%")},
      white ${(props) => 55 - (props.barWidth || 5)}%,
      transparent ${(props) => 55 - (props.barWidth || 5) + 0.5}%
    );
    mask-mode: alpha;
    -webkit-mask: radial-gradient(
      at 50% ${(props) => (props.position === "top" ? "100%" : "0%")},
      #0000 ${(props) => 70 - (props.barWidth || 5)}%,
      #000 ${(props) => 70 - (props.barWidth || 5) + 0.5}%
    );
    -webkit-mask-mode: alpha;
  }

  &::after {
    counter-reset: percentage var(--value);
    content: "";
    font-family: Helvetica, Arial, sans-serif;
    font-size: calc(var(--size) / 5);
    color: var(--primary);
  }
`;
