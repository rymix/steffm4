import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
} from "components/MixList/StyledMixList";
import TrackListMini from "components/MixList/TrackListMini";
import type { MixRowProps } from "components/MixList/types";
import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";

export const MixRow: React.FC<MixRowProps> = ({ mix }) => {
  const {
    mcKey,
    setMcKey,
    controls: { handlePause, handlePlay },
    widget: { playing },
  } = useMixcloud();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandToggle = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleClickPlay = (newMcKey: string): void => {
    setMcKey(newMcKey);
    if (playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <>
      <StyledMixRow $on={mcKey.includes(mix.mixcloudKey)}>
        <StyledMixPlay onClick={() => handleClickPlay(mix.mixcloudKey)}>
          {mix.mixcloudKey === mcKey && playing ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </StyledMixPlay>
        <StyledMixCoverArt>
          <StyledMixCoverArtImage src={mix.coverArtSmall} />
        </StyledMixCoverArt>
        <StyledMixInfoBlock>
          <StyledMixName>{mix.name}</StyledMixName>
          <StyledMixDetails>
            {mix.releaseDate} {mix.duration}
          </StyledMixDetails>
        </StyledMixInfoBlock>
        <StyledMixExpand onClick={handleExpandToggle}>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledMixExpand>
      </StyledMixRow>
      {isExpanded && <StyledMixNotes>{mix.notes}</StyledMixNotes>}
      {isExpanded && <TrackListMini mix={mix} />}
    </>
  );
};

export default MixRow;
