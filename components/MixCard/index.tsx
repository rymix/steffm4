import Favourite from "components/Favourite";
import {
  StyledCategoryName,
  StyledCoverArt,
  StyledCoverArtImage,
  StyledDuration,
  StyledInteractionsWrapper,
  StyledMixCard,
  StyledMixCardWrapper,
  StyledMixInfo,
  StyledMixName,
  StyledNotes,
  StyledReleaseDate,
  StyledSubDetails,
} from "components/MixCard/StyledMixCard";
import type { MixCardProps } from "components/MixCard/types";
import Share from "components/Share";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { convertTimeToHumanReadable } from "utils/functions";

export const MixCard: React.FC<MixCardProps> = ({ category = false }) => {
  const {
    mcKey,
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
          {category && (
            <StyledCategoryName>
              {categoryName === "All" ? "All Categories" : categoryName}
            </StyledCategoryName>
          )}
          <StyledSubDetails>
            <StyledReleaseDate>{releaseDate}</StyledReleaseDate>
            <StyledDuration>
              {convertTimeToHumanReadable(duration)}
            </StyledDuration>
          </StyledSubDetails>
          <StyledNotes>{notes}</StyledNotes>
          <StyledInteractionsWrapper>
            <Favourite mix={mixDetails} />
            <Share />
          </StyledInteractionsWrapper>
        </StyledMixInfo>
      </StyledMixCard>
    </StyledMixCardWrapper>
  );
};

export default MixCard;
