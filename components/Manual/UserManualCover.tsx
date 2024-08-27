import Manual from "components/Manual";
import {
  StyledUserManualCover,
  StyledUserManualCoverSubTitle,
  StyledUserManualCoverTitle,
} from "components/Manual/StyledUserManualCover";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

export const UserManualCover: React.FC = () => {
  const {
    session: { openModal },
  } = useMixcloud();
  const [rotation, setRotation] = useState<number>(0);

  const handleNotebookClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    event.preventDefault();
    openModal(<Manual />);
  };

  const handleStopHover = () => {
    setRotation(Math.floor(Math.random() * 31) - 15);
  };

  useEffect(() => {
    handleStopHover();
  }, []);

  return (
    <StyledUserManualCover
      onClick={handleNotebookClick}
      onMouseLeave={handleStopHover}
      $rotation={rotation}
    >
      <StyledUserManualCoverTitle>Stef.fM</StyledUserManualCoverTitle>
      <hr />
      <StyledUserManualCoverSubTitle>User Manual</StyledUserManualCoverSubTitle>
      <hr />
      <p>
        <a href="mailto:webmaster@stef.fm">webmaster@stef.fm</a>
        <br />
        Copyright © 2021 - {new Date().getFullYear()}
        <br />
        Some rights reserved
      </p>
    </StyledUserManualCover>
  );
};

export default UserManualCover;
