/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import About from "components/About";
import {
  StyledHeading,
  StyledMenu,
} from "components/BurgerMenu/StyledBurgerMenu";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

const Menu: React.FC = () => {
  const {
    controls: { fetchRandomMcKey, fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory, setSelectedCategory },
    session: { menuOpen, openModal, setMenuOpen },
  } = useMixcloud();

  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<About />, "About Stef.FM");
    setTimeout(() => setMenuOpen(false), 500);
  };

  return (
    <StyledMenu $open={menuOpen}>
      <StyledHeading>Settings</StyledHeading>
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
      </ul>
    </StyledMenu>
  );
};

export default Menu;
