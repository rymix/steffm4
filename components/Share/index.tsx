import {
  StyledShareIcon,
  StyledShareMessage,
  StyledShareWrapper,
  TooltipContainer,
} from "components/Share/StyledShare";
import { ShareProps } from "components/Share/types";
import { useMixcloud } from "contexts/mixcloud";
import { useState } from "react";

export const Share: React.FC<ShareProps> = ({ mix }) => {
  const {
    mix: { copySharableLink },
  } = useMixcloud();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  const handleClickShare = (): void => {
    if (mix) {
      copySharableLink(mix);
    } else {
      copySharableLink();
    }

    setVisible(true);
    setFading(true);
    setTimeout(() => {
      setFading(false);
      setTimeout(() => {
        setVisible(false);
      }, 1000); // Duration of the fade-out transition
    }, 2000); // Time the tooltip stays fully visible
  };

  return (
    <StyledShareWrapper onClick={handleClickShare}>
      <StyledShareIcon />
      <TooltipContainer>
        <StyledShareMessage $visible={visible} $fading={fading}>
          Sharable link copied to clipboard
        </StyledShareMessage>
      </TooltipContainer>
    </StyledShareWrapper>
  );
};

export default Share;
