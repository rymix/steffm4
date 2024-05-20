import type { CatalogueProps } from "components/Catalogue/types";
import {
  StyledCategory,
  StyledCategoryTags,
  StyledCoverArt,
  StyledCoverArtImage,
  StyledDuration,
  StyledMixCard,
  StyledMixInfo,
  StyledMixName,
  StyledNotes,
  StyledReleaseDate,
  StyledSubDetails,
  StyledTag,
  StyledTags,
} from "components/MixCard/StyledMixCard";
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

  const replaceSpacesWithNbsp = (text: string) => {
    return text.replaceAll(/\s/g, "\u00A0");
  };

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
      <StyledCategoryTags>
        <StyledTags>
          {tags.map((tag) => (
            <StyledTag key={tag}>{replaceSpacesWithNbsp(`#${tag}`)}</StyledTag>
          ))}
        </StyledTags>
        <StyledCategory>{category.name}</StyledCategory>
      </StyledCategoryTags>
    </StyledMixCard>
  );
};

export default MixCard;
