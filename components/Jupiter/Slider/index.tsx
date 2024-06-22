import {
  StyledJupiterSlider,
  StyledJupiterSliderWrapper,
} from "components/Jupiter/Slider/StyledJupiterSlider";
import type { JupiterSliderProps } from "components/Jupiter/Slider/types";
import JupiterHandle from "public/images/albumArt.png";
import React from "react";

console.log("JupiterHandle", JupiterHandle.src);

const JupiterSlider: React.FC<JupiterSliderProps> = ({
  orientation = "vertical",
}) => {
  return (
    <>
      <StyledJupiterSliderWrapper>
        <StyledJupiterSlider
          aria-label="Volume"
          orientation={orientation}
          defaultValue={70}
          min={0}
          max={100}
          sx={{
            "& .MuiSlider-thumb": {
              width: "24px",
              height: "24px",
              borderRadius: "1px",
              background: `url(${JupiterHandle.src}) no-repeat center center`,
              backgroundSize: "cover",
              boxShadow: "none",
              "&:focus, &:hover, &:active": {
                boxShadow: "none",
              },
            },
          }}
        />
      </StyledJupiterSliderWrapper>
    </>
  );
};

export default JupiterSlider;
