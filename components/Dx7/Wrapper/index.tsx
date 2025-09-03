import { StyledDx7Wrapper } from "components/Dx7/Wrapper/StyledDx7Wrapper";
import { Dx7WrapperProps } from "components/Dx7/Wrapper/types";
import { useDeviceOrientation } from "hooks/useDeviceOrientation";
import { useEffect, useState } from "react";

const Dx7Wrapper: React.FC<Dx7WrapperProps> = ({ children }) => {
  const { isSkinnyWideMode, isTallWideMode, windowHeight } =
    useDeviceOrientation();

  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    let localScale: number;

    if (windowHeight >= 500) {
      localScale = 1;
    } else if (windowHeight <= 254) {
      localScale = 0.5;
    } else {
      // Linearly interpolate between 254 → 0.5 and 500 → 1
      const ratio = (windowHeight - 254) / (500 - 254);
      localScale = 0.5 + ratio * (1 - 0.5);
    }

    const formattedScale = Number.parseFloat(localScale.toFixed(2));

    setScale(formattedScale);
  }, [isSkinnyWideMode, isTallWideMode, windowHeight]);

  return <StyledDx7Wrapper $scale={scale}>{children}</StyledDx7Wrapper>;
};

export default Dx7Wrapper;
