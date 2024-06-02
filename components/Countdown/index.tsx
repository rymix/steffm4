import { StyledCountdown } from "components/Countdown/StyledCountdown";
import { useSession } from "contexts/session";
import React from "react";

export const Countdown: React.FC = () => {
  const { countdown } = useSession();

  return <StyledCountdown>{countdown}</StyledCountdown>;
};

export default Countdown;
