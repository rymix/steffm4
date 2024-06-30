import { StyledInformation } from "components/Information/StyledInformation";
import MixInformation from "components/MixInformation";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import React from "react";

export const Information: React.FC = () => {
  const { openModal } = useSession();
  const {
    mix: { details },
  } = useMixcloud();
  const name = details?.name;

  const handleClick = (): void => {
    openModal(<MixInformation />, name);
  };

  return <StyledInformation onClick={handleClick} />;
};

export default Information;
