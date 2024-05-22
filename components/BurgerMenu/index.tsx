import Burger from "components/BurgerMenu/Burger";
import Menu from "components/BurgerMenu/Menu";
import type { CatalogueProps } from "components/Catalogue/types";
import { useSession } from "contexts/session";
import React from "react";

export const BurgerMenu: React.FC<CatalogueProps> = () => {
  const { burgerMenuRef } = useSession();

  return (
    <div ref={burgerMenuRef}>
      <Burger />
      <Menu />
    </div>
  );
};

export default BurgerMenu;
