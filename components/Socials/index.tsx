import Information from "components/Information";
import { RandomTrackInCategory } from "components/RandomTrackInCategory";
import ShareLink from "components/ShareLink";
import { StyledSocials } from "components/Socials/StyledSocials";
import React from "react";

export const Socials: React.FC = () => {
  return (
    <StyledSocials>
      <ShareLink />
      <RandomTrackInCategory />
      <Information />
    </StyledSocials>
  );
};

export default Socials;
