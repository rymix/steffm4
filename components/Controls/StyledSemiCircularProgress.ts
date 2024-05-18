import styled, { keyframes } from "styled-components";

interface StyledSemiCircularProgressProps {
  value: number;
}

const semicircularProgress = (value: number) => keyframes`
  0% {
    --percentage: 0;
  }
  100% {
    --percentage: ${value};
  }
`;

export const StyledSemiCircularProgress = styled.div<StyledSemiCircularProgressProps>`
  --percentage: ${(props) => props.value};
  --primary: #ffffff;
  --secondary: #2b256b;
  --size: 300px;
  animation: ${(props) => semicircularProgress(props.value)} 2s 0.5s forwards;
  width: 100%;
  aspect-ratio: 2 / 1;
  border-radius: 50% / 100% 100% 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from 0.75turn at 50% 100%,
      var(--primary) calc(var(--percentage) * 1% / 2),
      var(--secondary) calc(var(--percentage) * 1% / 2 + 0.1%)
    );
    mask: radial-gradient(at 50% 100%, white 55%, transparent 55.5%);
    mask-mode: alpha;
    -webkit-mask: radial-gradient(at 50% 100%, #0000 55%, #000 55.5%);
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
