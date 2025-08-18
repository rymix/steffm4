import {
  StyledJupiterButton,
  StyledJupiterButtonWrapper,
  StyledJupiterLed,
} from "components/Jupiter/Button/StyledJupiterButton";
import type { JupiterButtonProps } from "components/Jupiter/Button/types";
import JupiterLabel from "components/Jupiter/Label";
import { useCallback, useEffect, useRef, useState } from "react";

const JupiterButton: React.FC<JupiterButtonProps> = ({
  on = false,
  color,
  label,
  labelPosition = "above",
  textColor = "white",
  onClick,
  momentary = false,
  size = "normal",
}) => {
  const [down, setDown] = useState<boolean>(false);
  const [momentaryLit, setMomentaryLit] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    if (momentary) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Light up the LED immediately
      setMomentaryLit(true);

      // Set timeout to turn off LED after 1 second
      timeoutRef.current = setTimeout(() => {
        setMomentaryLit(false);
        timeoutRef.current = null;
      }, 1000);
    }

    // Call the original onClick handler
    if (onClick) {
      onClick();
    }
  }, [momentary, onClick]);

  // Determine if LED should be lit
  const ledOn = momentary ? momentaryLit : on;

  return (
    <StyledJupiterButtonWrapper $size={size}>
      {labelPosition === "above" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
          size={size}
        />
      )}
      <StyledJupiterButton
        $color={color}
        $size={size}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        onClick={handleClick}
      >
        <StyledJupiterLed $down={down} $on={ledOn} $size={size} />
      </StyledJupiterButton>
      {labelPosition === "below" && (
        <JupiterLabel
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
          size={size}
        />
      )}
    </StyledJupiterButtonWrapper>
  );
};

export default JupiterButton;
