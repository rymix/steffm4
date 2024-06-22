import { Slider } from "@mui/material";
import styled from "styled-components";

export const StyledJupiterSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 100px;
  width: 54px;
`;

export const StyledJupiterSlider = styled(Slider)`
  .MuiSlider-track {
    background: blue;
    display: none;
  }
`;
