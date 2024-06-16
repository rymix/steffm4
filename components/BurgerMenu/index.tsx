import Burger from "components/BurgerMenu/Burger";
import Menu from "components/BurgerMenu/Menu";
import { useSession } from "contexts/session";
import React from "react";

export const BurgerMenu: React.FC = () => {
  const { burgerMenuRef } = useSession();

  return (
    <div ref={burgerMenuRef}>
      <Burger />
      <Menu />
    </div>
  );
};

export default BurgerMenu;
