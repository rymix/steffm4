import {
  StyledDownIndicator,
  StyledScrollIndicator,
  StyledUpIndicator,
} from "components/ScrollIndicator/StyledScrollIndicator";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const ScrollIndicator: React.FC = () => {
  const {
    session: { isAtBottom, setIsAtBottom },
  } = useMixcloud();

  const handleIsAtBottomToggle = () => {
    if (isAtBottom) {
      // Scroll up to top panel
      setIsAtBottom(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Scroll down to bottom panel
      setIsAtBottom(true);
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <StyledScrollIndicator onClick={handleIsAtBottomToggle}>
      {isAtBottom ? <StyledUpIndicator /> : <StyledDownIndicator />}
    </StyledScrollIndicator>
  );
};

export default ScrollIndicator;
