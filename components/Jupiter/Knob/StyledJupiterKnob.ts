import type {
  StyledInnerKnobProps,
  StyledKnobWrapperProps,
  StyledOuterKnobProps,
} from "components/Jupiter/Knob/types";
import styled from "styled-components";

export const StyledJupiterKnobWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 128px;
  width: 54px;
`;

export const StyledJupiterOuterKnobWrapper = styled.div<StyledKnobWrapperProps>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledJupiterOuterKnob = styled.div.attrs<StyledOuterKnobProps>(
  ({ $margin }) => ({
    style: {
      margin: `${$margin}px`,
    },
  }),
)<StyledOuterKnobProps>`
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(100% 70%, #666 6%, #333 90%);
  box-shadow:
    0 5px 15px 2px #333,
    0 0 5px 3px #333,
    0 0 0 6px #444;
`;

export const StyledJupiterInnerKnob = styled.div.attrs<StyledInnerKnobProps>(
  ({ $deg }) => ({
    style: {
      transform: `rotate(${$deg}deg)`,
    },
  }),
)<StyledInnerKnobProps>`
  border-radius: 50%;
`;

export const StyledJupiterGrip = styled.div`
  position: absolute;
  width: 3px;
  height: 10px;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: #e43728;
  box-shadow: 0 0 3px 1px black;
`;
