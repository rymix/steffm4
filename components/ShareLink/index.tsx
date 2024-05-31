import { StyledShareLink } from "components/ShareLink/StyledShareLink";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { copyToClipboard } from "utils/functions";

export const ShareLink: React.FC = () => {
  const { mcKey } = useMixcloud();
  const sharableKey = mcKey.replaceAll("/rymixxx/", "").replaceAll("/", "");

  const handleClick = (): void => {
    copyToClipboard(`http://localhost:3001/${sharableKey}`);
  };

  return <StyledShareLink onClick={handleClick} />;
};

export default ShareLink;
