import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Favourite from "components/Favourite";
import {
  StyledMixCoverArt,
  StyledMixCoverArtImage,
  StyledMixDetails,
  StyledMixExpand,
  StyledMixInfoBlock,
  StyledMixName,
  StyledMixNotes,
  StyledMixPlay,
  StyledMixRow,
  StyledMixTag,
  StyledMixTags,
  StyledMixUploadedDate,
} from "components/MixList/StyledMixList";
import TrackListMini from "components/MixList/TrackListMini";
import type { MixRowProps } from "components/MixList/types";
import Share from "components/Share";
import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";
import Highlight from "react-highlight-words";
import { convertTimeToHumanReadable, mcKeyFormatter } from "utils/functions";

export const MixRow: React.FC<MixRowProps> = ({ mix, highlight }) => {
  const {
    mcKey,
    controls: { handleLoad, handlePause, handlePlay },
    widget: { playing },
    history: { progress },
  } = useMixcloud();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleClickPlay = (newMcKey: string): void => {
    if (mcKeyFormatter(mcKey) === mcKeyFormatter(mix.mixcloudKey) && playing) {
      handlePause();
    } else if (mcKeyFormatter(mcKey) === mcKeyFormatter(mix.mixcloudKey)) {
      handlePlay();
    } else {
      handleLoad(newMcKey);
    }
  };

  const listenedStatus = ():
    | "active"
    | "listened"
    | "unlistened"
    | "partial" => {
    if (mcKeyFormatter(mcKey) === mcKeyFormatter(mix.mixcloudKey)) {
      return "active";
    }

    const progressEntry = progress.find(
      (p) => mcKeyFormatter(p.mcKey) === mcKeyFormatter(mix.mixcloudKey),
    );

    if (!progressEntry) {
      return "unlistened";
    }

    return progressEntry.complete ? "listened" : "partial";
  };

  return (
    <>
      <StyledMixRow $listenedStatus={listenedStatus()}>
        <StyledMixPlay onClick={() => handleClickPlay(mix.mixcloudKey)}>
          {mcKeyFormatter(mcKey) === mcKeyFormatter(mix.mixcloudKey) &&
          playing ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </StyledMixPlay>
        <Favourite mix={mix} />
        <Share mix={mix} />
        <StyledMixCoverArt onClick={handleExpandToggle}>
          <StyledMixCoverArtImage src={mix.coverArtSmall} />
        </StyledMixCoverArt>
        <StyledMixInfoBlock onClick={handleExpandToggle}>
          <StyledMixName>
            <Highlight
              searchWords={highlight ? [highlight] : []}
              autoEscape
              textToHighlight={mix.name}
            />
          </StyledMixName>
          <StyledMixDetails>
            {mix.releaseDate} - {convertTimeToHumanReadable(mix.duration)}
          </StyledMixDetails>
        </StyledMixInfoBlock>
        <StyledMixExpand onClick={handleExpandToggle}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledMixExpand>
      </StyledMixRow>
      {isExpanded && (
        <StyledMixNotes>
          <Highlight
            searchWords={highlight ? [highlight] : []}
            autoEscape
            textToHighlight={mix.notes || ""}
          />
          <StyledMixTags>
            {mix.tags.map((tag) => (
              <StyledMixTag key={tag}>#{tag}</StyledMixTag>
            ))}
          </StyledMixTags>
          <StyledMixUploadedDate>
            Uploaded on {mix.uploadedDate}
          </StyledMixUploadedDate>
        </StyledMixNotes>
      )}
      {isExpanded && <TrackListMini mix={mix} highlight={highlight} />}{" "}
    </>
  );
};

export default MixRow;
