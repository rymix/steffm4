import type { CatalogueProps } from "components/Catalogue/types";
import {
  StyledCoverArt,
  StyledCoverArtImage,
  StyledDuration,
  StyledMixCard,
  StyledMixInfo,
  StyledMixName,
  StyledNotes,
  StyledReleaseDate,
  StyledSocials,
  StyledSubDetails,
} from "components/MixCard/StyledMixCard";
import { RandomTrack } from "components/RandomTrack";
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

  const { category, coverArtLarge, duration, name, notes, releaseDate, tags } =
    mixDetails;

  return (
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
        <RandomTrack />
        <RandomTrackInCategory />
        <ShareLink />
      </StyledSocials>
    </StyledMixCard>
  );
};

export default MixCard;
