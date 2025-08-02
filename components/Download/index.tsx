/* eslint-disable unicorn/prefer-dom-node-remove */

import {
  StyledDownloadIcon,
  StyledDownloadWrapper,
} from "components/Download/StyledDownload";
import { DownloadProps } from "components/Download/types";
import { useMixcloud } from "contexts/mixcloud";
import { STORAGE_PREFIX } from "utils/constants";

export const Download: React.FC<DownloadProps> = () => {
  const {
    mix: { details: mixDetails },
  } = useMixcloud();

  const handleClickDownload = (): void => {
    if (!mixDetails) return;

    const fileUrl = `${STORAGE_PREFIX}${mixDetails.fileName}`;
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = ""; // Optional: specify a filename if needed

    document.body.appendChild(anchor); // Append to DOM to ensure it works in all browsers
    // eslint-disable-next-line testing-library/no-node-access
    anchor.click();

    document.body.removeChild(anchor); // Clean up
  };

  return (
    <StyledDownloadWrapper onClick={handleClickDownload}>
      <StyledDownloadIcon />
    </StyledDownloadWrapper>
  );
};

export default Download;
