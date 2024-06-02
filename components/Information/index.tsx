import { StyledInformation } from "components/Information/StyledInformation";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import React from "react";

export const Information: React.FC = () => {
  const { modalOpen, setModalOpen } = useSession();
  const { mcKey } = useMixcloud();
  const sharableKey = mcKey.replaceAll("/rymixxx/", "").replaceAll("/", "");

  const handleClick = (): void => {
    setModalOpen(true);
  };

  return <StyledInformation onClick={handleClick} />;
};

export default Information;
