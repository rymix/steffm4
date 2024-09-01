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
import {
  StyledMixTag,
  StyledMixTags,
  StyledMixUploadedDate,
} from "components/MixList/StyledMixList";
import Share from "components/Share";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { convertTimeToHumanReadable } from "utils/functions";

export const MixCard: React.FC<MixCardProps> = ({ category = false }) => {
  const {
    mix: { categoryName, details: mixDetails },
  } = useMixcloud();

  if (!mixDetails) {
    return <StyledMixCard>Loading...</StyledMixCard>;
  }

  const { tags, uploadedDate } = mixDetails;
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

          <StyledMixTags>
            {tags.map((tag) => (
              <StyledMixTag key={tag}>#{tag}</StyledMixTag>
            ))}
          </StyledMixTags>
          <StyledMixUploadedDate>
            Uploaded on {uploadedDate}
          </StyledMixUploadedDate>
        </StyledMixInfo>
      </StyledMixCard>
    </StyledMixCardWrapper>
  );
};

export default MixCard;
