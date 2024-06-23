import type {
  StyledInnerKnobProps,
  StyledKnobWrapperProps,
  StyledOuterKnobProps,
} from "components/Jupiter/Knob/types";
import styled from "styled-components";

export const StyledJupiterKnobWrapper = styled.div<StyledKnobWrapperProps>`
  display: flex;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

export const StyledJupiterOuterKnob = styled.div<StyledOuterKnobProps>`
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(100% 70%, #666 6%, #333 90%);
  box-shadow:
    0 5px 15px 2px #333,
    0 0 5px 3px #333,
    0 0 0 6px #444;
  margin: ${(props) => props.margin}px;
`;

export const StyledJupiterInnerKnob = styled.div<StyledInnerKnobProps>`
  border-radius: 50%;
  transform: rotate(${(props) => props.deg}deg);
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
