import type { CatalogueProps } from "components/Catalogue/types";
import { StyledMixCard } from "components/MixCard/StyledMixCard";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const MixCard: React.FC<CatalogueProps> = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  if (!mixDetails) {
    return <StyledMixCard>Loading...</StyledMixCard>;
  }

  const {
    category,
    coverArtDate,
    coverArtLarge,
    coverArtSmall,
    duration,
    fileName,
    listOrder,
    mixcloudKey,
    name,
    notes,
    releaseDate,
    shortName,
    tags,
  } = mixDetails;

  return (
    <StyledMixCard>
      <div>Category: {category.name}</div>
      <div>Cover Art Date: {coverArtDate}</div>
      <div>
        Cover Art Large: <img src={coverArtLarge} alt={`${name} cover`} />
      </div>
      <div>
        Cover Art Small: <img src={coverArtSmall} alt={`${name} cover`} />
      </div>
      <div>Duration: {duration}</div>
      <div>File Name: {fileName}</div>
      <div>List Order: {listOrder}</div>
      <div>Mixcloud Key: {mixcloudKey}</div>
      <div>Name: {name}</div>
      <div>Notes: {notes}</div>
      <div>Release Date: {releaseDate}</div>
      <div>Short Name: {shortName}</div>
      <div>
        Tags:&nbsp;
        {tags.map((tag) => (
          <span key={tag}>#{tag} </span>
        ))}
        &nbsp;
      </div>
    </StyledMixCard>
  );
};

export default MixCard;
