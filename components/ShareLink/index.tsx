import {
  StyledShareLink,
  StyledShareLinkLabel,
  StyledShareLinkWrapper,
} from "components/ShareLink/StyledShareLink";
import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";
import { copyToClipboard } from "utils/functions";

export const ShareLink: React.FC = () => {
  const { mcKey } = useMixcloud();
  const sharableKey = mcKey.replaceAll("/rymixxx/", "").replaceAll("/", "");
  const [showLabel, setShowLabel] = useState(false);
  const [label, setLabel] = useState("Copy sharable link");

  const handleClick = (): void => {
    copyToClipboard(`http://localhost:3001/${sharableKey}`);
    setLabel("Link copied!");
    setTimeout(() => {
      setLabel("Copy sharable link");
    }, 2000);
  };

  return (
    <StyledShareLinkWrapper
      onClick={handleClick}
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <StyledShareLinkLabel $visible={showLabel}>{label}</StyledShareLinkLabel>
      <StyledShareLink />
    </StyledShareLinkWrapper>
  );
};

export default ShareLink;
