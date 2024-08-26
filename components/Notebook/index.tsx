import MixInformation from "components/MixInformation";
import {
  StyledNotebook,
  StyledNotebookPaper,
  StyledNotebookTop,
} from "components/Notebook/StyledNotebook";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import { convertTimeToHumanReadable } from "utils/functions";

export const Notebook: React.FC = () => {
  const {
    mix: { details: mixDetails },
    session: { openModal },
  } = useMixcloud();

  const handleNotebookClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    event.preventDefault();
    openModal(<MixInformation />);
  };

  return (
    <StyledNotebook onClick={handleNotebookClick}>
      <StyledNotebookTop />
      <StyledNotebookPaper>
        <p>{mixDetails?.name}</p>
        <p>Released: {mixDetails?.releaseDate}</p>
        <br />
        <p>{mixDetails?.notes}</p>
        <br />
        <p>{convertTimeToHumanReadable(mixDetails?.duration || "")}</p>
      </StyledNotebookPaper>
    </StyledNotebook>
  );
};
export default Notebook;
