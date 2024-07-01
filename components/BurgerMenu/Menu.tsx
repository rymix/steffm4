/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import About from "components/About";
import {
  StyledHeading,
  StyledMenu,
} from "components/BurgerMenu/StyledBurgerMenu";
import { useMixcloud } from "contexts/mixcloud";
import React, { useCallback, useEffect, useState } from "react";

const Menu: React.FC = () => {
  const {
    controls: { fetchRandomMcKey, fetchRandomMcKeyByCategory, handleLoad },
    filters: { selectedCategory, setSelectedCategory },
    session: { menuOpen, openModal, setMenuOpen },
  } = useMixcloud();

  const [links, setLinks] = useState([
    {
      key: "",
      selected: false,
      text: "I Love Everything!",
    },
    {
      key: "mpos",
      selected: false,
      text: "My Pair of Shoes",
    },
    {
      key: "aidm",
      selected: false,
      text: "Adventures in Decent Music",
    },
    {
      key: "cocksoup",
      selected: false,
      text: "Cocksoup DJ Collective",
    },
    {
      key: "special",
      selected: false,
      text: "Specials",
    },
  ]);

  const updateLinks = useCallback(
    (category: string) => {
      const updatedLinks = links.map((link) => ({
        ...link,
        selected: link.key === category,
      }));
      setLinks(updatedLinks);
    },
    [links],
  );

  useEffect(() => {
    updateLinks(selectedCategory || "");
  }, [selectedCategory]);

  const handleCategoryClick = async (
    code: string,
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (code === "") {
      setSelectedCategory("");
      handleLoad(await fetchRandomMcKey());
    } else {
      setSelectedCategory(code);
      handleLoad(await fetchRandomMcKeyByCategory(code));
    }

    setTimeout(() => setMenuOpen(false), 500);
  };

  const handleAboutClick = (
    event: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ): void => {
    event.preventDefault();
    openModal(<About />, "About Stef.FM");
    setTimeout(() => setMenuOpen(false), 500);
  };

  return (
    <StyledMenu $open={menuOpen}>
      <StyledHeading>Choose Your Flavour</StyledHeading>
      <ul>
        {links.map((link) => (
          <li
            key={link.key}
            onClick={(event) => handleCategoryClick(link.key, event)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCategoryClick("mpos", e);
              }
            }}
            tabIndex={0}
            role="button"
          >
            {link.selected && (
              <span>
                <AudiotrackIcon />
              </span>
            )}
            {link.text}
          </li>
        ))}
      </ul>
      <StyledHeading>Other Things</StyledHeading>
      <ul>
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
      </ul>
    </StyledMenu>
  );
};

export default Menu;
