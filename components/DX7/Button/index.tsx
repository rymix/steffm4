import type { Dx7ButtonProps } from "components/Dx7/Button/types";
import Dx7Label from "components/Dx7/Label";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  StyledDx7Button,
  StyledDx7ButtonWrapper,
  StyledDx7Led,
} from "./StyledDx7Button";

const Dx7Button: React.FC<Dx7ButtonProps> = ({
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
    <StyledDx7ButtonWrapper $size={size}>
      {labelPosition === "above" && (
        <Dx7Label
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
          size={size}
        />
      )}
      <StyledDx7Button
        $color={color}
        $size={size}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        onClick={handleClick}
      >
        <StyledDx7Led $down={down} $on={ledOn} $size={size} />
      </StyledDx7Button>
      {labelPosition === "below" && (
        <Dx7Label
          label={label}
          labelPosition={labelPosition}
          paddingTop={0}
          paddingBottom={10}
          textColor={textColor}
          size={size}
        />
      )}
    </StyledDx7ButtonWrapper>
  );
};

export default Dx7Button;
