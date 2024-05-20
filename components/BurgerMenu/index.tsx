import type { CatalogueProps } from "components/Catalogue/types";
import { slide as Menu } from "react-burger-menu";

export const BurgerMenu: React.FC<CatalogueProps> = () => {
  return (
    <Menu>
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
    </Menu>
  );
};

export default BurgerMenu;
