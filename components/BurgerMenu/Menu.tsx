/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import About from "components/About";
import BackgroundSelect from "components/BackgroundSelect";
import { StyledMenu } from "components/BurgerMenu/StyledBurgerMenu";
import Contact from "components/Contact";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

const Menu: React.FC = () => {
  const {
    session: { menuOpen, openModal, setMenuOpen },
  } = useMixcloud();

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

  const handleContactClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<Contact />);
    setTimeout(() => setMenuOpen(false), 500);
  };

  return (
    <StyledMenu $open={menuOpen}>
      <ul>
        <li
          onClick={(event) => handleBackgroundClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleBackgroundClick(e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          Background
        </li>
        <li
          onClick={(event) => handleAboutClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleAboutClick(e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          About
        </li>
        <li
          onClick={(event) => handleContactClick(event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleContactClick(e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          Contact
        </li>
      </ul>
    </StyledMenu>
  );
};

export default Menu;
