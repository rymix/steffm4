import { Slider } from "@mui/material";
import {
  StyledVolumeControls,
  StyledVolumeControlsWrapper,
  StyledVolumeDown,
  StyledVolumeUp,
} from "components/Volume/StyledVolume";
import { useMixcloud } from "contexts/mixcloud";
import { useTheme } from "styled-components";

export const Volume: React.FC = () => {
  const {
    widget: { setVolume, volume },
  } = useMixcloud();

  const theme = useTheme();
  const { slider, handle } = theme.colors.volume;

  const handleVolumeChange = (
    event: Event,
    newValue: number | number[],
  ): void => {
    setVolume((newValue as number) / 100);
  };

  return (
    <StyledVolumeControlsWrapper>
      <StyledVolumeControls>
        <StyledVolumeDown
          onClick={() => {
            setVolume(0);
          }}
        />
        <Slider
          aria-label="Volume"
          value={volume * 100}
          onChange={handleVolumeChange}
          defaultValue={70}
          min={0}
          max={100}
          sx={{
            color: slider,
            "& .MuiSlider-thumb": {
              backgroundColor: handle,
            },
          }}
        />
        <StyledVolumeUp
          onClick={() => {
            setVolume(1);
          }}
        />
      </StyledVolumeControls>
    </StyledVolumeControlsWrapper>
  );
};

export default Volume;
