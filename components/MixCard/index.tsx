import {
  StyledCategoryName,
  StyledCoverArt,
  StyledCoverArtImage,
  StyledDuration,
  StyledMixCard,
  StyledMixCardWrapper,
  StyledMixInfo,
  StyledMixName,
  StyledNotes,
  StyledReleaseDate,
  StyledSubDetails,
} from "components/MixCard/StyledMixCard";
import type { MixCardProps } from "components/MixCard/types";
import Socials from "components/Socials";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const MixCard: React.FC<MixCardProps> = ({
  socials = false,
  category = false,
}) => {
  const {
    mix: { categoryName, details: mixDetails },
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
          {category && <StyledCategoryName>{categoryName}</StyledCategoryName>}
          <StyledSubDetails>
            <StyledReleaseDate>{releaseDate}</StyledReleaseDate>
            <StyledDuration>{duration}</StyledDuration>
          </StyledSubDetails>
          <StyledNotes>{notes}</StyledNotes>
        </StyledMixInfo>
        {socials && <Socials />}
      </StyledMixCard>
    </StyledMixCardWrapper>
  );
};

export default MixCard;
