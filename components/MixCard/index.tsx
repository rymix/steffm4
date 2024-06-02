import type { CatalogueProps } from "components/Catalogue/types";
import Information from "components/Information";
import {
  StyledCoverArt,
  StyledCoverArtImage,
  StyledDuration,
  StyledMixCard,
  StyledMixCardWrapper,
  StyledMixInfo,
  StyledMixName,
  StyledNotes,
  StyledReleaseDate,
  StyledSocials,
  StyledSubDetails,
} from "components/MixCard/StyledMixCard";
import { RandomTrackInCategory } from "components/RandomTrackInCategory";
import ShareLink from "components/ShareLink";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const MixCard: React.FC<CatalogueProps> = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  if (!mixDetails) {
    return <StyledMixCard>Loading...</StyledMixCard>;
  }

  const { coverArtLarge, duration, name, notes, releaseDate } = mixDetails;

  return (
    <StyledMixCardWrapper>
      <StyledMixCard>
        {coverArtLarge && (
          <StyledCoverArt>
            <StyledCoverArtImage src={coverArtLarge} alt={name} />
          </StyledCoverArt>
        )}
        <StyledMixInfo>
          <StyledMixName>{name}</StyledMixName>
          <StyledSubDetails>
            <StyledReleaseDate>{releaseDate}</StyledReleaseDate>
            <StyledDuration>{duration}</StyledDuration>
          </StyledSubDetails>
          <StyledNotes>{notes}</StyledNotes>
        </StyledMixInfo>
        <StyledSocials>
          <ShareLink />
          <RandomTrackInCategory />
          <Information />
        </StyledSocials>
      </StyledMixCard>
    </StyledMixCardWrapper>
  );
};

export default MixCard;
