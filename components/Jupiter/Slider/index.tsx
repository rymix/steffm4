import {
  StyledJupiterSlider,
  StyledJupiterSliderWrapper,
} from "components/Jupiter/Slider/StyledJupiterSlider";
import type { JupiterSliderProps } from "components/Jupiter/Slider/types";
import JupiterHandle from "public/svg/slider-handle.svg";
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
              width: "28.8px",
              height: "13.2px",
              borderRadius: "1px",
              background: `url(${JupiterHandle.src}) no-repeat center center`,
              backgroundSize: "cover",
              boxShadow: "none",
              "&:focus, &:hover, &:active": {
                boxShadow: "none",
              },
            },
            "& .MuiSlider-track": {
              width: "8px",
              backgroundColor: "black",
              position: "relative",
            },
            "& .MuiSlider-rail": {
              width: "8px",
              backgroundColor: "black",
              opacity: 1,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: "28.8px",
                height: "100%",
                background: `linear-gradient(
                  to bottom,
                  transparent 0%,
                  black 2%,
                  transparent 3%,
                  transparent 15%,
                  black 17%,
                  transparent 18%,
                  transparent 31%,
                  black 33%,
                  transparent 34%,
                  transparent 48%,
                  black 51%,
                  transparent 52%,
                  transparent 65%,
                  black 67%,
                  transparent 68%,
                  transparent 81%,
                  black 83%,
                  transparent 84%,
                  transparent 96%,
                  black 99%,
                  transparent 100%
                )`,
                pointerEvents: "none",
              },
            },
            "& .MuiSlider-root": {
              padding: "0 8px",
            },
          }}
        />
      </StyledJupiterSliderWrapper>
    </>
  );
};

export default JupiterSlider;
