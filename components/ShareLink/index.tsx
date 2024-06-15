import { StyledShareLink } from "components/ShareLink/StyledShareLink";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";
import React from "react";
import { copyToClipboard } from "utils/functions";

export const ShareLink: React.FC = () => {
  const { mcKey } = useMixcloud();
  const { openModal } = useSession();
  const sharableKey = mcKey.replaceAll("/rymixxx/", "").replaceAll("/", "");

  const handleClick = (): void => {
    copyToClipboard(`http://localhost:3001/${sharableKey}`);
    openModal(<p>Sharable link copied to clipboard</p>, null, 4);
  };

  return <StyledShareLink onClick={handleClick} />;
};

export default ShareLink;
