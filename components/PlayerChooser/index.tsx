// components/InstallInstructions.tsx
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import {
  StyledPlayerChooser,
  StyledPlayerChooserIndicator,
  StyledPlayerChooserItem,
  StyledStefFmDx7Logo,
  StyledStefFmJupiterLogo,
} from "components/PlayerChooser/StyledPlayerChooser";
import { useMixcloud } from "contexts/mixcloud";
import React, { useState } from "react";
import useSound from "use-sound";

const PlayerChooser: React.FC = () => {
  const {
    session: { enableAudio, setModalOpen },
    themes: { playerTheme, setPlayerTheme },
  } = useMixcloud();

  const [playModalClose] = useSound("/audio/swish-close2.mp3", {
    volume: 0.5,
  });

  const [hoveredItem, setHoveredItem] = useState<"Jupiter" | "Dx7" | null>(
    null,
  );

  const handlePlayerChooserClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    theme: "Jupiter" | "Dx7",
  ): void => {
    event.preventDefault();
    setPlayerTheme(theme);
    setTimeout(() => {
      setModalOpen(false);
      playModalClose();
    }, 500);
  };

  return (
    <StyledPlayerChooser>
      <StyledPlayerChooserItem
        onClick={(event) => handlePlayerChooserClick(event, "Jupiter")}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            handlePlayerChooserClick(e, "Jupiter");
          }
        }}
        onMouseEnter={() => setHoveredItem("Jupiter")}
        onMouseLeave={() => setHoveredItem(null)}
        tabIndex={0}
        role="button"
        $isSelected={playerTheme === "Jupiter"}
      >
        <StyledStefFmJupiterLogo />
        <p>Jupiter-8</p>
        <StyledPlayerChooserIndicator
          $isSelected={playerTheme === "Jupiter"}
          $isOtherHovered={hoveredItem === "Dx7"}
        >
          <ArrowUpward />
        </StyledPlayerChooserIndicator>
      </StyledPlayerChooserItem>
      <StyledPlayerChooserItem
        onClick={(event) => handlePlayerChooserClick(event, "Dx7")}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            handlePlayerChooserClick(e, "Dx7");
          }
        }}
        onMouseEnter={() => setHoveredItem("Dx7")}
        onMouseLeave={() => setHoveredItem(null)}
        tabIndex={0}
        role="button"
        $isSelected={playerTheme === "Dx7"}
      >
        <StyledStefFmDx7Logo />
        <p>DX7</p>
        <StyledPlayerChooserIndicator
          $isSelected={playerTheme === "Dx7"}
          $isOtherHovered={hoveredItem === "Jupiter"}
        >
          <ArrowUpward />
        </StyledPlayerChooserIndicator>
      </StyledPlayerChooserItem>
    </StyledPlayerChooser>
  );
};

export default PlayerChooser;
