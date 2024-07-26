import {
  StyledShareIcon,
  StyledShareWrapper,
} from "components/Share/StyledShare";
import { ShareProps } from "components/Share/types";
import { useMixcloud } from "contexts/mixcloud";

export const Share: React.FC<ShareProps> = ({ mix }) => {
  const {
    mix: { copySharableLink },
    session: { showTooltip },
  } = useMixcloud();

  const handleClickShare = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (mix) {
      copySharableLink(mix);
    } else {
      copySharableLink();
    }

    const { clientX: x, clientY: y } = event;
    showTooltip("Sharable link copied to clipboard", x, y - 10);
  };

  return (
    <StyledShareWrapper onClick={handleClickShare}>
      <StyledShareIcon />
    </StyledShareWrapper>
  );
};

export default Share;
