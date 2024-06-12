import { StyledInformation } from "components/Information/StyledInformation";
import MixInformation from "components/MixInformation";
import { useSession } from "contexts/session";
import React from "react";

export const Information: React.FC = () => {
  const { openModal } = useSession();

  const handleClick = (): void => {
    openModal(<MixInformation />);
  };

  return <StyledInformation onClick={handleClick} />;
};

export default Information;
