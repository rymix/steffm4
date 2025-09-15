/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import About from "components/About";
import BackgroundSelect from "components/BackgroundSelect";
import { StyledMenu } from "components/BurgerMenu/StyledBurgerMenu";
import Contact from "components/Contact";
import Install from "components/Install";
import Manual from "components/Manual";
import MixList from "components/MixList";
import PlayerChooser from "components/PlayerChooser";
import Statistics from "components/Statistics";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";
import useSound from "use-sound";

const Menu: React.FC = () => {
  const {
    session: { enableAudio, menuOpen, openModal, setMenuOpen },
  } = useMixcloud();

  const [playMenuHover] = useSound("/audio/tap.mp3", {
    volume: 0.5,
  });

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<BackgroundSelect />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleAboutClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<About />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleManualClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<Manual />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleContactClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<Contact />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleInstallClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<Install />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleStatisticsClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<Statistics />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handlePlayerChooserClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<PlayerChooser />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleMixListClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<MixList />, undefined, undefined, undefined, true);
    setTimeout(() => setMenuOpen(false), 500);
  };

  return (
    <StyledMenu $open={menuOpen}>
      <ul>
        <li
          onClick={(event) => handleAboutClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleAboutClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          About Stef.FM
        </li>
        <li
          onClick={(event) => handleContactClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleContactClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          Contact
        </li>
        <li
          onClick={(event) => handleManualClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleManualClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          User Manual
        </li>
        <li
          onClick={(event) => handleInstallClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleInstallClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          Install
        </li>
        <li
          onClick={(event) => handleStatisticsClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleStatisticsClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          Statistics
        </li>
        <li
          onClick={(event) => handleBackgroundClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleBackgroundClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          Wallpaper Chooser
        </li>
        <li
          onClick={(event) => handlePlayerChooserClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlePlayerChooserClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          Player Chooser
        </li>
        <li
          onClick={(event) => handleMixListClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleMixListClick(e);
            }
          }}
          onMouseEnter={() => {
            enableAudio && playMenuHover();
          }}
          tabIndex={0}
          role="button"
        >
          List All Mixes
        </li>
      </ul>
    </StyledMenu>
  );
};

export default Menu;
